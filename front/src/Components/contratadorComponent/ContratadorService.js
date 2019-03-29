import React, { Component } from 'react'

export default class ContratadorService extends Component {
  
    retrieveItems() {
        return fetch('localhost:3000/api/contractor/')
        .then(response => {
          if (!response.ok) {
            this.handleResponseError(response);
          }
          return response.json();
        })
        .then(json => json)
        .catch(error => {
          this.handleError(error);
        });
      }
  
       getItem(idItem) {
          return fetch('http://localhost:3000/api/contractor/'+idItem).then(response => {
            if (!response.ok) {
              this.handleResponseError(response);
            }
            return response.json();
          }).then(json=>{
              console.log('aqui esta el objeto',json)
              return json;
          });
      }  
       createItem(item) {
          console.log("ItemService.createItem():");
          console.log(item);
          return Promise.resolve(item);
      }
  
       deleteItem(itemId) {
          console.log("ItemService.deleteItem():");
          console.log("item ID:" + itemId);
      }
  
       updateItem(item) {
      console.log("ItemService.updateItem():");
       console.log(item);
      }

    
    //Manejadores de errores
    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }
}
