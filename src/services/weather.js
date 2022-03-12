import Country from "../model/Country";
import Weather from "../model/Weather";

class WeatherService {
    constructor() {
        this.key = process.env.REACT_APP_WEATHER_API_KEY;
    }

    async getCountry(city) {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.key}`);
        const json = await res.json();
        if (!json || !json.length) return null;
        return Country.fromJSON(json[0]);
    }

    async getCurrentWeather(city) {
        const country = await this.getCountry(city);
        if (!country) return null;
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${this.key}`);
        const json = await res.json();
        if (!json) return null;
        return Weather.fromAPIJSON(json);
    }
}

const INSTANCE = new WeatherService();

export default INSTANCE;

