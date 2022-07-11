const axios = require('axios').default;

const url = process.env.URL;
const lat = process.env.LAT;
const lon = process.env.LON;
const appId = process.env.APPID;
const getUrl =
  url +
  '?lat=' +
  lat +
  '&lon=' +
  lon +
  '&APPID=' +
  appId +
  '&lang=ru&units=metric';

const getData = axios.get(getUrl).then((response) => {
  return response.data;
});
module.exports = { getData };
