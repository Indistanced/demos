// Import mongoose library
import mongoose, { Model } from 'mongoose' 

// Define TypeScript interface for a Subscriber document
interface Subscriber extends Document {
    name: string;
    subscribedToChannel: string;
    subscribeDate: Date;
}

// Outline structure of Subscriber document in MongoDB Collection
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Create and export 'Subscriber' model
const Subscriber: Model<Subscriber> = mongoose.model<Subscriber>('Subscriber', subscriberSchema)
export default Subscriber