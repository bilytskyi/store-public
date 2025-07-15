const ApiError = require('../error/ApiError');
const { Comments, User } = require('../models/models');

class CommentsController {
  async create(req, res, next) {
    try {
      const { userId, deviceId, comment } = req.body;
      const commentRes = await Comments.create({ userId, deviceId, comment });
      res.json(commentRes);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCommentsByDeviceId(req, res, next) {
    try {
      const { id } = req.params;
      const comments = await Comments.findAll({
        where: { deviceId: id },
        order: [['id', 'ASC']],
        include: [
          {
            model: User,
            attributes: ['email'], // Only get the email from the User table
          },
        ],
      });

      res.json(comments);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CommentsController();
