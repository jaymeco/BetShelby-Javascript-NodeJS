const knex = require('../database');

class HorsesController {
  async create(request, response) {
    try {
      const {
        name,
        sex,
        breed,
        age,
        weight,
        height,
        description,
      } = request.body;

      const horse = await knex('horses')
        .insert({
          name,
          sex,
          breed,
          age,
          weight,
          height,
          description,
        })
        .returning('*');

      return response.status(201).json(horse);
    } catch (error) {
      response.status(400).json({ error });
    }
  }
}

module.exports = HorsesController;
