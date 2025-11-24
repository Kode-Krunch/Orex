import ApiService from './ApiService';

export async function apiGetdealsearchdrop(Parameters, data) {
  return ApiService.fetchData({
    url: `/dealmaster/search/?LocationCode=${Parameters.LocationCode}&ChannelCode=${Parameters.ChannelCode}&keys=${data}&isNTC=${Parameters.isNTC}`,
    method: 'get',
  });
}
export async function apiGetcancelremarkmasterdrop(data) {
  return ApiService.fetchData({
    url: '/cancelremarkmaster/',
    method: 'get',
  });
}
