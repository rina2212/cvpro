'use client';

import { useState } from 'react';

export default function GeneratorPage() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profile, setProfile] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');

  const [layout, setLayout] = useState('classic');
  const [font, setFont] = useState('sans');
  const [accent, setAccent] = useState('black');

  const handleCheckout = async () => {
    const cvData = {
      name,
      title,
      profile,
      experience,
      education,
      layout,
      font,
      accent,
    };

    localStorage.setItem('cv-data', JSON.stringify(cvData));

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

      <form className="cv-form">
        <h2>Inhalt</h2>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Berufsbezeichnung" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea placeholder="Kurzprofil" value={profile} onChange={(e) => setProfile(e.target.value)} />
        <textarea placeholder="Berufserfahrung" value={experience} onChange={(e) => setExperience(e.target.value)} />
        <textarea placeholder="Ausbildung" value={education} onChange={(e) => setEducation(e.target.value)} />

        <h2>Design</h2>

        <label>
          Layout
          <select value={layout} onChange={(e) => setLayout(e.target.value)}>
            <option value="classic">Klassisch</option>
            <option value="modern">Modern</option>
          </select>
        </label>

        <label>
          Schrift
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="sans">Sans Serif</option>
            <option value="serif">Serif</option>
          </select>
        </label>

        <label>
          Akzentfarbe
          <select value={accent} onChange={(e) => setAccent(e.target.value)}>
            <option value="black">Schwarz</option>
            <option value="blue">Blau</option>
            <option value="gray">Grau</option>
          </select>
        </label>

        <button type="button" onClick={handleCheckout}>
          PDF erstellen
        </button>
      </form>
    </main>
  );
}
