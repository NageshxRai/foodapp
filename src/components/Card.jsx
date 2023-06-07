import React, {useState, useRef, useEffect} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const data = useCart()
  const foodItem = props.foodItem
  const {name, _id, img, options} = foodItem
  const option= options[0];
  const priceOptions = Object.keys(option)
  const [size,setSize] = useState('')
  const [quantity,setQuantity] = useState(1)
  const dispatch =useDispatchCart()
  const handleAddToCart = async ()=>{
    let food = []
    for (const item of data){
      if(item.id ===props.foodItem._id){
        food=item
        break;
      }
    }
    if(food !==[]){
      if(food.size===size){
        await dispatch({type: "UPDATE",id:props.foodItem._id, price:finalPrice, quantity:quantity})
        return
      }
    } else if(food.size !==size){
      await dispatch({type:'ADD', id:_id, name:name, price:finalPrice, quantity:quantity, size:size})
      return
    }
      await dispatch({type:'ADD', id:_id, name:name, price:finalPrice, quantity:quantity, size:size}) 
      return
      console.log(data)                                                                                                 
  }
  const finalPrice = quantity* parseInt(option[size])
  const priceRef = useRef()
  useEffect (()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={img} className="card-img-top" alt="..." style={{height: '200px', objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQuantity(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {
                  priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>
              <div className="d-inline h-100 ms-2 fw-bold">रु{finalPrice}/-</div>
              <hr/>
              <button className="btn btn-danger justify-center ms-2" onClick={handleAddToCart}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
