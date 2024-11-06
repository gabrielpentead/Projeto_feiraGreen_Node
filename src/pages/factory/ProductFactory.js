import React from 'react'; // Importa React
import { Link } from 'react-router-dom'; // Importa Link para navegação
import { data } from '../../data'; // Importa os dados

class ProductFactory {
    // Método estático para criar produtos com base no tipo
    static createProductByType(type) {
        console.log(data); 

        const validTypes = ['fruta', 'verdura', 'legume', 'hortalica', 'outro'];
        
        if (!validTypes.includes(type)) {
            return []; // Retorna um array vazio se o tipo não for reconhecido
        }

        // Filtra produtos com base no tipo
        return data.filter(product => product.type === type);
    }

    // Método estático para renderizar o componente do produto
    static renderProduct(product) {
        return (
            <div key={product.id} className="produto-container-principal">
                <div className="produto-principal">
                    <Link to={`/paginapd/${product.id}`}>
                        <img src={product.image} alt={product.name} className="img-fluid" />
                    </Link>
                    <span>{product.name}</span>
                    <span>
                        R$ <span className="price">{product.price}</span> <span className="unit">{product.unit}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default ProductFactory;
