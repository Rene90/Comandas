import React, { Component } from 'react';
import './App.css';
import Comida from './comida.json'
import Platillo from './components/Dish';
import 'bulma/css/bulma.css'
import Forma from './components/Form'
import Seleccionado from './components/SelecDish'
var valor = 0
var multiplicacion = 0
var suma = 0

class App extends Component {
  state={
    showForm:false,
    promo: {},
    comida: Comida,
    items:[],
    comanda:[],
    total:0
}
toggleForm = () =>{
    let {showForm} = this.state;
    showForm = !showForm //invierte valor de showForm para mostrar y ocultar formulario
    this.setState({
    showForm
    })
    
}
onChange = e=>{
    const value = e.target.value;
    const field = e.target.name;
    const { promo } = this.state;
    promo[field] = value;
    this.setState({
        promo
    });
}

handleSubmit = e=>{
    e.preventDefault()
    let {comida, promo} = this.state;
    comida.push(promo)
    this.setState({
        comida
    })
    this.toggleForm()
}
buscar = e =>{//barra de busqueda de platillos
    
    const searc = e.target.value;
    
    var updatedList = this.state.comida;
    updatedList = updatedList.filter(function(item){
    return item.name.toLowerCase().search(
    searc.toLowerCase()) !== -1;
});
this.setState({items: updatedList});

}
agregar = (name,price,quantity,index)=>{
    
    let lista = this.state.comanda;
    let total = this.state.total;
   
    
    const copy = this.state.comida;
    
    //buscamos en la lista de la comanda el platillo seleccionado
    const plat = lista.find(element => element.name === name );
    if(plat) lista.splice(lista.indexOf(plat),1);
    
    copy[index].quantity = quantity
    let multiplicacion = quantity * price
    copy[index].price = multiplicacion
    lista.push(copy[index])
    total = lista.reduce((acc,item)=> acc + item.price,0);

    
    this.setState({
        lista,
        total
    })
    
    
    
    

}
componentWillMount= function(){
    this.setState({items: this.state.comida})
    
  }
  render() {
    const { items, showForm,comanda } = this.state;
    return (
      <div id ="root">
        <div className="container">
        <h1 className="title"> Comandas Common Sense</h1>
        <div className="container">
        <button className="button is-link is-rounded" onClick={this.toggleForm}>{showForm ? "Cancelar" : "Agrega un platillo al menu"}</button>
        
        {showForm && <Forma onChange={this.onChange} handleSubmit = {this.handleSubmit}/>}
        </div>
        <div>
        <input type="text" className="input search-bar" name="search" onChange={this.buscar} placeholder="Busca algún platillo"/>
        </div>
        <div className="columns">
          <div className="column">
          {items.map((items,index)=><Platillo index={index} {...items} agregar={this.agregar}/>)}
          </div>
          <div className="column content">
              <h2 className="subtitle">Comanda</h2>
              <ul>
              {comanda.map((items,key)=> <Seleccionado key={key} {...items}/>)}
              </ul>
              <strong>Total: ${this.state.total}</strong>
          </div>

        </div>
        


        </div>
         
      </div>
     
    );
  }
}

export default App;
