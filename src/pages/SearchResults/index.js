import React from 'react';
import ProductFactory from '../factory/ProductFactory'; // Importa a fábrica de produtos
import { data } from '../../data'; // Importa os dados

function SearchResults() {
  const searchQuery = window.location.pathname.split('/').pop(); // pega parte final do caminho URL assumindo que é o termo de busca

  // Filtra produtos com base no nome, não no tipo
  const filteredData = data.filter((produto) => 
    produto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-carrinho">
      <div className="search-results-container">
        <h1>Resultados de busca para "{searchQuery}"</h1>
        <ul className="search-results-list">
          {filteredData.length > 0 ? (
            filteredData.map((produto) => (
              <li key={produto.id}>
                <div className="col-12">
                  <div className="row">
                    {ProductFactory.renderProduct(produto)} {/* Renderiza o componente do produto */}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum resultado encontrado para "{searchQuery}"</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
