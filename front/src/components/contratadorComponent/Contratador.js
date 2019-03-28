import React, {Component} from 'react';

class Contratador extends Component{
	constructor(props){
		super(props);
		this.state ={};
	}

	render: function() {
		return (
			<div>
			</div>	
		);
	}

	async retrieveItems() {
      return Promise.resolve(this.items);
	}

	async getItem(itemLink) {
	    for(var i = 0; i < this.items.length; i++) {
	      if ( this.items[i].link === itemLink) {
	        return Promise.resolve(this.items[i]);
	      }
	    }
	    return null;
	}

	async createItem(item) {
	    console.log("ItemService.createItem():");
	    console.log(item);
	    return Promise.resolve(item);
	}

	async deleteItem(itemId) {
	    console.log("ItemService.deleteItem():");
	    console.log("item ID:" + itemId);
	}

	async updateItem(item) {
	    console.log("ItemService.updateItem():");
	 console.log(item);
	}
}
export default Contratador;