import { useState, useEffect } from 'react';
import { db, storage } from '../../services/firebaseConnection';
import { doc, collection, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const [id, setId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
        const productList = [];
        snapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
      });
      return () => unsubscribe();
    };
    loadProducts();
  }, []);

  const uploadFileToFirebase = async (file) => {
    try {
      const storageRef = ref(storage, `imagespd/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw error;
    }
  };

  const addProduct = async () => {
    if (!imageFile) {
      toast.error('Selecione uma imagem para enviar.');
      return;
    }
    try {
      const imageUrl = await uploadFileToFirebase(imageFile);
      await addDoc(collection(db, 'products'), {
        id: parseInt(id),
        image: imageUrl,
        name,
        price: parseFloat(price),
        unit,
        type,
      });
      toast.success('Produto adicionado com sucesso!');
      setId('');
      setImageFile(null);
      setName('');
      setPrice('');
      setUnit('');
      setType('');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao adicionar o produto. Verifique o console para mais detalhes.');
    }
  };

  const editProduct = async (productId) => {
    try {
      const productToEdit = doc(db, 'products', productId);
      await updateDoc(productToEdit, {
        id: parseInt(id),
        image: await uploadFileToFirebase(imageFile),
        name,
        price: parseFloat(price),
        unit,
        type,
      });
      toast.success('Produto editado com sucesso!');
      setId('');
      setImageFile(null);
      setName('');
      setPrice('');
      setUnit('');
      setType('');
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
      toast.error('Erro ao editar o produto. Tente novamente mais tarde.');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const productToDelete = doc(db, 'products', productId);
      await deleteDoc(productToDelete);
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="container">
    <div className="container">

      <form>
        <h1>Gestão de produtos</h1>
        <h2>Novo produto</h2>
        <label>ID:</label>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <label>Nome do produto:</label>
        <input
          type="text"
          placeholder="produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Valor:</label>
        <input
          type="number"
          placeholder="valor"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="unit">Unidade:</label>
        <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="">Selecione a unidade</option>
          <option value="Kg">Kg</option>
          <option value="Unidade">Unidade</option>
          
          
        </select>

        <label htmlFor="type">Tipo:</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Selecione o tipo</option>
          <option value="fruta">fruta</option>
          <option value="verdura">verdura</option>
          <option value="hrtalica">hrtalica</option>
          <option value="legumes">legumes</option>
          <option value="outros">outros</option>
        </select>
        
        <button type="button" onClick={addProduct}>
          Adicionar produto
        </button>
      </form>
    </div>
    <div>
      <div className='container'>
      <h2>Produtos cadastrados</h2>
      </div>
      <div className='container'>
      <div className="col-12">
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="produto-container-prisncipal">
                <div className="produto-prisncipal">
                  <Link to={`/paginapd/${product.id}`} >
                    <img src={product.image} alt={product.name} className="img-fluid" />
                  </Link>
                  <span>{product.name}</span>
                  <span>
                    R$ <span className="price">{product.price}</span> <span className="unit">{product.unit}</span>
                  </span>
                  <button type="button" onClick={editProduct}>
                    editar
                  </button>
                  <button type="button" onClick={deleteProduct}>
                    exclir
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default ProductManagement;