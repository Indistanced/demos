"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import mongoose library
const mongoose_1 = __importDefault(require("mongoose"));
// Outline structure of Subscriber document in MongoDB Collection
const subscriberSchema = new mongoose_1.default.Schema({
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
});
// Create and export 'Subscriber' model
const Subscriber = mongoose_1.default.model('Subscriber', subscriberSchema);
exports.default = Subscriber;
