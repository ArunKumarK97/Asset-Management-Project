const { Asset, ScrappedAsset } = require('../models');

exports.getForm = async (req, res) => {
  const assets = await Asset.findAll({
    where: { status: { [require('sequelize').Op.ne]: 'scrapped' } }
  });
  res.render('scrap/form', { assets });
};

exports.scrapAsset = async (req, res) => {
  const { asset_id, reason } = req.body;

  await ScrappedAsset.create({
    asset_id,
    reason,
  });

  await Asset.update({ status: 'scrapped' }, { where: { id: asset_id } });

  res.redirect('/assets');
};
