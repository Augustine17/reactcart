import React from 'react'
import './Footer.css'

export const Footer = ({totalPrice,clear}) => {
  return (
    <footer>
        <hr />
        <div>
            <h5 class="cart-total">total <span>${totalPrice}</span></h5>
        </div>
        <button class="btn btn-hipster" onClick={clear}>clear cart</button>
    </footer>
  )
}
