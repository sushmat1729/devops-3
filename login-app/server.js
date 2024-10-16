const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const dbFile = path.join(__dirname, 'myDB.txt');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userData = `${username},${password}\n`;

    // Check if the username already exists
    const dbContent = fs.readFileSync(dbFile, 'utf8');
    if (dbContent.includes(`${username},`)) {
        return res.send('Username already exists. Please choose a different username.');
    }

    // Append user data to the file
    fs.appendFileSync(dbFile, userData);
    res.send('Registration successful!');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const dbContent = fs.readFileSync(dbFile, 'utf8');
    const users = dbContent.split('\n').filter(line => line);

    // Check if the username and password match
    const userFound = users.some(line => {
        const [storedUsername, storedPassword] = line.split(',');
        return storedUsername === username && storedPassword === password;
    });

    if (userFound) {
        res.send(`Welcome, ${username}!`);
    } else {
        res.send('Invalid username or password.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
