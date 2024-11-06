import React from 'react';
import ProductFactory from '../factory/ProductFactory';
import ProductList from '../Home/ProductList';

function Fruta() {
    const frutas = ProductFactory.createProductByType('fruta');
    return (
        <div>
            <hr />
            <section className="categorias-quantidades">
                <span className="categorias-titulo">Frutas</span>
            </section>
            <hr />
            <ProductList products={frutas} />
        </div>
    );
}

export default Fruta;
