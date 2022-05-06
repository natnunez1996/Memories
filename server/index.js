import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

//Routing 

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

//Connection to MongoDb. Create a .env file and configure the PORT and CONNECTION_URL
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT: ${PORT}`)
})).catch(error => console.log(error.message))



