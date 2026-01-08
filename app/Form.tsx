import './form.css';

export default function Form() {
  return (
    <form className="cv-form">
      <div className="field">
        <label htmlFor="firstName">Vorname</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Max"
        />
      </div>

      <div className="field">
        <label htmlFor="lastName">Nachname</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Mustermann"
        />
      </div>

      <div className="field">
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="max@mail.de"
        />
      </div>

      <button type="submit">Absenden</button>
    </form>
  );
}
