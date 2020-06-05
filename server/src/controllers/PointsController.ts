import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',') // separando os items por ,
      .map((item) => Number(item.trim())); // trimando os espaços que possam ter entre um numero e outro: 1,2 = 1,     2

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found' }); // inicio 4 aconteceu um erro do lado do usuario
    }
    // prettier-ignore
    const items = await knex('items')
    .join('point_items','items.id','=','point_items.item_id')
    .where('point_items.point_id', id)
    .select('items.title')

    /**
     * SELECT * FROM items
     *  JOIN point_items ON items.id = point_items.item_id
     * WHERE point_items.point_id = {id}
     */

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction(); // transaction usado para caso a segunda query falhar, a primeira nao executar

    const point = {
      image: 'image-fake',
      name, // podemos escrever a variavel assim ou name: name
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      // definindo o tipo para numero para o ts nao reclamar
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit(); // necessário para escrever no banco de dados, se nao vai ficar dando erro de request

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
