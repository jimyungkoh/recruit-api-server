const {DataTypes} = require('sequelize');

/** 채용 api 지원자 모델
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = function (sequelize) {
  const Applicant = sequelize.define('Applicant', {
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
    tableName: 'applicant'
  });

  /**
   * Applicant(지원자)-JobApplication(지원 내역) 관계 (1:N)
   * */
  Applicant.associate = models => {
    Applicant.hasMany(models.JobApplication, {
      foreignKey: {
        name: 'applicant_id',
        allowNull: true
      },
      sourceKey: 'id'
    });
  };

  return Applicant;
};
