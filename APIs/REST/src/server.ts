// Import dotenv for handling environment variables
import dotenv from 'dotenv'
// Import Express framework
import express, { json } from 'express'
// Create instance of express application
const app = express()
// Import Mongoose library
import { connect, connection } from 'mongoose'
// Import subscribersRouter from ./routes/subscribers
import subscribersRouter from './routes/subscribers'

// Load environment variables from .env file into process.env
dotenv.config()

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

// Handles JSON data sent in requests
app.use(json())

// Handle requests to the /subscribers endpoint
app.use('/subscribers', subscribersRouter)

// Start Express server and listen for incoming requests on port
app.listen(process.env.PORT, () => console.log("Server started"))