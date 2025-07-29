/* eslint-disable no-unused-vars */
const Service = require('./Service');
const knex = require('../knex');
const AppError = require('../utils/error');

/**
 * Получение текущего профиля пользователя
 *
 * returns ProfileResponse
 */
const getProfile = async ({ user }) => {
  try {
    const profile = await knex('users')
      .select(
        'id',
        'email',
        'about',
        'position',
        'department',
        'officePhone',
        'firstName',
        'lastName',
        'birthday',
        'personalPhones'
      )
      .where({ id: user.id })
      .first();

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    // Профиль владельца — доступ ко всем полям
    return Service.successResponse({
      ...profile,
      hasPersonalAccess: true,
      personalPhones: profile.personalPhones,
    });
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};

/**
 * Обновление текущего профиля пользователя
 *
 * updateProfileRequest UpdateProfileRequest
 * returns ProfileResponse
 */
const patchProfile = async ({ user, updateProfileRequest }) => {
  try {
    // Явно допустимые поля
    const allowedFields = [
      'email',
      'about',
      'position',
      'department',
      'officePhone',
      'firstName',
      'lastName',
      'birthday',
      'personalPhones'
    ];

    // Оставляем только разрешённые поля
    const updateData = {};
    for (const key of allowedFields) {
      if (key in updateProfileRequest) {
        updateData[key] = updateProfileRequest[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError('No valid fields to update', 400);
    }

    await knex('users')
      .where({ id: user.id })
      .update(updateData);

    const updatedProfile = await knex('users')
      .select(
        'id',
        'email',
        'about',
        'position',
        'department',
        'officePhone',
        'firstName',
        'lastName',
        'birthday',
        'personalPhones'
      )
      .where({ id: user.id })
      .first();

    return Service.successResponse({
      ...updatedProfile,
      hasPersonalAccess: true,
      personalPhones: updatedProfile.personalPhones,
    });
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};


/**
 * Удаление текущего профиля пользователя
 *
 * returns ApiResponse
 */
const deleteProfile = async ({ user }, response) => {
  try {
    await knex('users')
      .where({ id: user.id })
      .del();

    response.clearCookie('refresh', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/refresh',
    });

    return Service.successResponse({ userId: user.id });
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', 401);
  }
};

module.exports = {
  getProfile,
  patchProfile,
  deleteProfile,
};
