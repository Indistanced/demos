"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const mongoose_1 = require("mongoose");
const subscribers_1 = __importDefault(require("./routes/subscribers"));
const path_1 = __importDefault(require("path"));
// Create instance of express application
const app = (0, express_1.default)();
// Load environment variables from .env file into process.env
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../backend/.env') });
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is undefined in .env");
}
// Connect to MongoDB using connection string in DATABASE_URL
(0, mongoose_1.connect)(process.env.DATABASE_URL);
// Retrieve Mongoose connection instance for event handling
const db = mongoose_1.connection;
// Event listener to log connection errors
db.on('error', (error) => console.error(error));
// Event listener to log successful connections
db.once('open', () => console.log("Connected to database"));
// Serve index.html from Express
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend')));
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/index.html'));
});
// Handles JSON data sent in requests
app.use((0, express_1.json)());
// Handle requests to the /subscribers endpoint
app.use('/subscribers', subscribers_1.default);
// Start Express server and listen for incoming requests on port
app.listen(process.env.PORT, () => console.log("Server started"));
