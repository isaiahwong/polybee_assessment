import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Weather from './model/Weather';
import Storage from './util/storage'
import Panel from './components/panel';

import style from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.numPanels = parseInt(process.env.REACT_APP_PANELS) ?? 9;
    this.onPersist = this.onPersist.bind(this);
  }

  onPersist(k, weather) {
    Storage.setItem(k, JSON.stringify(weather));
  }

  getWeather(k) {
    try {
      return Weather.fromJSON(JSON.parse(Storage.getItem(k)))
    } catch (e) {
      console.log(e)
    }
    return null;
  }

  Panels() {
    return [...Array(this.numPanels).keys()].map(k =>
      <Col xs={12} sm={6} lg={4} key={k}>
        <Panel
          weather={this.getWeather(k)}
          key={k}
          onDataLoaded={(weather) => this.onPersist(k, weather)}
        />
      </Col>
    );
  }

  render() {
    return (
      <Container className={style.App}>

        <Row>
          {this.Panels()}
        </Row>
      </Container>

    );
  }
}

export default App;
