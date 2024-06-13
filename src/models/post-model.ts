import { model, models, Schema } from "mongoose";
import { IPost, IPostDocument } from "../definitions";

const postSchema = new Schema<IPostDocument>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  body: {
    type: String,
    unique: false,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: false,
    required: true
  }
}, { timestamps: true })


const postModelName = "Post"

const PostModel = models[postModelName] ||
  model(postModelName, postSchema)

export default PostModel