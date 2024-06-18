const express = require('express');
const {router: tasksRouter} = require('./routes/task.routes')
const {connectDB} = require('./db/connection');
const path = require('path');
const notFound = require("./middlewares/not-found.middleware");
const errorHandler = require("./middlewares/error-handler.middleware");
require('dotenv').config()                          // loads .env file contents into process.env
const app = express();


// MIDDLEWARES
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// ROUTES
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED TO DB...');
        app.listen(process.env.PORT, () => {
            console.log('SERVER IS RUNNING ON PORT 3000...');
        })
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();









