module.exports = (sequelize, DataTypes) => {
  const ScrappedAsset = sequelize.define('ScrappedAsset', {
    asset_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    scrap_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reason: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'scrapped_assets',
    timestamps: false,
  });

  ScrappedAsset.associate = (models) => {
    ScrappedAsset.belongsTo(models.Asset, { foreignKey: 'asset_id', as: 'asset' });
  };

  return ScrappedAsset;
};
