"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
// --- In-memory "database" ---
// NOTE: This is for demonstration purposes. In a real application,
// you would use a proper database like PostgreSQL, MySQL, or MongoDB.
const users = [];
const sessions = {};
// --- Middleware ---
// A list of allowed origins for development.
// This makes your backend more flexible for different development environments.
const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.137.1:3000'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(express_1.default.json());
// --- Routes ---
/**
 * Register a new user.
 */
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }
    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: "A user with this email already exists." });
    }
    // NOTE: Storing passwords in plaintext is insecure.
    // In a real application, you MUST hash and salt passwords using a library like bcrypt.
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);
    console.log('User registered:', newUser);
    res.status(201).json({ message: "User registered successfully." });
});
/**
 * Log in a user.
 */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    // Find user and verify credentials
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }
    // NOTE: This is a very basic session ID. In a real application,
    // use a secure, random, and unique token (e.g., from `crypto.randomBytes` or `uuid`).
    const sessionId = `session_${Date.now()}_${Math.random()}`;
    sessions[sessionId] = { userId: user.id, email: user.email, name: user.name };
    console.log(`User logged in: ${user.email}, session ID: ${sessionId}`);
    // The frontend expects session_id, name, and email.
    res.json({
        message: "Login successful",
        session_id: sessionId,
        name: user.name,
        email: user.email
    });
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening on port ${port}`);
});
