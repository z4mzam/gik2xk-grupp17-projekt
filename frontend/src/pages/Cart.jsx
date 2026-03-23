import CartItem from "../components/CartItem";

function Cart({ cart, removeFromCart, setView }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#ff85b3", fontSize: "2rem", marginBottom: "30px" }}>
        Din Kundvagn
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Kundvagnen är tom...</p>
          <button 
            onClick={() => setView("home")}
            style={{ marginTop: "20px" }}
          >
            Gå och hämta en Red Bull!
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                index={index}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* Checkout-sektion med totalpris och kassa-knapp */}
          <div style={{ 
            marginTop: "40px", 
            borderTop: "2px solid #ff85b3", 
            paddingTop: "30px", 
            textAlign: "right" 
          }}>
            <h3 style={{ fontSize: "1.8rem", margin: "0 0 20px 0" }}>
              Total: {total} kr
            </h3>
            
            <button 
              className="checkout-button"
              onClick={() => setView("checkout")}
            >
              GÅ TILL KASSAN
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;