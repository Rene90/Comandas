import React, { Component } from 'react';
import './App.css';
import Comida from './comida.json'
import Platillo from './components/Dish';
import 'bulma/css/bulma.css'
import Forma from './components/Form'
import Seleccionado from './components/SelecDish'


class App extends Component {
  state={
    showForm:false,
    promo: {},
    comida: Comida,
    items:[],
    comanda:[],
    liscomanda:[],
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

handleSubmit = e=>{//agrega platillo nuevo al menu
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
agregar = (name,price,quantity,index)=>{//agregar platillo a la comanda
    
    let lista = this.state.comanda;
    let total = this.state.total;    
    //buscamos en la lista de la comanda el platillo seleccionado
    const plat = lista.find(element => element.name === name );
    if(plat) lista.splice(lista.indexOf(plat),1);   
    let multiplicacion = quantity * price   
    const s = {
      name,
      price: multiplicacion ,
      quantity
    };
    lista.push(s)
    total = lista.reduce((acc,item)=> acc + item.price,0);    
    this.setState({
        lista,
        total
    })
  }
agrecom = () =>{
  let{liscomanda, comanda, total} = this.state;
  liscomanda.push(comanda)
  comanda = []
  total = 0
  this.setState({
      liscomanda,
      comanda,
      total
  })
}
delete = name =>{
  
  let{comanda, total} = this.state
  
  comanda = comanda.filter(el => el.name !== name);
  
  total = comanda.reduce((acc,item)=> acc + item.price,0);
  this.setState({
    comanda,
    total
    
})
}

componentWillMount= function(){
    this.setState({items: this.state.comida})
    
  }
  render() {
    const { items, showForm,comanda, liscomanda } = this.state;
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
              {comanda.map((items,key)=> <Seleccionado key={key} {...items} borrar={this.delete}/>)}
              </ul>
              <strong>Total: ${this.state.total}</strong>
              <div>
              {comanda[0]&&<button className="button is-link is-rounded" onClick={this.agrecom}>Agegar comanda</button>}
              </div>
              
          </div>
          <div className="column content">
            <h2 className="subtitle">Lista de Comandas</h2>
            <ul>
              {liscomanda.map((items, key)=> {
                return(
                  <li>Comanda # {key}</li>
                )
              })}
            </ul>

          </div>

        </div>
        


        </div>
         
      </div>
     
    );
  }
}

export default App;
