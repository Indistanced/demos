import dotenv from 'dotenv'
import express, { Request, Response, json } from 'express'
import { connect, connection } from 'mongoose'
import subscribersRouter from './routes/subscribers' 
import path from 'path'

// Create instance of express application
const app = express()

// Load environment variables from .env file into process.env
dotenv.config({ path: path.join(__dirname, '../../backend/.env') })

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is undefined in .env")
}
// Connect to MongoDB using connection string in DATABASE_URL
connect(process.env.DATABASE_URL)

// Retrieve Mongoose connection instance for event handling
const db = connection

// Event listener to log connection errors
db.on('error', (error) => console.error(error))

// Event listener to log successful connections
db.once('open', () => console.log("Connected to database"))

// Serve index.html from Express
app.use(express.static(path.join(__dirname, '../../frontend')))
app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'))
})

// Handles JSON data sent in requests
app.use(json())

// Handle requests to the /subscribers endpoint
app.use('/subscribers', subscribersRouter)

// Start Express server and listen for incoming requests on port
app.listen(process.env.PORT, () => console.log("Server started"))