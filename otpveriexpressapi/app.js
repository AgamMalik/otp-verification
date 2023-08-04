import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT

// cors policy
app.use(cors())

// json
app.use(express.json())

// load routes
app.use("/api/user", userRoutes)



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})