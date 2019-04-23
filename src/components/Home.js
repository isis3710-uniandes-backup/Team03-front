import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import  { Carousel }  from  'react-materialize';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
  }

  render() {
    return (
      <div className="container">
        <Carousel options={{fullWidth: true,indicators: true}} className="white-text center">
        <div className="black-text">
            <img className="responsive-img" src="https://cdn-images-1.medium.com/max/1200/0*tYrH09HFBgEaDY5C.jpg" alt="imagen ejemplo portafolio 1" />
        </div>
        <div className="black-text">
            <img className="responsive-img" src="https://cdn-images-1.medium.com/max/800/0*iAveHZ1NCnudLTU0.jpg"  alt="imagen ejemplo portafolio 2"/>
        </div>
        <div className="black-text">
            <img className="responsive-img" src="https://i.ytimg.com/vi/WFnJ7_fbdHU/maxresdefault.jpg"  alt="imagen ejemplo portafolio 3"/>
        </div>
        <div className="black-text">
            <img className="responsive-img" src="https://i.pinimg.com/originals/64/bd/cd/64bdcd6320341ae931e7c26d6e809985.jpg"  alt="imagen ejemplo portafolio 4"/>
        </div>
        </Carousel>        
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