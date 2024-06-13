import express from "express"
import connect from "./utils/connect"
import readEnv from "./utils/read-env"
import router from "./router"
import checkConn from "./middleware/check-conn"

export const app = express()
connect() // <-- connects to database

app.use(express.json())
app.use(checkConn)
app.use(router)

const port = Number(readEnv("PORT")) ?? 3000
app.listen(port, function () {
  console.log(`server running on http://localhost:${port}`)
})
