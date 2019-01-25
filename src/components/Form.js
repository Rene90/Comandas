import React from 'react'
const Forma = ({ onChange, handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>
        <div className="field">
            <label className="input">Nombre</label>
            <div className="control">
                <input className="input" onChange={onChange} type="text" placeholder="Nombre" name="name"/>
            </div>
            <label className="input">Precio</label>
            <div className="control">
                <input className="input" onChange={onChange} type="number" placeholder="Precio" name="price"/>
            </div>
            <label className="input">Imágen</label>
            <div className="control">
                <input className="input" onChange={onChange} type="text" placeholder="Imágen url" name="image"/>
            </div>
            <label className="input">Cantidad</label>
            <div className="control">
                <input className="input" onChange={onChange} type="number" value="0" placeholder="Cantidad" name="quantity"/>
            </div>
            
            <div className="control">
                <button class="button is-link space" type="submit">Submit</button>
            </div>

        </div>
        
        
        </form>
    )
}

export default Forma;