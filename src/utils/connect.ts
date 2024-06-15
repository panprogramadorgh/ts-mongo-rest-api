import { connect as connectDB } from 'mongoose'
import readEnv from './read-env'

export default async function connect() {
  const dbURL = readEnv("DB_URL")
  if (!dbURL) {
    throw new Error("DB_URL env variable must be defined")
  }

  try {
    await connectDB(dbURL!)
    console.log("connected to database")
  } catch (error) {
    console.log("cannot connecto to database")
    console.error(error)
  }
}