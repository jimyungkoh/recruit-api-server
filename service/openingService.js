const {sequelize} = require('../models');
const {NotFoundError} = require('../components/errors');
const Opening = require('../models/opening')(sequelize);

/**
 * 채용공고 id 유효성을 검사
 * @param {number} opening_id
 */
exports.validateOpeningId = async (opening_id) => {
  const opening = await Opening.findOne({
    where: {
      id: opening_id
    }
  });

  if (!opening) {
    throw new NotFoundError(`${opening_id} doesn't exist in company table.`);
  }
}
