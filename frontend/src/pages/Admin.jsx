import { useState } from "react";

function Admin({ products, setProducts, setView }) {
  // States för inloggning
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // States för produkt-formuläret
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [editId, setEditId] = useState(null);

  const correctPassword = "zamzam123"; // <--- HÄR ÄR DITT LÖSENORD

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Fel lösenord! Försök igen.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, price: Number(price), description: desc, image: img };

    if (editId) {
      // UPPDATERA (PUT)
      fetch(`http://localhost:3001/api/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
      .then(() => {
        setProducts(products.map(p => p.id === editId ? { ...p, ...productData } : p));
        resetForm();
      });
    } else {
      // SKAPA (POST)
      fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
      .then(res => res.json())
      .then(addedProd => {
        setProducts([...products, addedProd]);
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName(""); setPrice(""); setDesc(""); setImg("");
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setDesc(p.description);
    setImg(p.image);
    window.scrollTo(0,0);
  };

  const handleDelete = (id) => {
    if (window.confirm("Radera produkt?")) {
      fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" })
        .then(() => setProducts(products.filter(p => p.id !== id)));
    }
  };

  // Om användaren INTE är inloggad, visa inloggningsskärmen
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2 style={{ color: "#ff85b3" }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: "inline-block", padding: "20px", background: "white", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
          <input 
            type="password" 
            placeholder="Lösenord" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "10px", display: "block", width: "100%" }}
          />
          <button type="submit" style={{ width: "100%" }}>Logga in</button>
        </form>
        <br />
        <button onClick={() => setView("home")} style={{ marginTop: "20px", background: "none", color: "#888", textDecoration: "underline" }}>Tillbaka</button>
      </div>
    );
  }

  // Om användaren ÄR inloggad, visa admin-panelen
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ color: "#ff85b3" }}>Hantera Produkter</h2>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: "#eee", color: "#333" }}>Logga ut</button>
      </div>

      <form onSubmit={handleSubmit} style={{ background: "white", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
        <h3>{editId ? "Redigera" : "Lägg till ny"}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input placeholder="Namn" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Pris" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          <input placeholder="Beskrivning" value={desc} onChange={e => setDesc(e.target.value)} required />
          <input placeholder="Bild-fil (t.ex original.png)" value={img} onChange={e => setImg(e.target.value)} required />
          <button type="submit">{editId ? "Uppdatera" : "Spara"}</button>
          {editId && <button type="button" onClick={resetForm} style={{ background: "#ccc" }}>Avbryt</button>}
        </div>
      </form>

      {products.map(p => (
        <div key={p.id} style={{ display: "flex", justifyContent: "space-between", background: "white", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>
          <span>{p.name}</span>
          <div>
            <button onClick={() => startEdit(p)} style={{ background: "#2196F3", marginRight: "5px" }}>Ändra</button>
            <button onClick={() => handleDelete(p.id)} style={{ background: "#ff4d4d" }}>Ta bort</button>
          </div>
        </div>
      ))}
      
      <button onClick={() => setView("home")} style={{ marginTop: "20px", width: "100%" }}>Gå till Butiken</button>
    </div>
  );
}

export default Admin;