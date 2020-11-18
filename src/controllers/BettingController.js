const uuid = require('uuid');
const knex = require('../database');

class BettingController {
  async create(resquest, response) {
    const trx = knex.transaction();

    const { userName, userEmail, userPhone, betAmount, horses } = resquest.body;

    try {
      const userExits = await knex('users')
        .where({ email: userEmail })
        .select();

      if (!userExits.length) {
        const user_id = uuid.v4();

        const userCreated = await trx('users')
          .insert({
            id: user_id,
            name: userName,
            email: userEmail,
            phone: userPhone,
          })
          .returning('id');

        const bettingId = uuid.v4();

        horses.map(async horse => {
          await knex('betting').insert({
            id: bettingId,
            bet_amount: betAmount,
            horse_id: horse.id,
            user_id: userCreated[0],
          });
        });
      }

      const id = uuid.v4();

      horses.map(async horse => {
        await knex('betting').insert({
          id,
          bet_amount: betAmount,
          horse_id: horse.id,
          user_id: userExits[0].id,
        });
      });

      return response.status(201).json({ success: 'Aposta realizada!' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

module.exports = BettingController;
