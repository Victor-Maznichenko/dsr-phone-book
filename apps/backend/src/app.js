const express = require('express');
const app = express();
const routes = require('./routes');
const { body, validationResult } = require('express-validator');

/* middleware берущие данные из body и преобразовывают в нужный нам формат (JS обьект) */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});