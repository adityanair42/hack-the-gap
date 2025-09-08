import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 5000;

// --- Database Client ---
const prisma = new PrismaClient();

// --- In-memory session store ---
const sessions: { [sessionId: string]: any } = {};

// --- Middleware ---

// A list of allowed origins for development.
// This makes your backend more flexible for different development environments.
const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.137.1:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use(express.json());

// --- Routes ---

/**
 * Register a new user.
 */
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try {
        // Check if user already exists in the database
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "A user with this email already exists." });
        }

        // NOTE: Storing passwords in plaintext is insecure.
        // In a real application, you MUST hash and salt passwords using a library like bcrypt.
        const newUser = await prisma.user.create({
            data: { name, email, password },
        });

        console.log('User registered and saved to DB:', newUser);
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
});

/**
 * Log in a user.
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user in the database
    const user = await prisma.user.findUnique({ where: { email } });

    // Verify user exists and password matches
    // NOTE: This is a plaintext password check. Use bcrypt.compare in a real app.
    if (!user || user.password !== password) {
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
