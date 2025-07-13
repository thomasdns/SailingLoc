import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Ici, tu pourrais envoyer les données à un backend ou un service email
  };

  return (
    <div className="contact-page" style={{ minHeight: '80vh', background: 'var(--color-gray-50)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4rem 0' }}>
        <form onSubmit={handleSubmit} style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--border-radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: '3rem 3.5rem',
          maxWidth: 650,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            {/* Logo et titre peuvent être ajoutés ici si besoin */}
            <h1 style={{ color: 'var(--color-blue)', fontSize: '2.2rem', margin: 0 }}>Contactez-nous</h1>
          </div>
          {submitted ? (
            <div style={{ color: 'var(--color-orange)', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
              Merci pour votre message ! Nous vous répondrons rapidement.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="name" style={{ color: 'var(--color-gray-700)', fontWeight: 600, fontSize: '1.1rem' }}>Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-gray-300, #d1d5db)',
                    fontSize: '1.1rem',
                  }}
                  placeholder="Votre nom"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="email" style={{ color: 'var(--color-gray-700)', fontWeight: 600, fontSize: '1.1rem' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-gray-300, #d1d5db)',
                    fontSize: '1.1rem',
                  }}
                  placeholder="votre@email.com"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="message" style={{ color: 'var(--color-gray-700)', fontWeight: 600, fontSize: '1.1rem' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-gray-300, #d1d5db)',
                    fontSize: '1.1rem',
                    resize: 'vertical',
                  }}
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline"
                style={{ background: 'var(--color-orange)', color: 'var(--color-white)', border: 'none', fontWeight: 700, fontSize: '1.15rem', padding: '1rem 0', marginTop: '0.5rem' }}
              >
                Envoyer
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact; 