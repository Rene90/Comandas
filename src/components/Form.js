import React from 'react'
const Forma = ({ onChange, handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>
        <input  onChange={onChange} type="text" placeholder="name" name="name"/>
        <input  onChange={onChange} type="number" placeholder="price" name = "price"/>
        <input onChange={onChange} type="text" placeholder="image" name="image"/>
        <input  onChange={onChange} value = "0" type = "number" placeholder="quantity" name="quantity"/>
        <input type="submit"/>
        </form>
    )
}

export default Forma;