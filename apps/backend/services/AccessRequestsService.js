/* eslint-disable no-unused-vars */
const knex = require('../knex');
const Service = require('./Service');
const AppError = require('../utils/error');

/**
* Получение данных о запросах
*
* status RequestStatus Фильтр по статусу запроса (optional)
* returns List
* */
const getAllAccessRequests = async ({ status, ...request }) => {
  try {
    // Параметры пагинации
    const limit = Number(request.limit ?? 10);
    const offset = Number(request.offset ?? 0);

    // Строим базовый запрос
    const query = knex('access_requests')
      .select(
        'id',
        'requesterId',
        'targetUserId',
        'status'
      );

    // Добавляем фильтрацию по статусу, если передан параметр
    if (status) {
      query.where('status', status);
    }

    // Применяем лимит и оффсет
    const accessRequests = await query
      .limit(limit)
      .offset(offset);

    // Возвращаем результаты
    return Service.successResponse(accessRequests);
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', e.status || 405);
  }
};
/**
* Изменение статуса запроса
*
* requestId Integer 
* patchAccessRequestRequest PatchAccessRequestRequest 
* returns List
* */
const patchAccessRequest = async ({ requestId, patchAccessRequestRequest }) => {
  try {
    return Service.successResponse({ requestId, patchAccessRequestRequest });
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', e.status || 405);
  }
}
/**
* Формирование нового запроса на получение личных данных пользователя
*
* postAccessRequestRequest PostAccessRequestRequest 
* returns ApiResponse
* */
const postAccessRequest = async ({ body, user }) => {
  try {
    const { targetUserId, status = 'pending' } = body;

    // Простейшая валидация
    if (!user.id || !targetUserId) {
      throw new AppError('Missing required fields: userId or targetUserId', 400);
    }

    // Вставка нового запроса в базу данных
    const [newAccessRequest] = await knex('access_requests')
      .insert({
        requesterId: user.id,
        targetUserId,
        status
      })
      .returning(['id', 'requesterId', 'targetUserId', 'status']); // PostgreSQL поддерживает .returning

    return Service.successResponse(newAccessRequest);
  } catch (e) {
    throw new AppError(e.message || 'Invalid input', e.status || 405);
  }
};


module.exports = {
  getAllAccessRequests,
  patchAccessRequest,
  postAccessRequest,
};
