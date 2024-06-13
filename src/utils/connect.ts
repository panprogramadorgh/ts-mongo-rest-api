import { connect as connectDB } from 'mongoose'
import readEnv from './read-env'

export default async function connect() {
  const dbURI = readEnv("DB_URI")
  if (!dbURI) {
    throw new Error("DB_URI env variable must be defined")
  }

  try {
    await connectDB(dbURI!)
    console.log("connected to database")
  } catch (error) {
    console.log("cannot connecto to database")
    console.error(error)
  }
}