import React from 'react'

const Seleccionado = ({name, price,image,quantity,mult})=>{
    
    
    return(
        <li>
        {quantity},{name}= {price}
        
      </li>

    )
}

export default Seleccionado;