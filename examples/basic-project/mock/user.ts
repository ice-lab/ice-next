import type { Request, Response } from 'express';

export default {
  'GET /api/users': {
    users: ['a', 'c'],
  },
  'POST /api/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    res.send({ id: id });
  },
};
