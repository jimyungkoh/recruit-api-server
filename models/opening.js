const {DataTypes} = require('sequelize');

/**
 * 채용 api 채용공고 모델
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = function (sequelize) {
  const Opening = sequelize.define('Opening', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tech_stack: {
      type: DataTypes.STRING,
      allowNull: false
    }, company_id: {
      type: DataTypes.BIGINT,
      references: 'company',
      referencesKey: 'id'
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'opening'
  });

  Opening.associate = models => {
    /**
     * 채용공고(Opening)-회사(Company) 관계 (N:1)
     * */
    Opening.belongsTo(models.Company, {
      foreignKey: {
        name: 'company_id',
        allowNull: false
      },
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    /**
     * 채용공고(Opening)-JobApplication(지원 내역) 관계 (1:N)
     */
    Opening.hasMany(models.JobApplication, {
      foreignKey: {
        name: 'opening_id',
        allowNull: true
      },
      sourceKey: 'id'
    });
  };

  return Opening;
};
