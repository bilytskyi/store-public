const ApiError = require('../error/ApiError');
const { BasketDevice, Device } = require('../models/models');

class BasketController {
  async create(req, res, next) {
    const { deviceId, basketId } = req.body; // basketId should be the same as userId
    const basketDevice = await BasketDevice.create({ deviceId, basketId });
    return res.json(basketDevice);
  }

  async getAll(req, res, next) {
    try {
      const { basketId } = req.query; // basketId should be the user's basket ID

      console.log(req.body);

      const devices = await BasketDevice.findAll({
        where: { basketId },
        include: [{ model: Device }], // Include full device details
      });

      return res.json(devices);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
