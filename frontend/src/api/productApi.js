const API_URL = "http://localhost:3001/api/products";

export const fetchProducts = async () => {
  try {
    console.log("Försöker hämta produkter från:", API_URL);
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Server-fel: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Lyckades hämta produkter!", data);
    return data;
    
  } catch (err) {
    console.error("Kunde inte hämta data. Är servern igång på port 3001?", err);
    return [];
  }
};