import React, {Component} from 'react';
import ContratadorService from './ContratadorService'
import ContratadorDetail from './ContratadorDetail'

class Contratador extends Component{
	constructor(props){
		super(props);
		this.state ={
			info:{},
			showOferta:false,
			showInfo:true
		};
		this.get = this.get.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.contratadorService = new ContratadorService();

	}
	componentDidMount() {
		this.get();
	}

	render() {
		return (
			<div className="row">	
				<div className="col s3 blue-grey center-align">
					<div className="card-panel blue-grey lighten-3"><h4 className="">{this.state.info.contractor_name}</h4></div>
					
					<ul className="collection left-align">
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons  circle">info</i>
								<a href="#"><span className="title">Información</span></a>
							</li>
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons  circle">folder</i>
								<a href="#"><span className="title">Tarjeta de crédito</span></a>
							</li>
							<li className="collection-item avatar valign-wrapper">
								<i className="material-icons circle">assignment</i>
								<a href="#" className="title">Ofertas publicadas</a>
							</li>						
					</ul>
				</div>	

				<div className="col s9  teal lighten-1 left-align">
					<div className="card-panel" >
						{this.state.showInfo && <ContratadorDetail detailContratador={this.state.info}/>}
					</div>
				</div>		
			</div>	
		);
	}

	get(){
		return this.contratadorService.getItem(9).then(data=>{
			this.setState({info:data})
		});
	}
	
	onCancel(){
		this.clearState();
	}

	clearState() {
		this.setState({
			showOferta:false,
			showInfo:true
		});
	}
}
export default Contratador;