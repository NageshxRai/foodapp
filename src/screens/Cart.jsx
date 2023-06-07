import React from 'react'
import {useCart, useDispatchCart} from '../components/ContextReducer'
import trash from './trash.svg'
const Cart = () => {
  const data = useCart()
  const dispatch =useDispatchCart()
    if (data.length ===0){
      return (
        <div>
          <div className='m-5 w-100 text-center fs-3 text-white'>The Cart Is Empty!</div>
        </div>
      )
    }
  let totalPrice = data.reduce((total,food) => total + food.price, 0)
  const handleCheckOut = async ()=>{
    let userEmail = localStorage.getItem("userEmail")
    let response = await fetch('http://localhost:5000/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    });
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  }
  return (
    <div className='text-white'>
      <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
        <table className='table table-hover text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((food,index) =>(
                <tr>
                  <th scope='row'>{index+1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td><button type='button' className='btn p-0'><img style={{filter: "brightness(0%) invert(100%)"}} src={trash} alt="delete_btn" onClick={()=>{dispatch({type: "REMOVE", index:index})}}/></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div>Total Price: {totalPrice}/-</div>
        <div>
          <button className='btn bg-danger mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart