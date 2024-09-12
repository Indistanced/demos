"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express framework
const express_1 = __importDefault(require("express"));
// Create instance of Express router to define routes
const router = express_1.default.Router();
// Import Subscriber model
const subscriber_1 = __importDefault(require("../models/subscriber"));
// Get all
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get list of documents which fit Subscriber schema
        const subscribers = yield subscriber_1.default.find();
        // Send found documents
        res.json(subscribers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get one
router.get('/:id', getSubscriber, (_req, res) => {
    res.json(res.locals.subscriber);
});
// Create one
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = new subscriber_1.default({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = yield subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Update all
router.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PATCH /subscribers hit");
    try {
        const updatedSubscribers = yield subscriber_1.default.updateMany({}, {
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
        });
        res.json(updatedSubscribers);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Update one
router.patch('/:id', getSubscriber, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name != null) {
        res.locals.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.locals.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = yield res.locals.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Delete all
router.delete('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PATCH /subscribers hit");
    try {
        const result = yield subscriber_1.default.deleteMany({});
        res.json({ message: "Deleted subscribers", result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Delete one
router.delete('/:id', getSubscriber, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.locals.subscriber.deleteOne();
        res.json({ message: "Deleted subscriber" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Middleware to fetch subscriber document from database by ID
function getSubscriber(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let subscriber;
        try {
            subscriber = yield subscriber_1.default.findById(req.params.id);
            if (subscriber == null) {
                return res.status(404).json({ message: "Cannot find subscriber" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.locals.subscriber = subscriber;
        next();
    });
}
exports.default = router;
