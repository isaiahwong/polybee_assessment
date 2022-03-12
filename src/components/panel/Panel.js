import React, { Component } from 'react';
import cn from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';

import WeatherService from '../../services/weather';
import style from './Panel.module.css';
import TextField from '../textfield';
import CustomButton from '../button/Button';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            edit: false,
            error: false,
        }

        this.tfRef = React.createRef();
        this.onCountryEnter = this.onCountryEnter.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        const { weather } = this.props;
        const that = this;

        // Attempt to get weather from parent
        if (weather) this.setState({ weather });

        this.refreshWeatherInterval = setInterval(() => {
            if (!that.state.weather) return;
            this.getData(this.state.weather.city);
        }, 30 * 1000);
    }

    componentWillUnmount() {
        if (this.refreshWeatherInterval) clearInterval(this.refreshWeatherInterval);
    }

    /**
     * Request weather data via WeatherService API
     * @param {string} city 
     * @returns 
     */
    async getData(city) {
        try {
            const weather = await WeatherService.getCurrentWeather(city);
            if (!weather) {
                this.setState({ error: true, weather: null });
                return;
            }

            this.setState({ error: false, weather, edit: false });
            this.props.onDataLoaded(weather);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Fn handler for input
     * @returns 
     */
    onCountryEnter() {
        if (!this.tfRef.current || !this.tfRef.current.value) return;
        this.getData(this.tfRef.current.value);
    }


    onEdit() {
        this.setState({ edit: true });
    }

    Error() {
        if (!this.state.error) return;
        return <span className={style.error}>Error getting data. Try again!</span>;
    }

    Placeholder() {
        return (
            <div className={cn("d-flex align-items-center justify-content-center", style.empty_placeholder)}>
                <div
                    onClick={this.onEdit}
                    className={style.title_placeholder}
                >
                    Add a City!
                </div>
            </div>

        );
    }

    Edit() {
        return (
            <div className={cn("d-flex flex-column align-items-center justify-content-center", style.input_wrapper)}>
                <TextField
                    placeholder="Enter City!"
                    className={style.input_placeholder}
                    ref={this.tfRef}
                />
                {this.Error()}
                <CustomButton onClick={this.onCountryEnter} value="Enter" />
            </div>
        );
    }

    GetURL(id) {
        return `http://openweathermap.org/img/wn/${id}@2x.png`;
    }

    // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    GetIcon(id) {
        if (!id) return;
        const intId = parseInt(id);

        if (intId >= 200 && intId <= 232) return this.GetURL('11d');
        if ((intId >= 300 && intId <= 321) || (intId >= 520 && intId <= 531)) return this.GetURL('09d');
        if (intId >= 500 && intId <= 504) return this.GetURL('10d');
        if (intId === 511) return this.GetURL('13d');
        if (intId >= 600 && intId <= 622) return this.GetURL('13d');
        if (intId >= 701 && intId <= 781) return this.GetURL('50d');
        if (intId === 800) return this.GetURL('01d');
        if (intId === 801) return this.GetURL('02d');
        if (intId === 802) return this.GetURL('03d');
        if (intId >= 803 && intId <= 804) return this.GetURL('04d');
        return this.GetURL('01d');
    }

    WeatherView() {
        const { weather } = this.state;
        return (
            <div
                className={cn("d-flex flex-row align-items-center justify-content-center", style.weather)}
            >
                <Row>
                    <Col xs={12}>
                        <img className={style.icon} src={this.GetIcon(weather.id)} />
                        <span className={style.title}>
                            {weather.city}
                        </span>
                        <span className={style.subtitle}>
                            {weather.weather}
                        </span>
                        <CustomButton className={style.edit} onClick={this.onEdit} value="Edit" />
                    </Col>
                </Row >
            </div>

        );
    }


    View() {
        return (this.state.weather) ? this.WeatherView() : this.Placeholder();
    }

    render() {
        return (
            <Card className={style.panel}>
                {(this.state.edit) ? this.Edit() : this.View()}
            </Card>
        );
    }
}

Panel.defaultProps = {
    onDataLoaded: (_) => { },
    weather: null
};

export default Panel;