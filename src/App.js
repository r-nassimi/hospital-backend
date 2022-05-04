const dotenv = require('dotenv').config();

const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRoutes = require('./Modules/Routes/routes');
const errorMiddleware = require('./Modules/Middleware/authorization-middleware')

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set('Access-Control-Allow-Origin', '*');
app.use(apiRoutes);
app.use(errorMiddleware);

app.use('/', apiRoutes);

const url = process.env.APP_URL;

const PORT = 5000;
const app = express();

const start = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log(`Server started on port = ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    };
};