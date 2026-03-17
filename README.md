# Weather App - DataOps

## Description

## Installation

- Clonse this repo
- On your terminal
    - `cd` to the root folder
    - delete data folder to start your own
    - setup `.env` with:
        - `PORT` of your choosing
        - `CITY` of your choosing
        - `API_KEY` from openweather
    - `npm i` to install dependencies
    - `node fetchWeather.js` to create/update data folder
    - `node app.js` to start server
- Open browser on `PORT` to see weather and graph

### Using Docker
- Open your Docker Desktop
- Make sure you are on same path as Dockerfile
- On your terminal run:
    - `docker build -t weatherapp .` or `docker build -t <app-name> .` - to build an image based on Dockerfile
    - `docker run -p <local-port>:<container-port> <image-name>` or `docker run -p 3000:5000 weatherapp` - to run a container based on an image

## Tests

We have tests to check if files inside data folder is correct