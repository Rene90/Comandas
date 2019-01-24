import React from 'react'

const Seleccionado = ({name, price,image,quantity,mult})=>{
    
    
    return(
        <li>
        {quantity},{name}= {mult}
        
      </li>

    )
}

export default Seleccionado;