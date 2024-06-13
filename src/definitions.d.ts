import { Types, Document } from 'mongoose'

export interface IUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string
}

interface IUserMethods {
  setPassword(): Promise<string>
  authenticate(password: string): Promise<boolean>
}

export interface IUserDocument extends Document, IUser, IUserMethods { }

export interface IPost {
  title: string;
  body: string;
  owner: Types.ObjectId
}

export interface IPostDocument extends Document, IPost { }

export interface PostReqBody {
  owner?: {
    username?: string,
    password?: string
  },
  title?: string,
  body?: string
}