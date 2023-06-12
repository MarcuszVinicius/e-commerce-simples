// Cria a pagina de detalhes do produto
function createResponseDetails(product) {
    return `
    <div class="col-md-7">
    <div class="conteudo-container">
      <p class="ratings">${displayRating(product.rating.rate)}</p>
      <h1 class="title">${product.title}</h1>
      <p class="stock">Estação: ${product.season}</p>
      <ul class="lista-sem-estilo">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <ul class="lista-com-estilo">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <div class="description">
        <div class="price-container">
          <span class="price">R$ 100,00</span>
          <span class="old-price">R$ 120,00</span>
        </div>
      </div>
    </div>
  </div>
  </div>
    `;
  }
  
  
  // Busca os id na url
  function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  // Busca os dados do produto
  async function fetchProducts() {
    try {
      const productId = getProductId();
      const url = `http://diwserver.vps.webdock.cloud:8765/products/${productId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  function displayRating(rate) {
    const roundedRate = Math.round(rate);
    let stars = "";
    for (let i = 0; i < roundedRate; i++) {
      stars += "★";
    }
    for (let j = roundedRate; j < 5; j++) {
      stars += "☆";
    }
    return stars;
  }
  
  async function renderPage() {
    const product = await fetchProducts();
    const productDetails = createResponseDetails(product);
    const productDetailsContainer = document.querySelector('#response-details');
    productDetailsContainer.innerHTML = productDetails;
  }
  
  renderPage();