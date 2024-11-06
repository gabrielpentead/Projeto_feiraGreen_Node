import React from 'react';
import { data } from '../../data'; // Importa os dados
import ProductList from '../Home/ProductList'; // Importa a lista de produtos

function SearchResults() {
  const searchQuery = window.location.pathname.split('/').pop(); // pega parte final do caminho URL assumindo que é o termo de busca

  // Filtra produtos com base no nome
  const filteredData = data.filter((produto) => 
    produto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-carrinho">
      <div className="search-results-container">
        <h1>Resultados de busca para "{searchQuery}"</h1>
        {filteredData.length > 0 ? (
          <ProductList products={filteredData} /> // Usa ProductList para renderizar os produtos
        ) : (
          <p>Nenhum resultado encontrado para "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
