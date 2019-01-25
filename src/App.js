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
    total:0,
    nombre:"",
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
    if(!quantity) quantity = 0
    let comanda = this.state.comanda;
    let total = this.state.total;    
    //buscamos en la lista de la comanda el platillo seleccionado
    const plat = comanda.find(element => element.name === name );
    if(plat) comanda.splice(comanda.indexOf(plat),1);   
    let multiplicacion = quantity * price   
    const s = {
      name,
      price: multiplicacion ,
      quantity
    };
    comanda.push(s)
    total = comanda.reduce((acc,item)=> acc + item.price,0);    
    this.setState({
        comanda,
        total
    })
  }
agrecom = () =>{//agrega comanda a lista de comandas
  let{liscomanda, comanda, total, nombre} = this.state;
  
  const com = liscomanda.find(element => element.nombre === nombre );
    if(com) liscomanda.splice(liscomanda.indexOf(com),1); 
  let nom= comanda[0]+String(total+ Math.random())
  const s = {
    nombre:nom,
    nombrep: String(total),
    comanda: comanda
  }
  liscomanda.push(s)
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
deletecom = key =>{//borra comanda de lista de comandas
  let{liscomanda} = this.state
  liscomanda.splice(key,1)
  this.setState({
    liscomanda
  })
}
vercom = key =>{//ver comanda
  let{liscomanda, comanda, total, nombre} = this.state
  comanda = liscomanda[key].comanda
  nombre = liscomanda[key].nombre
  total = 0
  total = comanda.reduce((acc,item)=> acc + item.price,0);
  this.setState({
    comanda,
    total,
    nombre
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
        <h1 className="title"> Comandas Common Sense (René Manzano)</h1>
        <div className="container">
        <button className="button is-link is-rounded space" onClick={this.toggleForm}>{showForm ? "Cancelar" : "Agrega un platillo al menu"}</button>
        
        {showForm && <Forma onChange={this.onChange} handleSubmit = {this.handleSubmit}/>}
        </div>
        <div>
        <input type="text" className="input search-bar" name="search" onChange={this.buscar} placeholder="Busca algún platillo"/>
        </div>
        <div className="columns">
          <div className="column">
          {items.map((items,index)=><Platillo key={index} {...items} agregar={this.agregar}/>)}
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
                  <li><p>Comanda # {key} Total: ${items.nombrep}</p>
                      <div>
                        <button className="button is-success is-rounded" onClick={()=> this.vercom(key)}>Ver</button>
                        <button className="button is-danger is-rounded" onClick={()=> this.deletecom(key)}>X</button>
                      </div>
                  </li>
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
