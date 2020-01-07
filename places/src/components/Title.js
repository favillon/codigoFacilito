import React from 'react';
import logo from '../logo.svg';

export default class Title extends React.Component {
    render(){
        return(
            <div>
                <h1><img src={logo} className="Title-logo" alt="logo" />Places</h1>
                <p>Descubre Lugares</p>
                <button onClick={()=>{this.impresionFecha()}}>Cuentas</button>
            </div>
        );
    }

    impresionFecha(){
        console.log("impresion consola");
    }
}