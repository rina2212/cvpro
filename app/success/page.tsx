'use client';

export default function SuccessPage() {
  const handleDownload = () => {
    // WICHTIG: kein fetch, kein async – echter Browser-Download
    window.location.href = '/api/download';
  };

  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>Zahlung erfolgreich 🎉</h1>

      <p style={{ marginTop: '1rem' }}>
        Vielen Dank! Dein Lebenslauf ist jetzt bereit.
      </p>

      <button
        onClick={handleDownload}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4f46e5',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        📄 Lebenslauf herunterladen
      </button>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
        Falls der Download nicht startet, prüfe bitte deinen Popup-Blocker.
      </p>
    </main>
  );
}
