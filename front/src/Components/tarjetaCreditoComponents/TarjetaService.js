import React, { Component } from 'react'

export default class TarjetaService extends Component {

    retrieveItems(idContratador) {
        return fetch('http://localhost:3000/api/contractor/'+idContratador +'/offer')
        .then(response => {
          if (!response.ok) {
            this.handleResponseError(response);
          }
          return response.json();
        })
        .then(json => { return json;})
        .catch(error => {
          this.handleError(error);
        });
    }
    
    //Manejadores de errores
    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }
}
