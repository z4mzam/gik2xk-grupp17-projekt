function Navbar({ cartCount, setView }) {

    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px"
        }}
      >
  
        <button onClick={() => setView("cart")}>
          🛒 Kundvagn ({cartCount})
        </button>
        <button onClick={() => setView("admin")}>
        Admin</button>
  
      </nav>
    );
  
  }
  
  export default Navbar;