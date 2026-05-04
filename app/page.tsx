'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Machine Learning Hub</h1>
        
        <p style={styles.description}>
          Welcome to the Machine Learning Hub. We provide a centralized platform 
          for researchers and developers to explore, build, and deploy 
          advanced machine learning models and datasets.
        </p>

        <div style={styles.buttonContainer}>
          <Link href="/login" style={styles.button}>
            Get Started
          </Link>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2026 Machine Learning Hub - Laboratory Exercise No. 4</p>
      </footer>
    </main>
  );
}

const styles = {
  container: { 
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column' as 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fefcbf', // Matte Light Yellow (Tailwind yellow-100 equivalent)
    color: '#1a202c',           // Darker slate for readability
    fontFamily: 'Inter, system-ui, sans-serif', 
    padding: '20px' 
  },
  content: { 
    textAlign: 'center' as 'center', 
    maxWidth: '600px' 
  },
  title: { 
    fontSize: '3.5rem', 
    fontWeight: '800' as '800', 
    marginBottom: '20px', 
    color: '#744210',          // Deep bronze/brown for a "matte" feel
    letterSpacing: '-0.02em'
  },
  description: { 
    fontSize: '1.2rem', 
    lineHeight: '1.6', 
    color: '#975a16',          // Muted gold/brown
    marginBottom: '40px' 
  },
  buttonContainer: { 
    marginTop: '20px' 
  },
  button: { 
    padding: '15px 40px', 
    backgroundColor: '#1a202c', // High-contrast dark button
    color: '#fefcbf',           // Light yellow text on button
    borderRadius: '12px',       // Modern rounded corners
    textDecoration: 'none', 
    fontWeight: 'bold' as 'bold', 
    fontSize: '1.1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
  },
  footer: { 
    position: 'absolute' as 'absolute', 
    bottom: '20px', 
    color: '#b7791f', 
    fontSize: '0.9rem' 
  },
};