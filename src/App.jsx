import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import DemoBanner from './components/DemoBanner.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Categories from './pages/Categories.jsx';
import Brand from './pages/Brand.jsx';
import Contacts from './pages/Contacts.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Vai al contenuto
      </a>
      <ScrollToTop />
      <DemoBanner />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categorie" element={<Categories />} />
          <Route path="/prodotto/:id" element={<Product />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/contatti" element={<Contacts />} />
          <Route path="/carrello" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/legale" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}
