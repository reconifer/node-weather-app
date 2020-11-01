const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.openweathermap.org/data/2.5/weather?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&appid=07fd4a958cdb6f2a6757b2d00f36d940&units=metric';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else {
      callback(
        undefined,
        `It is curently ${body.main.temp} degrees out there!.`
      );
    }
  });
};

module.exports = forecast;
