import express from 'express';
import cors from 'cors';
import {connectToDb} from './database';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema';

const app = express();
app.use(cors());
connectToDb();

// app.use(express.json({limit: '8mb', extended: true}));
// app.use(express.urlencoded({limit: '8mb', extended: true}));


app.use('/graphql', graphqlHTTP({  
    graphiql: true,
    schema: schema
}));




app.listen(8080, () => console.log('Server started on port 8080'));
