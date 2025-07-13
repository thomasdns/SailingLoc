import aproposImg from "../assets/apropos.png";

const sidebarData = [
  { icon: "👥", text: "Plus de 1 100 000 membres" },
  { icon: "⛵", text: "Plus de 55 000 bateaux" },
  { icon: "⚓", text: "Plus de 750 ports" },
  { icon: "⭐", text: "Plus de 593 193 avis clients" },
];

const About = () => (
  <div style={{ minHeight: '80vh', background: 'var(--color-gray-50)' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 1400,
      margin: '0 auto',
      padding: '4rem 1rem 2rem 1rem',
      gap: '2.5rem',
      alignItems: 'stretch',
    }}>
      {/* Colonne gauche : image */}
      <div style={{ flex: '0 0 420px', display: 'flex', alignItems: 'stretch', minWidth: 0 }}>
        <img src={aproposImg} alt="À propos SailingLoc" style={{ width: '100%', height: '100%', maxHeight: '1000px', borderRadius: 'var(--border-radius-xl)', boxShadow: 'var(--shadow-lg)', minHeight: 400 }} />
      </div>
      {/* Colonne centre : texte */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ color: 'var(--color-blue)', fontSize: '2.2rem', textAlign: 'left', marginBottom: '2rem' }}>À propos de SailingLoc</h1>
        <section style={{ background: 'var(--color-white)', borderRadius: 'var(--border-radius-xl)', boxShadow: 'var(--shadow-lg)', padding: '2.5rem 2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--color-orange)', fontSize: '1.3rem', marginBottom: '1rem' }}>Présentation de SailingLoc</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-800)', marginBottom: '1.5rem' }}>
            SailingLoc est une start-up innovante fondée par M. Voisin, spécialisée dans la mise en relation pour la location de voiliers et de bateaux à moteur. Basée à La Rochelle (Charente-Maritime), SailingLoc propose une plateforme collaborative, sécurisée et centrée sur l’expérience utilisateur.<br /><br />
            Notre service s’adresse aussi bien aux passionnés de navigation qu’aux vacanciers occasionnels, en facilitant la location de bateaux auprès de particuliers ou de professionnels partout en Europe. Que ce soit pour une sortie en mer, une croisière en famille, entre amis ou en couple, SailingLoc vous invite à vivre des aventures maritimes authentiques et inoubliables.
          </p>
          <h2 style={{ color: 'var(--color-orange)', fontSize: '1.3rem', marginBottom: '1rem' }}>Informations légales</h2>
          <ul style={{ fontSize: '1.08rem', color: 'var(--color-gray-800)', listStyle: 'none', padding: 0, lineHeight: 1.8 }}>
            <li><b>Dénomination sociale</b> : SailingLoc</li>
            <li><b>Date de création</b> : 15/03/2024</li>
            <li><b>Siège social</b> : 12 Quai Louis Durand, 17000 La Rochelle</li>
            <li><b>Statut juridique</b> : Société par Actions Simplifiée (SAS)</li>
            <li><b>Capital social</b> : 15 000 €</li>
            <li><b>Numéro RCS</b> : LA ROCHELLE B 923 456 789</li>
            <li><b>SIREN</b> : 923 456 789</li>
            <li><b>SIRET</b> : 923 456 789 00014</li>
            <li><b>Code APE/NAF</b> : 7990Z – Services de réservation et activités connexes</li>
            <li><b>TVA intracommunautaire</b> : FR42923456789</li>
          </ul>
        </section>
      </div>
    </div>
    {/* Section chiffres clés et CTA en bas */}
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '0 1rem 2rem 1rem',
      display: 'flex',
      flexDirection: 'row',
      gap: '2.5rem',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      justifyContent: 'center',
    }}>
      <div style={{ flex: 2, minWidth: 260, display: 'flex', flexDirection: 'row', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sidebarData.map((item, idx) => (
          <div key={idx} style={{ flex: '1 1 220px', minWidth: 180, maxWidth: 260, display: 'flex', alignItems: 'center', gap: '1rem', background: idx % 2 === 0 ? 'var(--color-gray-50)' : 'var(--color-gray-100)', borderRadius: 'var(--border-radius)', padding: '1.2rem 1rem', marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '2rem', color: 'var(--color-blue)' }}>{item.icon}</span>
            <p style={{ margin: 0, color: 'var(--color-gray-800)', fontWeight: 600 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About; 