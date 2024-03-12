import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Cart } from './Components/Cart/Cart';
import { useState } from 'react';
import { Footer } from './Components/Footer/Footer';

const products = [
  {
    "img":"https://www.course-api.com/images/cart/phone-1.png",
    "price":400,
    'name':'Samsung Galaxy S8',
    'qty':1
  },
  {
    "img":"https://www.course-api.com/images/cart/phone-2.png",
    "price":500,
    'name':'Google Pixel',
    'qty':1
  },
  {
    "img":"https://www.course-api.com/images/cart/phone-3.png",
    "price":700,
    'name':'Xiaomi Redmi Note 2',
    'qty':1
  },
  {
    "img":"https://www.course-api.com/images/cart/phone-4.png",
    "price":600,
    'name':'Samsung Galaxy S7',
    'qty':1
  }
]

function App() {
  const [data,setData]=useState(products);
  const [totalQty,setTotalQty] = useState(() => products.reduce((total, item) => total + item.qty, 0))
  const [totalPrice, setTotalPrice] = useState(() => products.reduce((total, item) => total + (item.qty*item.price), 0))

  const increaseQty = (idx) =>{
    const newData = [...data];
    newData[idx].qty++;
    setTotalQty((prev)=>prev+1);
    setData(newData);
    setTotalPrice((prev)=>prev+newData[idx].price);
  }

  const decreaseQty = (idx) =>{
    const newData = [...data];
    setTotalPrice((prev)=>prev-newData[idx].price);
    setTotalQty((prev)=>prev-1);
    newData[idx].qty === 1 ? newData.splice(idx, 1) : newData[idx].qty--;
    setData(newData);
  }

  const handleRemove = (idx) =>{
    const newData = [...data];
    newData.splice(idx, 1);
    setData(newData);
    setTotalQty(() => newData.reduce((total, item) => total + item.qty, 0))
    setTotalPrice(() => newData.reduce((total, item) => total + (item.qty*item.price), 0));
  } 

  const clearCart = () => {
    setData([]);
    setTotalPrice(0);
    setTotalQty(0);
  }

  return (
    <div className="App">
     <Navbar qty={totalQty}/>
     <section className='cart'>
        <header>
          <h2>your bag</h2>
        </header>
        {data.length === 0 ? (
          <h4 className="empty-cart">Cart is currently empty</h4>
        ) : (
          <>
            {data.map((dta, idx) => (
              <Cart key={idx} data={dta} id={idx} increase={increaseQty} decrease={decreaseQty} remove={handleRemove} />
            ))}
            <Footer totalPrice={totalPrice} clear={clearCart} />
          </>
        )}
     </section>
     
    </div>
  );
}

export default App;
