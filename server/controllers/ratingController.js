const { Rating, Device } = require('../models/models');
const { fn, col } = require('sequelize');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res, next) {
    try {
      const { userId, deviceId, rate } = req.body;

      // Create a new rating entry
      await Rating.create({ userId, deviceId, rate });

      // Calculate the new average rating
      const averageRating = await Rating.findOne({
        where: { deviceId },
        attributes: [[fn('AVG', col('rate')), 'averageRate']],
      });

      // Update the device's rating field
      await Device.update(
        { rating: averageRating?.dataValues.averageRate || 0 },
        { where: { id: deviceId } }
      );

      return res.json({
        deviceId,
        averageRate: averageRating?.dataValues.averageRate || 0,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
