import { useState } from 'react';
import { data } from '../../data';
import BannerCarousel from './BannerCarousel';
import PromocaoHeader from './PromocaoHeader';
import ProductList from './ProductList';
import './Home.css';

function Home() {
  const promocao = data.filter((product) => product.type === 'fruta');
  const [index, setIndex] = useState(0);
  
  const handleSearch = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid">
      <BannerCarousel activeIndex={index} onSelect={handleSearch} />
      <hr />
      <PromocaoHeader />
      <hr />
      <ProductList products={promocao} />
    </div>
  );
}

export default Home;
