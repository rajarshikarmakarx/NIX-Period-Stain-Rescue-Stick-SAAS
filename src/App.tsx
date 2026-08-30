import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { DemoResetButton } from './components/common/DemoResetButton';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { RewardsPage } from './pages/RewardsPage';
import { EmergencyKitPage } from './pages/EmergencyKitPage';
import { NotesPage } from './pages/NotesPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders/:id" element={<OrderTrackingPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/emergency-kit" element={<EmergencyKitPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
          <DemoResetButton />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
