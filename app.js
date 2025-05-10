const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

const categoryRoutes = require('./routes/assetCategoryRoutes');
app.use('/categories', categoryRoutes);

const assetRoutes = require('./routes/assetRoutes');
app.use('/assets', assetRoutes);

const stockRoutes = require('./routes/stockRoutes');
app.use('/stock', stockRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/transactions', transactionRoutes);

const scrapRoutes = require('./routes/scrapRoutes');
app.use('/scrap', scrapRoutes);

const historyRoutes = require('./routes/historyRoutes');
app.use('/history', historyRoutes);





app.get('/', (req, res) => res.render('dashboard'));


sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server started on http://localhost:3000'));
});
