const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const db = require('../models');
console.log('models:', Object.keys(db));   // should include "User"
const { User } = db;


const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

exports.registration = async (req, res) => {
  try {
    const { email, password, fullName, birthDate, workPhone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      birthDate,
      workPhone,
      role: 'user'
    });

    // Генерируем токены
    const accessToken  = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Ставим refreshToken в куку
    res.cookie('refreshToken', refreshToken, {
      httpOnly:  true,
      secure:    process.env.NODE_ENV === 'production',
      sameSite:  'strict',
      maxAge:    REFRESH_TOKEN_MAX_AGE
    });

    // Возвращаем accessToken и данные пользователя
    res.status(201).json({
      message: 'Пользователь успешно создан',
      user: {
        id:        user.id,
        email:     user.email,
        fullName:  user.fullName,
        birthDate: user.birthDate,
        workPhone: user.workPhone,
        role:      user.role
      },
      accessToken
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Находим пользователя
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Неверные данные' });
    }

    // 2. Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверные данные' });
    }

    // 3. Генерируем токены
    const accessToken  = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Ставим refresh-токен в httpOnly-куку
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: REFRESH_TOKEN_MAX_AGE // 7 дней
    });

    // 5. Отдаём клиенту access-токен и публичные данные пользователя
    res.json({
      message: 'Вход выполнен успешно',
      accessToken,
      user: {
        id:        user.id,
        email:     user.email,
        fullName:  user.fullName,
        birthDate: user.birthDate,
        workPhone: user.workPhone,
        role:      user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
