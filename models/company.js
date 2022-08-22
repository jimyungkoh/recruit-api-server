const {DataTypes} = require('sequelize');

/**
 * 채용 api 회사 모델
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = function (sequelize) {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'company'
  });

  /**
   * Company(회사)-Opening(채용공고) 관계 (1:N)
   */
  Company.associate = models => {
    Company.hasMany(models.Opening, {
      foreignKey: {
        name: 'company_id',
        allowNull: false
      },
      sourceKey: 'id'
    });
  };

  return Company;
};
