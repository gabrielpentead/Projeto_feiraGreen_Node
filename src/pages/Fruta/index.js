import React from 'react'; // Importa React
import { Link } from 'react-router-dom'; // Importa Link para navegação
import ProductFactory from '../factory/ProductFactory'; // Importa a classe ProductFactory

function Fruta() {
    // Corrija o nome do método aqui
    const frutas = ProductFactory.createProductByType('fruta');

    return (
        <div>
            <hr />
            <section className="categorias-quantidades">
                <span className="categorias-titulo">Frutas</span>
            </section>
            <hr />
            <main className="row produto-page">
                <div className="col-12">
                    <div className="row">
                        {frutas.map(ProductFactory.renderProduct)}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Fruta;
