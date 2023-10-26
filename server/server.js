const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors("*"));
app.use(express.json(), express.urlencoded({extended: true}));

//Registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if required fields are provided.
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check for duplicate email in the database.
        const userExists = await checkIfUserExists(email);

        if (userExists) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Hash the password.
        const hashedPassword = await hashPassword(password);

        // Store user data in the database.
        const newUser = await createUser(username, email, hashedPassword);

        return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed' });
    }
});

const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
});


//login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if required fields are provided.
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Retrieve user data by email.
        const userData = await getUserDataByEmail(email);

        if (!userData) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Compare passwords.
        const passwordsMatch = await comparePasswords(password, userData.hashedPassword);

        if (!passwordsMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate and return an authentication token.
        const token = generateAuthToken(userData.id);
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
});


async function checkIfUserExists(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0);
            }
        });
    });
}


async function createUser(username, email, hashedPassword) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId); // Return the ID of the newly created user.
            }
        });
    });
}



async function checkIfUserExists(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    // User with the given email already exists.
                    resolve(true);
                } else {
                    // User with the given email does not exist.
                    resolve(false);
                }
            }
        });
    });
}

async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

async function createUser(username, email, hashedPassword) {
    return new Promise((resolve, reject) => {
        // Check if the email is already in use.
        checkIfUserExists(email)
            .then((userExists) => {
                if (userExists) {
                    // User with the email already exists.
                    reject("This email is already in use.");
                } else {
                    // Insert the new user into the database.
                    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
                    db.query(query, [username, email, hashedPassword], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve("Registration successful");
                        }
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'login_signup',
});

// Create API routes for registration, login, and user authentication.

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
