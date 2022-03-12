export default class Country {
    constructor(props) {
        const { lat, lon, name } = props;
        this.lat = lat;
        this.lon = lon;
        this.name = name;
    }

    static fromJSON(json) {
        return new Country({
            lat: json.lat,
            lon: json.lon,
            name: json.name
        });
    }
}