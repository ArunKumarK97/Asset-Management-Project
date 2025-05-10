const { Asset, AssetTransaction, ScrappedAsset, AssetCategory, Employee } = require('../models');

exports.getAssetList = async (req, res) => {
  const assets = await Asset.findAll();
  res.render('history/list', { assets });
};

exports.getHistory = async (req, res) => {
  const id = req.params.id;

  const asset = await Asset.findByPk(id, {
    include: [{ model: AssetCategory, as: 'category' }]
  });

  const transactions = await AssetTransaction.findAll({
    where: { asset_id: id },
    include: [{ model: Employee, as: 'employee' }],
    order: [['created_at', 'ASC']]
  });

  const scrap = await ScrappedAsset.findOne({ where: { asset_id: id } });

  res.render('history/detail', {
    asset,
    transactions,
    scrap
  });
};
