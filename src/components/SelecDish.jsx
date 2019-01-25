import React from 'react'

const Seleccionado = ({name, price,image,quantity,mult,borrar})=>{
    
    
    return(
        <li>
            <p>{quantity},{name}= {price}</p>
            <button className="button is-danger is-rounded" onClick={()=> borrar(name)}>Borrar platillo</button>      
      </li>
      

    )
}

export default Seleccionado;