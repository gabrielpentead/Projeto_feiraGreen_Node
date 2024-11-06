import React from 'react';
import { Link } from 'react-router-dom';
import ProductFactory from '../factory/ProductFactory'; // Importa a classe ProductFactory

function Outro() {
    const outros = ProductFactory.createProductByType('outro'); // Substitua com o tipo correto

    return (
        <div>
            <hr />
            <section className="categorias-quantidades">
                <span className="categorias-titulo">Outros</span>
            </section>
            <hr />
            <main className="row produto-page">
                <div className="col-12">
                    <div className="row">
                        {outros.map(ProductFactory.renderProduct)}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Outro;


