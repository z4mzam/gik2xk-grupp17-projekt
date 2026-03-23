function ProductCard({ product, addToCart }) {

    return (
  
      <div className="card">
  
        <img src={product.image} alt={product.name} />
  
        <h2>{product.name}</h2>
  
        <p>{product.description}</p>
  
        <p>{product.price} kr</p>
  
        <p> {product.rating}</p>
  
        <button onClick={() => addToCart(product)}>
          Lägg i kundvagn
        </button>
  
      </div>
  
    );
  
  }
  
  export default ProductCard;
  