import React, { useState } from 'react';

function Home({ products, addToCart, setSelectedProduct, setView }) {
    const [searchTerm, setSearchTerm] = useState("");

    if (!products) return <div style={{ textAlign: 'center', padding: '50px' }}>Laddar...</div>;

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <input 
                type="text" 
                placeholder="Sök produkt..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                    padding: "15px 25px", width: "90%", maxWidth: "500px", 
                    borderRadius: "30px", border: "2px solid #ff85b3", 
                    fontSize: "16px", outline: "none", boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                }}
            />
        </div>

        <div className="row">
            {filteredProducts.map((product) => (
                <div key={product.id} className="thumbnail">
                    <div className="card">
                        <div onClick={() => { setSelectedProduct(product); setView("detail"); }} style={{ cursor: 'pointer' }}>
                            {/* FIXAD RAD: Hämtar nu från backend/public via /images route */}
                            <img 
                                src={`http://localhost:3001/images/${product.image}`} 
                                alt={product.name} 
                            />
                            <h3 style={{ margin: '15px 0', color: '#ff85b3' }}>{product.name}</h3>
                        </div>
                        
                        <p style={{ fontWeight: "800", fontSize: "1.4rem", margin: "10px 0" }}>{product.price} kr</p>
                        
                        <button onClick={() => addToCart(product)} style={{ width: '100%', marginBottom: '10px' }}>
                            Lägg i varukorg
                        </button>
                        
                        <span 
                            onClick={() => { setSelectedProduct(product); setView("detail"); }}
                            style={{ fontSize: '12px', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Visa produktdetaljer
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
}

export default Home;