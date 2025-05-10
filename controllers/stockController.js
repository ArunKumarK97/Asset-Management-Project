const { Asset, AssetCategory } = require('../models');
const { Sequelize } = require('sequelize');

exports.getStockView = async (req, res) => {
  const assets = await Asset.findAll({
    where: { status: 'in_stock' },
    attributes: [
      'branch',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_assets'],
      [Sequelize.fn('SUM', Sequelize.col('purchase_price')), 'total_value']
    ],
    group: ['branch'],
    raw: true
  });

  const grandTotal = assets.reduce((sum, row) => sum + parseFloat(row.total_value || 0), 0);

  res.render('stock/view', {
    assets,
    grandTotal
  });
};
