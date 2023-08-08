const express = require('express');
const app = express();
const port = 4001;
const axios = require('axios');
const todos = require('./service/todo.service');
const nodeCron = require("node-cron");
require('dotenv').config();

const myLogger = require('./middleware/errorLogger');

app.get("/todos", async (req, res, next) => {
    try {
        if (req.query.forceError) {
            throw new Error("Test error scenario");
        }
        const response = await todos.getAllTodos();
        return res.json({
            "message": "Todo fetched",
            "data": response
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({
            "error": "Internal Server Error"
        });
    }
});

const job = nodeCron.schedule("1 * * * * *", async function jobYouNeedToExecute() {
    console.log("Cron Started");
    try {
        const response = await axios.get(process.env.REMOTE_HOST);
        const data = response.data;
        const lastItem = data[data.length - 1];
        const lastInsertedId = await todos.getLastRecordId();

        if (lastInsertedId === undefined || lastItem.id < lastInsertedId.id) {
            for (const element of data) {
                const dataToStore = [element.id, element.userId, element.title, element.completed];
                await todos.storeTodos(dataToStore);
            }
        } else {
            console.log("Already updated");
        }

        console.log("Cron Ended");
    } catch (error) {
        console.error("Cron job error:", error);
    }
});

app.use(myLogger)
app.get('/', async (req, res, next) => {
    res.send('welcome to todo api')
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
module.exports = app; 