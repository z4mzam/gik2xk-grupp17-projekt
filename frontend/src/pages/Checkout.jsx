import React, { useState } from 'react';

function Checkout({ cart, setCart, setView }) {
  const [orderDone, setOrderDone] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderDone(true);
    setCart([]); 
  };

  if (orderDone) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Tack för ditt köp!</h2>
        <button onClick={() => setView("home")}>Tillbaka till butiken</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", background: "white", borderRadius: "10px" }}>
      <h2>Kassa</h2>
      <p>Totalt: {total} kr</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Namn" required style={{ padding: "8px" }} />
        <input type="email" placeholder="E-post" required style={{ padding: "8px" }} />
        <button type="submit" style={{ background: "#ff85b3", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
          SLUTFÖR KÖP
        </button>
      </form>
      <button onClick={() => setView("cart")} style={{ marginTop: "10px", background: "none", border: "none", color: "gray", cursor: "pointer" }}>
        Avbryt
      </button>
    </div>
  );
}

export default Checkout;