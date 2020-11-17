const uuid = require('uuid');
const knex = require('../database');

class HorsesController {
  async create(request, response) {
    const trx = await knex.transaction();

    try {
      const {
        user,
        name,
        sex,
        breed,
        age,
        weight,
        height,
        description,
      } = request.body;

      const userExits = await knex('users')
        .where({ email: user.email })
        .select();

      if (!userExits.length) {
        const user_id = uuid.v4();

        const userCreated = await trx('users')
          .insert({
            id: user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
          .returning('id');

        const horseId = uuid.v4();

        const horseCreated = await trx('horses')
          .insert({
            id: horseId,
            name,
            sex,
            breed,
            age,
            weight,
            height,
            user_id: userCreated[0],
            description,
          })
          .returning('*');

        await trx.commit();
        return response.status(201).json(horseCreated);
      }

      const id = uuid.v4();

      const horse = await knex('horses')
        .insert({
          id,
          name,
          sex,
          breed,
          age,
          weight,
          height,
          user_id: userExits[0].id,
          description,
        })
        .returning('*');

      return response.status(201).json(horse);
    } catch (error) {
      await trx.rollback();
      response.status(400).json({ error });
    }
  }
}

module.exports = HorsesController;
