import { model, models, Schema } from "mongoose";
import { genSalt, hash, compare } from "bcrypt"
import { IUser, IUserDocument } from "../definitions";

const userSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  firstname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  }
}, { versionKey: false })

userSchema.methods["setPassword"] = async function (): Promise<string> {
  const salt = await genSalt(10)
  const hashedPassword: string = await hash(this.password, salt)
  this.password = hashedPassword;
  return this.password
}

userSchema.methods["authenticate"] = async function (password: string): Promise<boolean> {
  const match = await compare(password, this.password)
  return match
}

const userModelName = "User"

const UserModel = models[userModelName] ||
  model<IUserDocument>(userModelName, userSchema)

export default UserModel