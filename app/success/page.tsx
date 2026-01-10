'use client';

export default function SuccessPage() {
  const handleDownload = () => {
    const data = localStorage.getItem('cv-data');

    if (!data) {
      alert('Keine Lebenslaufdaten gefunden.');
      return;
    }

    const encoded = encodeURIComponent(data);
    window.location.href = `/api/download?data=${encoded}`;
  };

  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>Zahlung erfolgreich 🎉</h1>
      <p>Dein Lebenslauf ist jetzt bereit.</p>

      <button
        onClick={handleDownload}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1rem',
          borderRadius: '8px',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        PDF herunterladen
      </button>
    </main>
  );
}
