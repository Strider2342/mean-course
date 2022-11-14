const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
const categortyRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

app.use(`${api}/categories`, categortyRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello API!');
});

mongoose
  .connect(`${process.env.MONGO_CONNECTION_STRING}/eshop-database`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
  })
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(80, () => {
  console.log('Example app listening on port 80!');
});
