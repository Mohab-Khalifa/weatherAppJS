import fs from 'fs'        // Built-in Node.js module used to read, write, and manage files on the system
import path from 'path'    // Built-in Node.js module for working with file and directory paths safely
import dotenv from 'dotenv' // External library that loads environment variables from a .env file into process.env

dotenv.config()

const DATA_DIR = path.join(import.meta.dirname, 'data');
if(!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR)
}

const WEATHER_FILE = path.join(DATA_DIR, 'weather.json')
const LOG_FILE = path.join(DATA_DIR, 'weather_log.csv')

export async function fetchWeather() {
    const apiKey = process.env.WEATHER_API_KEY
    const city = process.env.CITY || 'London'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`)
        }

        const data = await response.json()
        const nowUTC = new Date().toISOString()
        data._last_updated_utc = nowUTC
        fs.writeFileSync(WEATHER_FILE, JSON.stringify(data, null, 2))

        const header = 'timestamp,city,temperature,description\n'
        if(!fs.existsSync(LOG_FILE)) {
            fs.writeFileSync(LOG_FILE, header)
        } else {
            const firstLine = fs.readFileSync(LOG_FILE, 'utf8').split('\n')[0]
            if(firstLine !== 'timestamp,city,temperature,description') {
                fs.writeFileSync(LOG_FILE, header + fs.readFileSync(LOG_FILE, 'utf8'))
            }
        }

        const logEntry = `${nowUTC},${city},${data.main.temp},${data.weather[0].description}\n`
        fs.appendFileSync(LOG_FILE, logEntry)

        console.log(`Weather data updated for ${city} at ${nowUTC}`);

    } catch(err) {
        console.log('Error fetching weather:', err);
    }
}

console.log(import.meta.filename);
console.log(`${process.argv[1]}`)

if (import.meta.filename === `${process.argv[1]}`) {
    fetchWeather();
}