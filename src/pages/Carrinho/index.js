import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Carrinho() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartFromCookies();
  }, []);

  const loadCartFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const cartCookie = cookies.find(row => row.startsWith('cart='));
    const cart = cartCookie ? JSON.parse(cartCookie.split('=')[1]) : [];
    setCartItems(cart);
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    document.cookie = `cart=${JSON.stringify(updatedCart)}; path=/; max-age=3600`; // Atualiza o cookie
  };

  const checkout = () => {
    // Lógica para finalizar a compra
    alert('Finalizando a compra...');
    // Aqui você pode redirecionar para uma página de checkout ou processar a compra
  };

  return (
    <div className="container-carrinho">
      <div className="box-carrinho">
        {cartItems.length === 0 ? (
          <div>
            <img src="imagens/carrinho-carrinho.png" alt="Carrinho" width="150" />
            <div className="name-carrinho">Seu Carrinho de Compras está Vazio.</div>
            <div className="texto-estra-carrinho">
              Volte às compras e adicione ao seu carrinho.
            </div>
            <Link to="/">Produtos</Link>
            <hr />
          </div>
        ) : (
          <>
            <h2>Seu Carrinho de Compras</h2>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} width="220" />
                  <span>{item.name}</span>
                  <span>R$ {item.price}</span>
                  <button onClick={() => removeItemFromCart(item.id)}>Remover</button>
                </li>
              ))}
            </ul>
            <button onClick={checkout}>Finalizar Compra</button>
            <hr />
          </>
        )}
      </div>
    </div>
  );
}

export default Carrinho;