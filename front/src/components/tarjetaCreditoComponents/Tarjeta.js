import React, { Component } from 'react'
import TarjetaService from './TarjetaService'

export default class Tarjeta extends Component {
    constructor(props){
        super(props);

        this.state = {
          data:[]
        };        

        this.tarjetaService = new TarjetaService();

        this.getTarjetas = this.getTarjetas.bind(this);
    }

    componentDidMount(){
        this.getTarjetas();
    }
    render() {
        return (
        <div>
           
        </div>
        )
   }
   getTarjetas(){
        this.tarjetaService.retrieveItems(this.props.detailContratador.id).then(data=>{
            console.log(data)
            this.setState({data:data});
        });
   }
}
