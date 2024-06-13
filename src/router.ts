import { Router } from 'express'
import { Types } from 'mongoose'
import readJson from "./utils/read-json"
import UserModel from "./models/user-model"
import PostModel from "./models/post-model"
import { PostReqBody, IPost, IPostDocument, IUser, IUserDocument } from "./definitions"
import { errorResponse, stdResponse } from './utils/response'
import mongooseErrHandler from './utils/mongoose-err-handler'

const router = Router()

// --------------------------------------------- //

router.get("/health-check", function (req, res) {
  res.json({ message: "hello world" })
})

router.get("/users", async function (req, res) {
  let users: IUserDocument[] = []
  try {
    users = await UserModel.find({})
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }

  return stdResponse(res, 200, { users })
})

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  if ([username, password].includes(undefined)) {
    errorResponse(res, 400, "invalid credentials")
  }

  let user: IUserDocument | null
  try {
    user = await UserModel.findOne({ username }) as IUserDocument
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }

  if (user == null) {
    return errorResponse(res, 401, "invalid credentials")
  }

  const match = await user.authenticate(password)
  if (!match) {
    return errorResponse(res, 401, "invalid credentials")
  }

  return stdResponse(res, 200, "user authenticated")
})

router.post("/pupulate-users", async function (req, res) {
  const users = await readJson("./src/data/users.json") as IUser[]
  try {
    await UserModel.deleteMany({}) // deletes all users
    for (let eachUser of users) {
      const userDoc: IUser = {
        username: eachUser.username,
        password: eachUser.password,
        firstname: eachUser.firstname,
        lastname: eachUser.lastname
      }
      const user = new UserModel(userDoc) as IUserDocument
      await user.setPassword() // <-- hashes the password
      await user.save()
    }
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }

  return stdResponse(res, 200, "database has been pupulated")
})

// --------------------------------------------- //

router.get("/posts", async function (req, res) {
  let posts: IPostDocument[]
  try {
    posts = await PostModel.find({}).populate("owner")
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }

  return stdResponse(res, 200, posts)
})

router.post("/post", async function (req, res) {
  const { owner, title: titleReq, body: bodyReq } = req.body as PostReqBody;
  let username: string
  let password: string
  let title: string
  let body: string
  try {
    if (!owner) {
      throw new Error()
    }
    if ([owner.username, owner.password, titleReq, bodyReq].includes(undefined)) {
      throw new Error()
    }
    username = owner.username!
    password = owner.password!
    title = titleReq!
    body = bodyReq!
  } catch {
    return errorResponse(res, 400, "missing fields in req body")
  }

  let userOwner: IUserDocument | null
  try {
    userOwner = await UserModel.findOne({ username })
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }

  if (userOwner == null) {
    return errorResponse(res, 401, "invalid credentials")
  }

  const match = await userOwner.authenticate(password)
  if (!match) {
    return errorResponse(res, 401, "invalid credentials")
  }

  const post: IPost = {
    title, body, owner: userOwner._id as Types.ObjectId
  }
  const postDocument: IPostDocument = new PostModel(post)

  try {
    await postDocument.save()
  } catch (error) {
    console.error(error)
    return mongooseErrHandler(res, error)
  }


  return stdResponse(res, 200, postDocument)
})

export default router