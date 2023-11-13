
import './styles.css'

function Foodcard(params:any){

    //create function that limits the text size of the description



    const limitText = (text:string, limit:number = 30) => {
        if(text.length > limit){
            return text.substring(0, limit) + '...'
        }else{
            return text
        }
    }

    return(
        <div  className='contend'>
            <div onClick={params.onClick} className='contend-food'>
                <div className='conted-img'>
                    <img className='img-food' src={params.imageUrl} alt="" />
                </div>
                <div className='contend-border'>
                    <div  className='information'>
                        <p className='name-food'>{limitText(params.name, 12)}</p>
                        <p className='food-price'>${params.price}</p>
                    </div>
                    <p title={params.description} className='description'>{limitText(params.description)}</p>
                </div>
            </div>
          
        </div>

       
    )
}

export default Foodcard