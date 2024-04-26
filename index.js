const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const userRouter = require('./src/routes/users');
const diaryRouter = require('./src/routes/diary');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/users', userRouter);
app.use('/users', diaryRouter);

// app.use('/', (req, res) => {
//     return res.send('Hallo')
// })

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});

app.use('/users', userRouter);
app.use('/diary', diaryRouter);

module.exports = app;
