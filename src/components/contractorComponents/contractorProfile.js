import React, {Component} from 'react';
import dateFormat from 'dateformat';

class ContractorProfile extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        contractor:{},
        creditcards:[],
        contracts: [] 
    }
    fetch('/api/contractor/'+this.state.idLogged).then(res => res.json()).then(data => { 
          this.setState({
            contractor:data,
            contracts: data.Contracts,
            creditcards: data.CreditCards,

          }); 
      });    
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));       
  }

  render(){
    
    return(
                
        <div className = "container">
            <center><h5>Mi perfil</h5></center>
            <br></br>
            <div className = "container">
            <table>
              <tbody>
                <tr>
                  <td><b>Nombre</b></td>
                  <td>{this.state.contractor.contractor_name}</td>            
                </tr>
                <tr>
                  <td><b>Login</b></td>
                  <td>{this.state.contractor.contractor_login}</td>                
                </tr>
                <tr>
                  <td><b>Correo electrónico</b></td>
                  <td>{this.state.contractor.contractor_email}</td>                
                </tr>
                <tr>
                  <td><b>Número de contratos</b></td>
                  <td>{this.state.contracts.length}</td>                
                </tr>
              </tbody>
            </table>
            </div>
        </div>        
    )
  }
}

export default ContractorProfile;