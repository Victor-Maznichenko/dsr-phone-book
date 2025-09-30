/* eslint-disable no-unused-vars */
const Service = require('./Service');
const knex = require('../knex');
const AppError = require('../utils/error');

/**
* Удаление пользователя по переданному ID
*
* userId Integer 
* returns ApiResponse
* */
const deleteUserById = async ({ userId }) => {
  try {
    // Проверяем, что пользователь существует
    const existing = await knex('users')
      .select('id')
      .where({ id: userId })
      .first();

    if (!existing) {
      throw new AppError('User not found', 404);
    }

    // Удаляем пользователя
    await knex('users')
      .where({ id: userId })
      .del();

    return Service.successResponse({ userId });
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};

/**
* Получение данных о пользователях
*
* returns List
* */
const getAllUsers = async (request) => {
  try {
    // 1) Базовый запрос:
    const limit = Number(request.limit ?? 10);
    const offset = Number(request.offset ?? 0);

    const users = await knex('users').select(
      'id',
      'email',
      'about',
      'avatar',
      'position',
      'department',
      'officePhone',
      'firstName',
      'lastName',
      'birthday'
    ).limit(limit).offset(offset);

    // 2) Если не админ — запрашиваем список одобренных запросов
    const currentUser = request.user;
    let approvedTargetsSet = new Set();

    if (currentUser.role !== 'admin') {
      const approved = await knex('access_requests')
        .where({
          requesterId: currentUser.id,
          status: 'approved'
        })
        .pluck('targetUserId');

      approvedTargetsSet = new Set(approved);
    }

    // 3) Формируем ответ
    const result = users.map((u) => {
      const hasPersonalAccess = u.role === 'admin' ? null : approvedTargetsSet.has(u.id);
      const hasAccess = currentUser.role === 'admin' || hasPersonalAccess;

      return {
        ...u,
        hasPersonalAccess,
        personalPhones: hasAccess ? u.personalPhones : []
      };
    });

    return Service.successResponse(result);
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};

/**
* Получение данных о пользователе по переданному ID
*
* userId Integer 
* returns UserResponse
* */
const getUserById = async ({ userId, user: currentUser }) => {
  try {
    // 1) Получаем самого пользователя
    const user = await knex('users')
      .select(
        'id',
        'email',
        'about',
        'avatar',
        'position',
        'department',
        'officePhone',
        'firstName',
        'lastName',
        'birthday',
        'personalPhones'
      )
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error('User not found', 404);
    }

    // 2) Проверяем право доступа
    let hasPersonalAccess = null;

    if (currentUser.role !== 'admin') {
      // если не админ — ищем запрос на доступ к этому пользователю
      const approved = await knex('access_requests')
        .where({
          requesterId: currentUser.id,
          targetUserId: userId,
          status: 'approved'
        })
        .first();

      hasPersonalAccess = Boolean(approved);
    }

    const hasAccess = currentUser.role === 'admin' || hasPersonalAccess;

    // 3) Формируем и возвращаем ответ
    const result = {
      ...user,
      hasPersonalAccess,
      personalPhones: hasAccess ? user.personalPhones : []
    };

    return Service.successResponse(result);
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};

/**
* Изменение данных пользователя по переданному ID (for admins)
*
* userId Integer 
* updateProfileRequest UpdateProfileRequest 
* returns ProfileResponse
* */
const patchUserById = ({ userId, updateProfileRequest }) => {
  try {
    return Service.successResponse({
      userId,
      updateProfileRequest,
    });
  } catch (e) {
    throw new Error(e.message || 'Invalid input');
  }
};

module.exports = {
  deleteUserById,
  getAllUsers,
  getUserById,
  patchUserById,
};
