/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Service = require('./Service');
const config = require('../config');
const knex = require('../knex');
const AppError = require('../utils/error');

const generateAuthTokens = ({ id, role }, response) => {
  const accessToken = jwt.sign({ id, role }, config.ACCESS_SECRET, { expiresIn: '30m' });
  const refreshToken = jwt.sign({ id }, config.REFRESH_SECRET, { expiresIn: '7d' });

  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
  });

  return accessToken;
}

/**
* Авторизация администратора
*
* authLoginPostRequest AuthLoginPostRequest 
* returns _auth_login_post_200_response
* */
const adminAuthLoginPOST = async ({ body }, response) => {
  const { email, password } = body;

  // 1) Ищем пользователя
  const user = await knex('users').where({ email, role: 'admin' }).first();
  if (!user) {
    throw new AppError('Неверный email или пароль', 401);
  }

  // 2) Сравниваем пароль
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Неверный email или пароль', 401);
  }

  // 3) Отдаем accessToken / записываем refreshToken в cookies
  return Service.successResponse(generateAuthTokens(user, response), 201);
};

/**
* Авторизация пользователя
*
* authLoginPostRequest AuthLoginPostRequest 
* returns _auth_login_post_200_response
* */
const authLoginPOST = async ({ body }, response) => {
  const { email, password } = body;

  // 1) Ищем пользователя
  const user = await knex('users').where({ email, role: 'user' }).first();
  if (!user) {
    throw new AppError('Неверный email или пароль', 401);
  }

  // 2) Сравниваем пароль
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Неверный email или пароль', 401);
  }

  // 3) Отдаем accessToken / записываем refreshToken в cookies
  return Service.successResponse(generateAuthTokens(user, response), 201);
};

/**
* Получение нового access токена по refresh токену из cookie HttpOnly
* Обновляет просроченный access токен.  Refresh токен должен быть отправлен автоматически браузером как HttpOnly cookie. 
*
* returns _auth_refresh_post_200_response
* */
const authRefreshPOST = async ({ cookies }, response) => {
  try {
    const token = cookies?.refreshToken;

    if (!token) {
      throw new Error('No refresh token');
    }

    const decoded = jwt.verify(token, config.REFRESH_SECRET);

    return Service.successResponse(generateAuthTokens(decoded, response), 201);
  } catch (e) {
    throw new AppError(e.message || 'Invalid refresh token', 401);
  }
};

/**
* Регистрация пользователя
* Регистрирует нового пользователя и возвращает access token.
*
* createUserRequest CreateUserRequest 
* returns _auth_register_post_201_response
* */
const authRegisterPOST = async ({ body }, response) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const [{ id, role }] = await knex('users').insert(
      { ...body, password: hashedPassword },
      ['id', 'role']
    );

    return Service.successResponse(generateAuthTokens({ id, role }, response), 201);
  } catch (e) {
    throw new Error(e.message || 'Invalid input');
  }
};

module.exports = {
  adminAuthLoginPOST,
  authLoginPOST,
  authRefreshPOST,
  authRegisterPOST,
};
