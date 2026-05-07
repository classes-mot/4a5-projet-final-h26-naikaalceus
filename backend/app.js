import express from 'express';
import ticketsRoutes from './routes/tickets-routes.js';
import songsRoutes from './routes/songs-routes.js'
import usersRoutes from './routes/users-routes.js';
import errorHandler from './handler/error-handler.js';
import { connectDB } from './util/bd.js';

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017//bd-deploy';

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/tickets', ticketsRoutes);

app.use('/api/songs', songsRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);

await connectDB();

app.listen(5000, () => {
  console.log('serveur écoute au', `http://localhost:5000`);
});