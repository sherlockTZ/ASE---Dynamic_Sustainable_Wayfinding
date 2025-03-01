import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
// import 


import connect from './database/connection.js';
import auth from './routes/authentication.js';
import publicTransportIre from './routes/pubtrans.js';

const graphqlHTTP = require("express-graphql");
const app = express();
const { getAndSaveUser, getAndSaveActivities } = require("./services/fetchService");
/** middlewares */
app.use(express.json());
// app.use(cors());
app.use(cors({origin: '*'}));
app.use(morgan('tiny'));
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true
    })
  );
app.disable('x-powered-by'); // less hackers know about our stack

const port = 3000;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', auth)

// app.use('/ipa', publicTransportIre)



/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})


export default app;