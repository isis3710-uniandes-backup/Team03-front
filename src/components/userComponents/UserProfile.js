import React, { Component } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import * as d3 from 'd3';


const margin = {top: 40, right: 150, bottom: 60, left: 30},
    width = 420*1.5 - margin.left - margin.right,
    height = 300*1.5 - margin.top - margin.bottom;
const pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
    (d3.hierarchy({children: data})
    .sum(d => d.value));

    const color = data=> d3.scaleOrdinal(data.map(d => d.name), d3.schemeCategory10);


class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idLogged: this.props.idLogged,
      user: {},
      portfolios: [],
      services: [],
      dataV:[]
    }
    fetch('http://localhost:8082/api/user/' + this.state.idLogged, {
      method: 'GET',
      headers: { 'token': this.props.token }
    }).then(res => res.json()).then(data => {
      data.user_birthdate=data.user_birthdate.split('T')[0];
      if (data.Portfolios == null) {
        this.setState({
          user: data
        });
      }
      else {
     
        this.setState({
          user: data,
          portfolios: data.Portfolios          
        });
      }
    });
    this.getDataVisualization = this.getDataVisualization.bind(this);
    this.printData = this.printData.bind(this);
  }

  componentDidMount() {
    document.dispatchEvent(new Event('component'));
    this.getDataVisualization();
  }

  getDataVisualization(){
    fetch('http://localhost:8082/api/portfolio/' + this.state.idLogged+"/user", {
      method: 'GET',
      headers: { 'token': this.props.token }
    })
    .then(res => res.json()).then(data=>{
      //var infoEntradasPorPort=[];
      var dataForV=data.map((d,i)=>{ return {id:i,name:d.portfolio_name,value: Math.random()*10 };});
      //data.forEach(d=>fetch('http://localhost:8082/api/portfolio/'+d.id).then(s=>s.json()).then(port=>{var nuevaInfo={name:port.portfolio_name, value:port.Entries.length};infoEntradasPorPort.push(nuevaInfo) ;  }));
      this.setState({dataV:dataForV});
    });
  }
  
  printData(){   

    const root = pack(this.state.dataV);
    const pintura = color(this.state.dataV);
   return root.leaves().map((e,i)=>{
     return <g transform={`translate(${e.x + 1},${e.y + 1})`  } key={i}>
        <circle id={e.data.id} r={e.r} fillOpacity={0.7} fill={pintura(e.data.name)}></circle>
        <text><tspan  x={`-${2.5}em`} y={`${0.5}em`}>{e.data.name}</tspan></text>
      </g>
    });
    
  }


  render() {
    return (

      <div className="container">
        <center><h5><FormattedMessage id="Profile.Title" defaultMessage="My Profile"/></h5></center>
        <br></br>
        <div className="row">
        <div className="col s8">
          <table>
            <tbody>
              <tr>
                <td><b><FormattedMessage  id="Profile.NameLabels" defaultMessage="Names" /> </b></td>
                <td>{this.state.user.user_names}</td>
              </tr>
              <tr>
                <td> <b><FormattedMessage  id="Profile.LastNameLabels"  defaultMessage="Last Names"/></b></td>
                <td>{this.state.user.user_lastnames}</td>
              </tr>
              <tr>
                <td>  <b><FormattedMessage id="Profile.EmailLabel"  defaultMessage="Email"  /> </b></td>
                <td>{this.state.user.user_email}</td>
              </tr>
              <tr>
                <td> <b><FormattedMessage  id="Profile.PortfolioNumberLabel" defaultMessage="# of Portfolios"/></b> </td>
                <td>{this.state.portfolios.length}</td>
              </tr>
              <tr>
                <td>
                  <b><FormattedMessage  id="Profile.BirthdateLabel" defaultMessage="Birthdate" /></b></td>
                <td><FormattedDate value={new Date(this.state.user.user_birthdate)} year='numeric'	month='long' day='numeric'/> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col s4">
        <p className="flow-text">Principales Proyectos</p>
          <svg width={ width + margin.left + margin.right} height={height + margin.top + margin.bottom} id="svgc">
          {this.state.dataV.length!==0&&this.printData()}        
          </svg>
        </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;