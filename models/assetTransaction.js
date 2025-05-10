module.exports = (sequelize, DataTypes) => {
  const AssetTransaction = sequelize.define('AssetTransaction', {
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issue_date: {
      type: DataTypes.DATE,
    },
    return_date: {
      type: DataTypes.DATE,
    },
    return_reason: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.ENUM('issue', 'return'),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'asset_transactions',
    timestamps: false
  });

  AssetTransaction.associate = models => {
    AssetTransaction.belongsTo(models.Asset, { foreignKey: 'asset_id', as: 'asset' });
    AssetTransaction.belongsTo(models.Employee, { foreignKey: 'employee_id', as: 'employee' });
  };

  return AssetTransaction;
};
