import { request } from 'ice';

const service = {
  getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'ICE',
          age: 26,
        });
      }, 1000);
    });
  },

  async getRepo(id) {
    return await request(`/api/repo/${id}`);
  },

  async getDetail(params) {
    const data = await request({
      url: '/api/detail',
      params,
    });

    return data.map(item => {
      return {
        ...item,
        price: item.oldPrice,
        text: item.status === '1' ? '确定' : '取消',
      };
    });
  },
};
export default service;
