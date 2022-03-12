export default class Weather {
    constructor(props) {
        const { id, city, temperature, weather } = props;
        this.id = id;
        this.city = city;
        this.temperature = temperature;
        this.weather = weather;
    }


    /**
     * parse json from weather object format
     * @param {} json 
     * @returns 
     */
    static fromJSON(json) {
        if (!json) return null;
        return new Weather({
            id: json.id ?? '',
            city: json.city ?? '',
            temperature: json.temperature ?? '',
            weather: json.weather ?? ''
        });
    }

    /**
     * Parse OpenWeather api format
     * @param {*} json 
     * @returns 
     */
    static fromAPIJSON(json) {
        if (!json) return null;
        const weather = json['weather'] ? json['weather'][0] : {}
        return new Weather({
            id: weather.id ?? '',
            city: json.name ?? '',
            temperature: (json.main && json.main.temp) || '',
            weather: weather.main ?? ''
        });
    }
}