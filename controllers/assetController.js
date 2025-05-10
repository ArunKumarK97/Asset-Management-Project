const { Asset, AssetCategory } = require('../models');

exports.getAll = async (req, res) => {
  const { status, category } = req.query;
  const where = {};
  if (status) where.status = status;
  if (category) where.asset_category_id = category;

  const assets = await Asset.findAll({
    where,
    include: [{ model: AssetCategory, as: 'category' }],
  });
  const categories = await AssetCategory.findAll();

  res.render('assets/list', { assets, categories });
};

exports.getForm = async (req, res) => {
  const asset = req.params.id ? await Asset.findByPk(req.params.id) : null;
  const categories = await AssetCategory.findAll();
  res.render('assets/form', { asset, categories });
};

exports.createOrUpdate = async (req, res) => {
  const data = {
    unique_id: req.body.unique_id,
    serial_number: req.body.serial_number,
    make: req.body.make,
    model: req.body.model,
    purchase_date: req.body.purchase_date,
    purchase_price: req.body.purchase_price,
    status: req.body.status,
    branch: req.body.branch,
    asset_category_id: req.body.asset_category_id,
  };

  if (req.body.id) {
    await Asset.update(data, { where: { id: req.body.id } });
  } else {
    await Asset.create(data);
  }
  res.redirect('/assets');
};

exports.delete = async (req, res) => {
  await Asset.destroy({ where: { id: req.params.id } });
  res.redirect('/assets');
};
