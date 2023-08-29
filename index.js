const express = require('express');
const cors = require('cors');

const app = express();

const YEAR = 365 * 24 * 60 * 60 * 1000;

const corsOptions = {
  origin: '*',
  allowedHeaders: '*',
  methods: ['GET'],
};

app.use(cors(corsOptions));
app.use(express.static('static', { maxAge: YEAR }))

app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Replit Docs Image Server')
});

app.listen(3000, () => {
  console.log('server started');
});
