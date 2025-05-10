const { Asset, Employee, AssetTransaction } = require('../models');
const { Op } = require('sequelize');

exports.getIssueForm = async (req, res) => {
  const assets = await Asset.findAll({ where: { status: 'in_stock' } });
  const employees = await Employee.findAll({ where: { status: true } });
  res.render('transactions/issue', { assets, employees });
};

exports.issueAsset = async (req, res) => {
  const { asset_id, employee_id } = req.body;

  await AssetTransaction.create({
    asset_id,
    employee_id,
    issue_date: new Date(),
    action: 'issue'
  });

  await Asset.update({ status: 'issued' }, { where: { id: asset_id } });
  res.redirect('/assets');
};

exports.getReturnForm = async (req, res) => {
  const assets = await Asset.findAll({ where: { status: 'issued' } });
  res.render('transactions/return', { assets });
};

exports.returnAsset = async (req, res) => {
  const { asset_id, return_reason } = req.body;

  // Get last issue record
  const lastTransaction = await AssetTransaction.findOne({
    where: { asset_id, action: 'issue' },
    order: [['issue_date', 'DESC']]
  });

  await AssetTransaction.create({
    asset_id,
    employee_id: lastTransaction?.employee_id || null,
    return_date: new Date(),
    return_reason,
    action: 'return'
  });

  await Asset.update({ status: 'in_stock' }, { where: { id: asset_id } });
  res.redirect('/assets');
};
