import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import { fetchProducts } from "./api/productApi";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Fetch misslyckades:", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setNotification(`${product.name} har lagts till!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfbfb' }}>
      <h1 
        onClick={() => setView("home")} 
        style={{ textAlign: 'center', fontSize: '3rem', color: '#ff85b3', padding: '20px', cursor: 'pointer', margin: 0 }}
      >
        Red Bull Shop
      </h1>
      
      <Navbar cartCount={cart.length} setView={setView} />

      <main>
        {view === "home" && (
          <Home 
            products={products} 
            addToCart={addToCart} 
            setSelectedProduct={setSelectedProduct} 
            setView={setView} 
          />
        )}

        {view === "admin" && (
          <Admin 
            products={products} 
            setProducts={setProducts} 
            setView={setView} 
          />
        )}

        {view === "detail" && (
          <ProductDetail 
            product={selectedProduct} 
            addToCart={addToCart} 
            setView={setView} 
          />
        )}

        {view === "cart" && (
          <Cart 
            cart={cart} 
            removeFromCart={removeFromCart} 
            setView={setView} 
          />
        )}

        {view === "checkout" && (
          <Checkout 
            cart={cart} 
            setCart={setCart} 
            setView={setView} 
          />
        )}
      </main>

      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;