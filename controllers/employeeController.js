const { Employee } = require('../models');

exports.getAll = async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status === 'active') where.status = true;
  if (status === 'inactive') where.status = false;

  const employees = await Employee.findAll({ where });
  res.render('employees/list', { employees });
};

exports.getForm = async (req, res) => {
  const employee = req.params.id
    ? await Employee.findByPk(req.params.id)
    : null;
  res.render('employees/form', { employee });
};

exports.createOrUpdate = async (req, res) => {
  const { id, name, email, phone, status } = req.body;

  if (id) {
    await Employee.update({ name, email, phone, status }, { where: { id } });
  } else {
    await Employee.create({ name, email, phone, status });
  }
  res.redirect('/employees');
};

exports.delete = async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } });
  res.redirect('/employees');
};
