exports.seed = async function (knex) {
  await knex('access_requests').del();

  const userIds = await knex('users').pluck('id');

  if (userIds.length === 0) {
    console.log('Нет пользователей, нельзя создать запросы');
    return;
  }

  const requests = [];
  for (let i = 0; i < 10; i++) {
    const requesterId = userIds[Math.floor(Math.random() * userIds.length)];

    let targetUserId;
    do {
      targetUserId = userIds[Math.floor(Math.random() * userIds.length)];
    } while (targetUserId === requesterId);

    requests.push({
      requesterId,
      targetUserId,
      status: 'pending',
    });
  }

  console.log(requests);
  try {
    await knex('access_requests').insert(requests);
    console.log('Вставка запросов прошла успешно');
  } catch (err) {
    console.error('Ошибка при вставке запросов:', err);
  }
};
