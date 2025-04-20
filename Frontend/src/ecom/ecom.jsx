import React, { useState } from "react"
import "./ecom.css"

const Header = ({ cartItems, userPoints }) => (
  <header className="header">
    <div className="container">
    <h1 style={{ marginLeft: 'auto', marginRight: '330px' }}>Sponsors Shop</h1>

      <div className="header-info">
        <div className="cart-info">
          <span className="icon">🛒</span>
          <span>{cartItems.length} items</span>
        </div>
        <div className="points-info">
          <span className="icon">👤</span>
          <span>{userPoints} points</span>
        </div>
      </div>
    </div>
  </header>
)

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
    <h3>{product.name}</h3>
    <p>{product.price ? `Rs. ${product.price.toFixed(2)}` : `${product.points} points`}</p>
    <button onClick={() => addToCart(product)}>{product.price ? "Add to Cart" : "Redeem"}</button>
  </div>
)

const Cart = ({ items, removeFromCart, checkout }) => (
  <div className="cart">
    <h2>Shopping Cart</h2>
    {items.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>{item.price ? `Rs. ${item.price.toFixed(2)}` : `${item.points} points`}</span>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        ))}
        <button onClick={checkout} className="checkout-button">
          Checkout
        </button>
      </>
    )}
  </div>
)

const EcommercePage = () => {
    const [cartItems, setCartItems] = useState([])
    const [userPoints, setUserPoints] = useState(1000)
  
    const products = [
      { id: 1, name: "Eco-friendly Water Bottle", price: 20, image: "https://via.placeholder.com/200" },
      { id: 2, name: "Organic Cotton T-shirt", price: 30, image: "https://via.placeholder.com/200" },
      { id: 3, name: "Bamboo Cutlery Set", price: 15, image: "https://via.placeholder.com/200" },
      { id: 4, name: "Reusable Shopping Bag", price: 10, image: "https://via.placeholder.com/200" },
    ]
  
    const pointsProducts = [
      { id: 5, name: "10% Discount Coupon", points: 100, image: "https://via.placeholder.com/200" },
      { id: 6, name: "Eco-friendly Notebook", points: 200, image: "https://via.placeholder.com/200" },
      { id: 7, name: "Plant a Tree", points: 500, image: "https://via.placeholder.com/200" },
    ]
  
    const addToCart = (product) => {
      if (product.points) {
        if (userPoints >= product.points) {
          setCartItems([...cartItems, product])
          setUserPoints(userPoints - product.points)
        } else {
          alert("Not enough points to redeem this item.")
        }
      } else {
        setCartItems([...cartItems, product])
      }
    }
  
    const removeFromCart = (index) => {
      const newCartItems = [...cartItems]
      const removedItem = newCartItems.splice(index, 1)[0]
      setCartItems(newCartItems)
      if (removedItem.points) {
        setUserPoints(userPoints + removedItem.points)
      }
    }
  
 const checkout = async () => {
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  
  // Make an API request to create an order in your backend
  const response = await fetch('http://localhost:5000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: total * 100, currency: 'INR' }),  // amount is in paise
  });

  const data = await response.json();

  if (!data.order_id) {
    alert('Error creating Razorpay order');
    return;
  }

  // Initialize Razorpay
  const options = {
    key: 'rzp_test_GcZZFDPP0jHtC4',  // Replace with your Razorpay key
    amount: data.amount,  // Amount from backend response
    currency: data.currency,
    name: 'Sponsors Shop',
    description: 'Product Purchase',
    image: 'https://via.placeholder.com/150',  // Add your logo URL
    order_id: data.order_id,
    handler: function (response) {
      // This handler will be called when the payment is successful
      console.log(response);
      alert('Payment Successful');
      setCartItems([]);  // Clear the cart after payment
    },
    prefill: {
      name: 'John Doe',  // Customize the name and email fields
      email: 'johndoe@example.com',
      contact: '1234567890',
    },
    theme: {
      color: '#3399cc',
    },
  };

  // Open the Razorpay checkout
  const razorpayInstance = new window.Razorpay(options);
  razorpayInstance.open();
};

    return (
      <div className="ecommerce-page">
        <Header cartItems={cartItems} userPoints={userPoints} />
        <main className="container">
          <section className="products-section">
            <h2>Products</h2>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </section>
          <section className="points-section">
            <h2>Spend Your Points</h2>
            <div className="product-grid">
              {pointsProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </section>
          <Cart items={cartItems} removeFromCart={removeFromCart} checkout={checkout} />
        </main>
      </div>
    )
  }
  
  export default EcommercePage
  