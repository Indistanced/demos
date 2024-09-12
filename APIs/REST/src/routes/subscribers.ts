// Import Express framework
import express, { Request, Response, NextFunction } from 'express'
// Create instance of Express router to define routes
const router = express.Router()
// Import Subscriber model
import Subscriber from '../models/subscriber'

// Get all
router.get('/', async (_req: Request, res: Response) => {
    try {
        // Get list of documents which fit Subscriber schema
        const subscribers = await Subscriber.find()
        // Send found documents
        res.json(subscribers)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getSubscriber, (_req: Request, res: Response) => {
    res.json(res.locals.subscriber)
})

// Create one
router.post('/', async (req: Request, res: Response) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Update all
router.patch('/', async (req: Request, res: Response) => {
    console.log("PATCH /subscribers hit")
    try {
        const updatedSubscribers = await Subscriber.updateMany({}, {
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
        })
        res.json(updatedSubscribers)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Update one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null){
        res.locals.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.locals.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.locals.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Delete all
router.delete('/', async (_req: Request, res: Response) => {
    console.log("PATCH /subscribers hit")
    try {
        const result = await Subscriber.deleteMany({})
        res.json({ message: "Deleted subscribers", result} )
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Delete one
router.delete('/:id', getSubscriber, async (_req: Request, res: Response) => {
    try {
        await res.locals.subscriber.deleteOne()
        res.json({ message: "Deleted subscriber"})
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware to fetch subscriber document from database by ID
async function getSubscriber(req: Request, res: Response, next: NextFunction) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({ message: "Cannot find subscriber"})
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
    res.locals.subscriber = subscriber
    next()
}

export default router