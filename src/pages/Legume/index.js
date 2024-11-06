import React from 'react'; // Importa React
import { Link } from 'react-router-dom'; // Importa Link para navegação
import ProductFactory from '../factory/ProductFactory'; // Importa a classe ProductFactory

function Legumes() {
    // Corrige o nome do método aqui
    const legumes = ProductFactory.createProductByType('legume'); // Corrigido para 'legume' em vez de 'legumes'

    return (
        <div>
            <hr />
            <section className="categorias-quantidades">
                <span className="categorias-titulo">Legumes</span>
            </section>
            <hr />
            <main className="row produto-page">
                <div className="col-12">
                    <div className="row">
                        {legumes.map(ProductFactory.renderProduct)} {/* Corrigido para 'legumes' */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Legumes;
