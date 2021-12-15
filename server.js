const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');

const lostObjectRoute = require('./routes/lostObjectRoute');
const userRoutes = require('./routes/userRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.Promise = global.Promise;

const mongoURI =
  process.env.MONGODB_CONNECTION_STRING ||
  'mongodb://localhost:27017/lostNfound';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

app.use('/api/lostNfound/', lostObjectRoute);

app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('SERVER STARTED');
});
