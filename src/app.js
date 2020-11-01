const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // This by default serves the directory on root server

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'reconifer',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'reconifer',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'reconifer',
    message: 'Sorry, No help will be provided to you :(',
  });
});

app.get('/weather', (req, res) => {
  address = req.query.address;

  if (!address) {
    return res.send({
      error: 'No address provided!',
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        address: location,
        forecast: forecastData,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'No search query provided!',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'reconifer',
    errorMessage: 'Help page not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'reconifer',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Server is up on http://localhost:3000');
});
