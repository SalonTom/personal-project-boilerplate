import express from "express";
import { configDotenv } from "dotenv";
import RoutesRegistrationUtils from "./utils/routing/routesRegistrationUtils";

// Load env variables
configDotenv();

// Set up app
const app = express();

// Allow body parsing
app.use(express.json());

// App port
const port = process.env.PORT || 3000;

RoutesRegistrationUtils.registerRoutesAsync(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});