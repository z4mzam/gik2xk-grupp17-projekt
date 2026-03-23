import React, { useState, useEffect } from 'react';

function ProductDetail({ product, addToCart, setView }) {
  const [allRatings, setAllRatings] = useState([]);

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:3001/api/ratings/${product.id}`)
        .then(res => res.json())
        .then(data => setAllRatings(data))
        .catch(err => console.error("Fel vid hämtning av betyg:", err));
    }
  }, [product]);

  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Välj en produkt för att se detaljer.</div>;

  const average = allRatings.length > 0 
    ? (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1)
    : "Inga betyg"; 

  const submitRating = (val) => {
    fetch("http://localhost:3001/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: val, productId: product.id })
    })
    .then(res => res.json())
    .then(newR => {
      setAllRatings([...allRatings, newR]);
      alert(`Du gav produkten ${val} i betyg!`);
    });
  };

  return (
    <div style={{ padding: "60px 20px", display: "flex", justifyContent: "center", animation: "fadeIn 0.5s ease" }}>
      <div style={{ 
          background: "white", padding: "40px", borderRadius: "30px", 
          maxWidth: "900px", display: "flex", flexWrap: "wrap", gap: "50px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)", alignItems: "center"
      }}>
        
        <div style={{ flex: "1", textAlign: "center", minWidth: "280px" }}>
            {/* Ändrad bildkälla för att hämta från backend */}
            <img 
              src={`http://localhost:3001/images/${product.image}`} 
              style={{ width: "100%", maxWidth: "300px", height: "auto" }} 
              alt={product.name} 
            />
        </div>

        <div style={{ flex: "1.2", minWidth: "300px" }}>
          
          <h2 style={{ fontSize: "3rem", margin: "0 0 10px 0", color: "#ff85b3" }}>
            {product.name}
          </h2>
          
          <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "15px", marginBottom: "25px", borderLeft: "5px solid #ff85b3" }}>
            <h4 style={{ margin: "0 0 8px 0", textTransform: "uppercase", fontSize: "12px", color: "#888", letterSpacing: "1px" }}>
                Information & Smak
            </h4>
            <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: "1.6", color: "#444" }}>
                {product.description}
            </p>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <span style={{ fontSize: "1.1rem" }}>Betyg: <strong>⭐ {average} / 5</strong></span>
            <span style={{ fontSize: "1.1rem" }}>Status: <strong>I lager</strong></span>
          </div>

          <div style={{ marginBottom: "25px", padding: "10px", borderRadius: "10px", border: "1px solid #eee" }}>
            <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#666" }}>Klicka för att betygsätta:</p>
            <div style={{ display: "flex", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map(num => (
                <button 
                  key={num} 
                  onClick={() => submitRating(num)} 
                  style={{ padding: "8px 12px", background: "#fdfbfb", color: "#ff85b3", border: "1px solid #ff85b3", borderRadius: "8px", cursor: "pointer" }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <h3 style={{ fontSize: "2.2rem", marginBottom: "30px", color: "#333" }}>{product.price} kr</h3>
          
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button onClick={() => addToCart(product)} style={{ flex: 2, padding: "18px", fontSize: "1.1rem", minWidth: "180px", background: "#ff85b3", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                Lägg i varukorg
            </button>
            <button onClick={() => setView("home")} style={{ flex: 1, background: "#f0f0f0", color: "#333", border: "none", borderRadius: "10px", cursor: "pointer", minWidth: "120px" }}>
                Gå tillbaka
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;