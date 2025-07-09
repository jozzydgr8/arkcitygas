import { useState } from "react";
import { CategoryLayout } from "../../Category/CategoryLayout";







export const Product = () => {
  const [active, setActive] = useState('All Products');
  return (
    <section id="#product">
      <div className="container-fluid">
        <h2>Our Products</h2>
        <p style={{textAlign:"center"}}>High Quality LPG cylinders and accessories at competitive prices</p>
          <div className='product-category-menu'>
            <h4 onClick={() => setActive('All Products')} className={active === 'All Products' ? 'menu-active' : 'productcategory'}>All Products</h4>
            <h4 onClick={() => setActive('Refills')} className={active === 'Refills' ? 'menu-active' : 'productcategory'}>Refills</h4>
            <h4 onClick={() => setActive('cylinders')} className={active === 'cylinders' ? 'menu-active' : 'productcategory'}>Cylinders</h4>
            <h4 onClick={() => setActive('accessories')} className={active === 'accessories' ? 'menu-active' : 'productcategory'}>Accessories</h4>
          </div>

            <CategoryLayout active={active}/>

       
      </div>
    </section>
  );
};
