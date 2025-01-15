const axios = require('axios');
const moment = require('moment-timezone');
const _ = require('lodash');
require('dotenv').config();
const API_KEY = process.env.API_KEY;

exports.fetchGeoData = async (zipCode) => {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${API_KEY}`;
    try {
        const geoResponse = await axios.get(geoUrl);
        const { lat, lon } = geoResponse.data;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const weatherResponse = await axios.get(weatherUrl);
        const { timezone } = weatherResponse.data;
        const offsetInMinutes = timezone / 60;
        const timezoneName = _.find(moment.tz.names(), (timezoneName) => {
            return moment.tz(timezoneName).utcOffset() === offsetInMinutes;
        });

        return { latitude: lat, longitude: lon, timezone: timezoneName };
    } catch (error) {
        throw new Error('Failed to fetch geolocation and timezone data');
    }
};