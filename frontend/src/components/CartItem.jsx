function CartItem({ item, removeFromCart, index }) {
  return (
    <div className="cart-item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        <img 
          src={`http://localhost:3001/images/${item.image}`} 
          alt={item.name} 
          style={{ width: "50px", height: "auto", borderRadius: "5px" }} 
        />
        
        <div>
          <strong>{item.name}</strong>
          <p style={{ margin: 0 }}>{item.price} kr</p>
        </div>
      </div>

      <button 
        className="cart-remove-button" 
        onClick={() => removeFromCart(index)}
        style={{ padding: "5px 10px", cursor: "pointer" }}
      >
        Ta bort
      </button>
    </div>
  );
}

export default CartItem;