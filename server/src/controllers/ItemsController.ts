import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    // como usamos await temos que declarar a funçao com async
    const items = await knex('items').select('*'); // essa função demora por isso usamos await

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    }); //tranformar os dados pra um novo formato assecivel > serializar

    return response.json(serializedItems);
  }
}
export default ItemsController;
