import { Link } from 'react-router-dom';

function ProductList({ products }) {
    return (
        <main className="row produto-page">
            <div className="col-12">
                <div className="row">
                    {products.map((product) => (
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
                    ))}
                </div>
            </div>
        </main>
    );
}

export default ProductList;
