import { data } from '../../data';

class ProductFactory {
    constructor() {
        if (!ProductFactory.instance) {
            ProductFactory.instance = this;
        }
        return ProductFactory.instance;
    }

    createProductByType(type) {
        const validTypes = ['fruta', 'verdura', 'legume', 'hortalica', 'outro'];
        if (!validTypes.includes(type)) {
            return []; // Retorna um array vazio se o tipo não for reconhecido
        }
        return data.filter(product => product.type === type);
    }
}

// Congela a instância para evitar modificações
const instance = new ProductFactory();
Object.freeze(instance);

export default instance;
