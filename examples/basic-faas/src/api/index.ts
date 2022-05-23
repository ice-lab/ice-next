import { Api, Get, useContext, useInject } from '@midwayjs/hooks';
import type { Context } from '@midwayjs/faas';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserService {
  async getUser() {
    return [{
      id: 1,
    }];
  }
}


export default Api(Get('/api'), async () => {
  const user = await useInject(UserService);
  const ctx = useContext<Context>();
  return {
    message: 'Hello World!',
    query: ctx.query,
    user: await user.getUser(),
  };
});
