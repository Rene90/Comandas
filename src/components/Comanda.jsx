import React, {Component} from 'react'
import Comida from '../comida.json'
import Platillo from './Dish';
import 'bulma/css/bulma.css'
import Forma from './Form'
import Seleccionado from './SelecDish'
var valor = 0
var multiplicacion = 0
var suma = 0
class Comanda extends Component{
    state={
        showForm:false,
        promo: {},
        comida: Comida,
        items:[],
        lista:[]
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
    encambio = (e) =>{
        valor = e.target.value;
        const field = e.target.name;
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
    agregar = function(index){
        const copy = this.state.comida;
        copy[index].quantity = valor
        multiplicacion = copy[index].quantity * copy[index].price
        copy[index].mult = multiplicacion
        suma += copy[index].mult
        this.setState({
            food: copy
        })
        this.state.lista.push(copy[index])
        
        
        valor = 0

    }
    componentWillMount= function(){
        this.setState({items: this.state.comida})
      }
      render(){
        const { items, showForm,lista } = this.state;
       
        return (
        <div>
            <div id="lis">
        <button onClick={this.toggleForm}>{showForm ? "Cancelar" : "Agrega un platillo"}</button>
        <input type="text" onChange={this.buscar} placeholder="Busca algún platillo"/>
        {showForm && <Forma onChange={this.onChange} handleSubmit = {this.handleSubmit}/>}
        {items.map((items,key)=><Platillo key={key} {...items} agregar={() => this.agregar(key)} onChange={this.encambio}/>)}
        </div>
        <div id="lista">
            <h2>Todays foods</h2>
            <ul>
            {lista.map((items,key)=> <Seleccionado key={key} {...items}/>)}
            </ul>
            <h4>Total:{suma}</h4>
        </div>
        </div>
        
        );
    } 

}
export default Comanda
