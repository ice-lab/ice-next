import type { Request, Response } from 'express';

export default {
  'GET /api/users': ['a', 'b'],
  'POST /api/users/:id': (request: Request, response: Response) => {
    const { id } = request.params;
    response.send({ id: id });
  },
};
