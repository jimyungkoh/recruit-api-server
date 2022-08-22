const {DataTypes} = require('sequelize');

/**
 * 채용 api 지원 내역 모델
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = function (sequelize) {
  const JobApplication = sequelize.define('JobApplication', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    }, opening_id: {
      type: DataTypes.BIGINT,
      references: 'opening',
      referencesKey: 'id'
    }, applicant_id: {
      type: DataTypes.BIGINT,
      references: 'applicant',
      referencesKey: 'id'
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'job_application'
  });

  JobApplication.associate = models => {
    /**
     * JobApplication(지원 내역)-Opening(채용공고) 관계 (N:1)
     * */
    JobApplication.belongsTo(models.Opening, {
        foreignKey: {
          name: 'opening_id',
          allowNull: false,
          type: DataTypes.INTEGER
        },
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );

    /**
     * JobApplication(지원 내역)-Applicant(지원자) 관계 (N:1)
     * */
    JobApplication.belongsTo(models.Applicant, {
        foreignKey: {
          name: 'applicant_id',
          allowNull: false,
          type: DataTypes.INTEGER
        },
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  };

  return JobApplication;
};
