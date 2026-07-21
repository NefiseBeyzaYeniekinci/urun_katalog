import React, { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBF8F5' }}>
          <h2 style={{ color: '#2D2926', marginBottom: '10px' }}>Sayfa Yüklenirken Bir Hata Oluştu</h2>
          <p style={{ color: '#736C65', fontSize: '14px', maxWidth: '400px' }}>
            Önbelleğe alınmış eski verilerden kaynaklı bir uyuşmazlık olabilir.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#C05663',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              fontSize: '14px'
            }}
          >
            Verileri Temizle ve Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

