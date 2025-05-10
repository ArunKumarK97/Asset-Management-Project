module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
    },
    purchase_price: {
      type: DataTypes.DECIMAL(12, 2),
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'in_stock',
    },
    branch: {
      type: DataTypes.STRING,
    },
    asset_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'asset_categories',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'assets',
    timestamps: false,
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.AssetCategory, {
      foreignKey: 'asset_category_id',
      as: 'category'
    });
  };

  return Asset;
};
