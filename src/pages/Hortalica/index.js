import React from 'react'; // Importa React
import { Link } from 'react-router-dom'; // Importa Link para navegação
import ProductFactory from '../factory/ProductFactory'; // Importa a classe ProductFactory

function Hortalica() {
    // Corrige o nome do método aqui
    const hortalicas = ProductFactory.createProductByType('hortalica');

    return (
        <div>
            <hr />
            <section className="categorias-quantidades">
                <span className="categorias-titulo">Hortaliças</span>
            </section>
            <hr />
            <main className="row produto-page">
                <div className="col-12">
                    <div className="row">
                        {hortalicas.map(ProductFactory.renderProduct)}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Hortalica;
