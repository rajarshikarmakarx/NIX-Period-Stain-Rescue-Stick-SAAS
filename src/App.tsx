import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { DemoResetButton } from './components/common/DemoResetButton';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { preloadCommonProductImages } from './components/product/ProductImage';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { StickProductPage } from './pages/StickProductPage';
import { RefillProductPage } from './pages/RefillProductPage';
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
import { CyclePredictorPage } from './pages/CyclePredictorPage';

export const App: React.FC = () => {
  useEffect(() => {
    preloadCommonProductImages();
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/stick" element={<StickProductPage />} />
                <Route path="/shop/refill" element={<RefillProductPage />} />
                <Route path="/product/nix-rescue-stick" element={<StickProductPage />} />
                <Route path="/product/refill-cartridges" element={<RefillProductPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account/orders/:id"
                  element={
                    <ProtectedRoute>
                      <OrderTrackingPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/emergency-kit" element={<EmergencyKitPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/cycle-predictor" element={<CyclePredictorPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
            <DemoResetButton />
          </div>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
