import './styles.css'

function ButtonFoodType(params:any){
    return(
        <button className={`type ${params.isActive ? 'type-active': ''}`} onClick={params.onClick}>
          <div className='content'>
            <div className='icon-salad'>
              <img className='icon-img' src="/02.svg" alt="" />
            </div>
            <h3 className='food-type'>{params.name}</h3>
          </div>
          
        </button>
    )
}

export default ButtonFoodType