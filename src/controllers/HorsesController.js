const uuid = require('uuid');
const knex = require('../database');

class HorsesController {
  async create(request, response) {
    const trx = await knex.transaction();

    try {
      const {
        userName,
        userEmail,
        userPhone,
        name,
        sex,
        breed,
        age,
        weight,
        height,
        description,
      } = request.body;

      const images = request.files;
      const imagesFiltered = images.map(image => {
        return `http://localhost:3333/files/${image.filename}`;
      });

      const stringfiedImages = JSON.stringify(imagesFiltered);
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
            images: stringfiedImages,
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
          images: stringfiedImages,
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

  async show(request, response) {
    try {
      const { id } = request.params;

      const horse = await knex('horses')
        .join('users', 'horses.user_id', '=', 'users.id')
        .where('horses.id', '=', id)
        .select([
          'horses.*',
          'users.name as user_name',
          'users.email as user_email',
          'users.phone as user_phone',
        ]);
      delete horse[0].user_id;

      return response.json(horse[0]);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

module.exports = HorsesController;
