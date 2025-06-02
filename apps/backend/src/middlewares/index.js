const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET = process.env.JWT_SECRET;

exports.verifyAccessToken = async (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Нет токена' });

  jwt.verify(auth, SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ message: 'Невалидный или просроченный токен' });

    // payload.sub содержит userId
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    // всё ок — сохраняем данные в req и вперёд
    req.user = { id: user.id, role: user.role };
    next();
  });
};