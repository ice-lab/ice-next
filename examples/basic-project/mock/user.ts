import type { Request, Response } from 'express';

export default {
  'GET /api/users': {
    users: [1, 2],
  },
  'POST /api/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    res.send({ id: id });
  },
};
