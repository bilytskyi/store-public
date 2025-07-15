import { $authHost } from '.';

export const createBasketDevice = async (deviceId, basketId) => {
  const { data } = await $authHost.post('/api/basket', { deviceId, basketId });
  return data;
};

export const fetchDevicesFromBasket = async basketId => {
  const { data } = await $authHost.get('/api/basket', {
    params: { basketId },
  });
  return data;
};
