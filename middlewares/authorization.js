function authorization(role) {
    return function (req, res, next) {
      if (role !== req.user.role) {
        return res.status(403).json({
          message: "Access denied.",
        });
      }
      next();
    };
  }
  
  module.exports = authorization;