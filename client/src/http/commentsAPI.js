import { $authHost, $host } from '.';

export const fetchDeviceComments = async id => {
  const { data } = await $host.get('api/comments/' + id);
  return data;
};

export const createDeviceComment = async (userId, deviceId, comment) => {
  const { data } = await $authHost.post('api/comments', {
    userId,
    deviceId,
    comment,
  });
  return data;
};
