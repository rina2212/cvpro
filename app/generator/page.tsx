'use client';

export default function GeneratorPage() {
  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout konnte nicht gestartet werden.');
      }
    } catch (error) {
      alert('Fehler beim Start des Checkouts.');
    }
  };

  return (
    <main className="generator-page">
      {/* Logo / Marke */}
      <div className="brand-headline">
        <span className="brand-mark">CV</span>Pro
      </div>

      <h1>Lebenslauf Generator</h1>

      {/* Schritt-Indikator */}
      <div className="step-indicator">
        <div className="step active">
          <span className="step-dot" />
          <span className="step-label">Persönliche Angaben</span>
        </div>
        <div className="step">
          <span className="step-dot" />
          <span className="step-label">Profil & Stil</span>
        </div>
        <div className="step">
          <span className="step-dot" />
          <span className="step-label">Erfahrung</span>
        </div>
        <div className="step">
          <span className="step-dot" />
          <span className="step-label">Ausbildung</span>
        </div>
        <div className="step">
          <span className="step-dot" />
          <span className="step-label">PDF</span>
        </div>
      </div>

      <div className="generator-layout">
        <form className="cv-form">
          <h2>Persönliche Angaben</h2>

          <div className="field">
            <input type="text" placeholder="Name" />
          </div>

          <div className="field">
            <input type="text" placeholder="Berufsbezeichnung" />
          </div>

          <h2>Stil</h2>

          <div className="field">
            <select>
              <option>Neutral</option>
              <option>Modern</option>
              <option>Klassisch</option>
            </select>
          </div>

          <h2>Kurzprofil</h2>

          <div className="field">
            <textarea placeholder="Kurzprofil" />
          </div>

          <button type="button">Kurzprofil neu generieren</button>

          <h2>Kenntnisse</h2>

          <div className="field">
            <textarea placeholder="Kenntnisse" />
          </div>

          <button type="button">Neue Skill-Variante</button>

          <h2>Berufserfahrung</h2>

          <div className="field">
            <textarea placeholder="Berufserfahrung" />
          </div>

          <button type="button">Neue Erfahrungs-Variante</button>

          <h2>Ausbildung</h2>

          <div className="field">
            <textarea placeholder="Ausbildung" />
          </div>

          <button type="button">Neue Ausbildungs-Variante</button>

          {/* PRIMARY CTA */}
          <div className="primary-cta">
            <button
              type="button"
              className="cta-button"
              onClick={handleCheckout}
            >
              PDF erstellen
            </button>

            <p className="cta-hint">
              Kostenlos testen · Download im nächsten Schritt
            </p>
          </div>
        </form>

        {/* Vorschau */}
        <aside className="preview-box">
          <div className="preview-paper">
            <div className="preview-name">Max Mustermann</div>
            <div className="preview-title">Account Manager</div>
          </div>

          <p className="preview-hint">
            Vorschau aktualisiert sich automatisch während der Eingabe.
          </p>
        </aside>
      </div>
    </main>
  );
}
