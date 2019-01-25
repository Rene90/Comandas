import React from 'react'

let quantity 
function onChange(e) {
  quantity = e.target.value;
}

const Platillo = ({name,price,image, agregar,index})=>{
    
    
    return(
        <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} alt="imagen"/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong> <br />
                <small>${price}</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number" 
                  onChange={onChange}
                  name="quantity"
                  placeholder="0"
                  min="0"
                  
                />
              </div>
              <div className="control">
                <button onClick={() => {
                  agregar(name,price,quantity,index)
                  quantity = 0
                
                }} on className="button is-info">
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

    )
}

export default Platillo;