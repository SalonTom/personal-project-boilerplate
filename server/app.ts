import express from "express";
import { configDotenv } from "dotenv";

// Set up app
const app = express();

// Load env variables
configDotenv();

// App port
const port = process.env.PORT || 3000;

// Allow body parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world !')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});