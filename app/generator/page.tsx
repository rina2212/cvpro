'use client';

import { useState } from 'react';

export default function GeneratorPage() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profile, setProfile] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');

  const handleCheckout = async () => {
    // 1. Formulardaten lokal speichern
    const cvData = {
      name,
      title,
      profile,
      experience,
      education,
    };

    localStorage.setItem('cv-data', JSON.stringify(cvData));

    // 2. Checkout starten
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Checkout konnte nicht gestartet werden.');
    }
  };

  return (
    <main className="generator-page">
      <h1>Lebenslauf Generator</h1>

      <div className="generator-layout">
        <form className="cv-form">
          <h2>Persönliche Angaben</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Berufsbezeichnung"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h2>Kurzprofil</h2>
          <textarea
            placeholder="Kurzprofil"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />

          <h2>Berufserfahrung</h2>
          <textarea
            placeholder="Berufserfahrung"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <h2>Ausbildung</h2>
          <textarea
            placeholder="Ausbildung"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <button type="button" onClick={handleCheckout}>
            PDF erstellen
          </button>
        </form>
      </div>
    </main>
  );
}
