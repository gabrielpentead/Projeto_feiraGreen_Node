import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { data } from '../../data';
import { Link, useParams } from 'react-router-dom';

function Paginapd() {
  const { id } = useParams(); 
  const productId = parseInt(id);  
  const produto = data.find(product => product.id === productId); // encontra o produto específico no data que corresponde ao productId
  const relatedProducts = data.filter(product => product.type === produto.type && product.id !== productId); // filtra os produtos relacionados ao produto acessado

  const [index, setIndex] = useState(0); 

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }; // atualiza o estado index quando o índice do carrossel muda.

  const addToCart = (product) => {
    // Obter o carrinho existente do cookie
    const existingCart = getCartFromCookies();
    
    // Adicionar o novo produto ao carrinho
    existingCart.push(product);
    
    // Atualizar o cookie do carrinho
    document.cookie = `cart=${JSON.stringify(existingCart)}; path=/; max-age=3600`; // O cookie expira em 1 hora
    alert(`${product.name} foi adicionado ao carrinho!`);
  };

  const getCartFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const cartCookie = cookies.find(row => row.startsWith('cart='));
    return cartCookie ? JSON.parse(cartCookie.split('=')[1]) : [];
  };

  if (!produto) {
    return <div>Produto não encontrado.</div>; // Mensagem de erro se o produto não for encontrado
  }

  return (
    <div>
      <div className="item-container">
        <div className="item-box">
          <div className="image-box">
            <img src={produto.image} alt={produto.name} />
          </div>
          <div className="text-container">
            <div className="category">{produto.type}</div>
            <div className="name">{produto.name}</div>
            <div className="price-porduto">R$ {produto.price} Unidade</div>
            <hr />
            <div className="button-container">
              <button className="buy-button">Comprar</button>
              <button className="add-button" onClick={() => addToCart(produto)}>Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="produto-page-product">
        <div className="oucompre">
          <h3>Ou Compre Outros</h3>
        </div>
      </div>
      <section id="home" className="d-flex">
        <div className="container align-self-center">
          <div className="row-product">
            <div className="col-md-12 banner-container">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((product, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="d-flex justify-content-around">
                        <div className="produto-product">
                          <Link to={`/paginapd/${product.id}`}> 
                            <img src={product.image} alt={product.name} className="img-fluid" />
                          </Link>
                          <span>{product.name}</span>
                          <span>
                            R$ <span className="price">{product.price}</span> <span className="unit">{product.unit}</span>
                          </span>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <div className="d-flex justify-content-center">
                      <span>Não há produtos relacionados disponíveis.</span>
                    </div>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Paginapd;