const { AssetCategory } = require('../models');

exports.getAll = async (req, res) => {
  const categories = await AssetCategory.findAll();
  res.render('categories/list', { categories });
};

exports.getForm = async (req, res) => {
  const category = req.params.id
    ? await AssetCategory.findByPk(req.params.id)
    : null;
  res.render('categories/form', { category });
};

exports.createOrUpdate = async (req, res) => {
  const { id, name, description } = req.body;

  if (id) {
    await AssetCategory.update({ name, description }, { where: { id } });
  } else {
    await AssetCategory.create({ name, description });
  }
  res.redirect('/categories');
};

exports.delete = async (req, res) => {
  await AssetCategory.destroy({ where: { id: req.params.id } });
  res.redirect('/categories');
};
