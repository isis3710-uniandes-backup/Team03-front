import React, {Component} from 'react';
import { Link } from "react-router-dom";
import logo from './logo.png';
import PortfolioProfile from './components/portfolioComponents/PortfolioProfile'

class PortfolioFromURL extends Component{

  constructor(props){
    super(props);    
    this.state = {
      portfolio: null,
      error: ''
    } 
    const urlPortfolio = this.props.match.params.portfolio;
    console.log(urlPortfolio);
    fetch('/portfolio/'+urlPortfolio).then(res => res.json()).then(data => {   
      if(data.length === 0){
        throw new Error("No hay ningún portfolio registrado con esta URL. Intente con otra.");
      }
      else{
        this.setState({
          portfolio:data[0]
        });  
      }                  
    }).catch(err=>{
      this.setState({
        error: err.message
      });
    });
  }  

  render(){   

    return(
      
      <div>
        <div className="navbar-fixed">          
          <nav>
            <div className="nav-wrapper grey darken-4">
              <div className = "row">
                <div className = "col s12">                
                  <Link to="/" className="brand-logo"> <img className="responsive-img" src={logo} alt="Logo" width="40px" height="40px" /> Minerva's Gallery</Link>            
                </div>
              </div>
            </div>
          </nav>          
        </div> 

        <br></br>
        {
          this.state.portfolio==null?
            <div className="container">
              <center><h1>{this.state.error}</h1></center>              
            </div>
          :
          <PortfolioProfile portfolio = {this.state.portfolio} externo = {true}/>
        }       

      </div>
    )     
  }  
}

export default PortfolioFromURL;
