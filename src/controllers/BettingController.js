const uuid = require('uuid');
const knex = require('../database');

class BettingController {
  async create(resquest, response) {
    const {
      user_name,
      user_email,
      user_phone,
      bet_amount,
      horses,
    } = resquest.body;
    const userExits = await knex('users').where({ email: user_email }).select();

    if (!userExits.length) {
      const user_id = uuid.v4();

      const userCreated = await trx('users')
        .insert({
          id: user_id,
          name: user_name,
          email: user_email,
          phone: user_phone,
        })
        .returning('id');

      // horses.map(horse=>{
      //   knex('')
      // })
    }
  }
}

module.exports = BettingController;
