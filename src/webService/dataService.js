import urlEndPoints from '../config/urlEndPoints';

export const getData = () => {
  var url = urlEndPoints.getDataFromApi;
  var request = {
    method: 'GET',
    header: new Headers({
      'content-type': 'text/plain',
      'access-control-allow-origin': '*',
      vary: 'Accept-Encoding',
    }),
  };
  return fetch(url, request);
};
