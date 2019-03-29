import React, {Component} from 'react';
import ContratadorService from './ContratadorService'
import ContratadorDetail from './ContratadorDetail'
import Oferta from '../ofertaComponents/Oferta'
import TarjetaCredito from '../tarjetaCreditoComponents/Tarjeta'

class Contratador extends Component{
	constructor(props){
		super(props);
		this.state ={
			info:{},
			showOferta:false,
			showInfo:true,
			showCredit:false
		};
		this.get = this.get.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.toOfertas = this.toOfertas.bind(this);

		this.contratadorService = new ContratadorService();

	}
	componentDidMount() {
		this.get();
	}

	render() {
		return (
			<div className="row">	
				<div className="col s3 blue-grey center-align">
					<div className="card-panel blue-grey lighten-3">
					<i className="material-icons large circle">perm_identity</i>
					<h5 className="">{this.state.info.contractor_name}</h5>
					</div>
					
					<ul className="collection left-align">
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons  circle">info</i>
								<a href="#" onClick={()=>this.onCancel()}><span className="title">Información</span></a>
							</li>
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons  circle">folder</i>
								<a href="#" onClick={()=>this.toTarjetas()}><span className="title">Tarjeta de crédito</span></a>
							</li>
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons circle">assignment</i>
								<a href="#" className="title" onClick={()=>this.toOfertas()}>Ofertas publicadas</a>
							</li>						
					</ul>
				</div>	

				<div className="col s9  teal lighten-1 left-align">
					<div className="card-panel" >
						{this.state.showInfo && <ContratadorDetail detailContratador={this.state.info}/>}
						{this.state.showOferta && <Oferta detailContratador={this.state.info}/>}
						{this.state.showCredit && <TarjetaCredito detailContratador={this.state.info}/>}
					</div>
				</div>		
			</div>	
		);
	}

	get(){
		return this.contratadorService.getItem(9).then(data=>{
			this.setState({info:data, showInfo:true})
		});
	}

	toOfertas(){
		this.clearState();
		this.setState({showOferta:true});
	}

	toTarjetas(){
		this.clearState();
		this.setState({showCredit:true});
	}
	
	onCancel(){
		this.clearState();
		this.get();
	}




	clearState() {
		this.setState({
			showOferta:false,
			showInfo:false,
			showCredit:false
		});
	}
}
export default Contratador;