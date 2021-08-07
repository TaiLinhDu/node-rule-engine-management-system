import config  from 'config';
import express from 'express';
import mongoose from 'mongoose';
import {globalRouter} from "./controllers/router";
import {globalErrorHandler} from "./middlewares/errorhandler.middleware";
var cors = require('cors');


/** DB init*/
export const app: express.Application = express();
const DB_HOST: string = config.get('database.host');
const PORT: string = config.get('server.port');

mongoose.connect(DB_HOST ,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});


/** Express init*/
app.use(cors())
app.use(express.json());
app.use('/api', globalRouter);
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is now running at port: ${PORT}`);
});


