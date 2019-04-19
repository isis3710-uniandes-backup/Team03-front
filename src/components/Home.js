import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

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
        <div className="carousel carousel-slider">
          <a className="carousel-item" href="#one!"><img className="responsive-img" src="https://cdn-images-1.medium.com/max/1200/0*tYrH09HFBgEaDY5C.jpg" alt="Example1"/></a>
          <a className="carousel-item" href="#two!"><img className="responsive-img" src="https://cdn-images-1.medium.com/max/800/0*iAveHZ1NCnudLTU0.jpg"  alt="Example2"/></a>
          <a className="carousel-item" href="#three!"><img className="responsive-img" src="https://i.ytimg.com/vi/WFnJ7_fbdHU/maxresdefault.jpg"  alt="Example3"/></a>
          <a className="carousel-item" href="#four!"><img className="responsive-img" src="https://i.pinimg.com/originals/64/bd/cd/64bdcd6320341ae931e7c26d6e809985.jpg"  alt="Example4"/></a>
        </div>

        <br></br>

        <div className="container">
          <center>
            <h5>
              <FormattedMessage
                id="Home.Title"
                defaultMessage="What is Minerva's Gallery?"
              />
            </h5>
            <p>
              <FormattedMessage
                id="Home.purpose"
                defaultMessage="We are a page that allows the autoexhibition of artistic and design works, for the presentation of professional portfolios between freelancers and potential work partners."
              />

            </p>
          </center>
        </div>

        <br></br>
      </div >
    )
  }
}

export default Home;