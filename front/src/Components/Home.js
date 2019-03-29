import React, { Component } from 'react';
import {Carousel} from 'react-materialize';

class Home extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
  }

  render() {
    return (
      <div>
        <Carousel options={{fullWidth: true,indicators: true}} images={[
          'https://cdn-images-1.medium.com/max/1200/0*tYrH09HFBgEaDY5C.jpg',
          'https://cdn-images-1.medium.com/max/800/0*iAveHZ1NCnudLTU0.jpg',
          'https://i.ytimg.com/vi/WFnJ7_fbdHU/maxresdefault.jpg',
          'https://i.pinimg.com/originals/64/bd/cd/64bdcd6320341ae931e7c26d6e809985.jpg']} />

        <br></br>

        <div className="container">
          <center>
            <h5>¿Qué es Minerva's Gallery?</h5>
            <p>Somos una página que permite la exposicion de trabajos artisticos y de diseño, para la presentacion de portafolios profesionales. 
                </p>
          </center>
        </div>

        <br></br>

      </div>
    )
  }
}

export default Home;