import { useMemo, useState } from 'react';
import { cards } from './data/cards';
import type { Affinity, Card, CardStatus, Rarity } from './types';

const affinities: Array<'Toutes' | Affinity> = ['Toutes','Braise','Écryme','Soléane','Umbra','Obsidienne','Brume'];
const rarities: Array<'Toutes' | Rarity> = ['Toutes','Commune','Peu Commune','Rare','Mythique'];
const statuses: Array<'Tous' | CardStatus> = ['Tous','Validée','À revoir','Draft'];

const affinityMeta: Record<Affinity, { icon: string; label: string }> = {
  Braise: { icon: '🔥', label: 'Aggression & burst' },
  Écryme: { icon: '🩸', label: 'Drain & Flux' },
  Soléane: { icon: '🌞', label: 'Protection & défense' },
  Umbra: { icon: '🌑', label: 'Évasion & affaiblissement' },
  Obsidienne: { icon: '🪨', label: 'Mitigation & endurance' },
  Brume: { icon: '☁️', label: 'Neutre & polyvalence' },
};

function App() {
  const [tab, setTab] = useState<'cards' | 'rules' | 'about'>('cards');
  const [query, setQuery] = useState('');
  const [affinity, setAffinity] = useState<'Toutes' | Affinity>('Toutes');
  const [rarity, setRarity] = useState<'Toutes' | Rarity>('Toutes');
  const [status, setStatus] = useState<'Tous' | CardStatus>('Tous');
  const [selected, setSelected] = useState<Card | null>(null);
  const [detailTab, setDetailTab] = useState<'physical' | 'spiritual' | 'reincarnation'>('physical');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesQuery = !q || `${card.name} ${card.id} ${card.setNumber}`.toLowerCase().includes(q);
      const matchesAffinity = affinity === 'Toutes' || card.affinity === affinity;
      const matchesRarity = rarity === 'Toutes' || card.rarity === rarity;
      const matchesStatus = status === 'Tous' || card.status === status;
      return matchesQuery && matchesAffinity && matchesRarity && matchesStatus;
    });
  }, [query, affinity, rarity, status]);

  const openCard = (card: Card) => {
    setSelected(card);
    if (card.physical) setDetailTab('physical');
    else if (card.spiritualBonus || card.spiritualEffect) setDetailTab('spiritual');
    else setDetailTab('reincarnation');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">TCG · PROTOTYPE</div>
          <h1>OUTREMONDE <span>CARD LAB</span></h1>
        </div>
        <div className="version">V0.1.2</div>
      </header>

      <main>
        {tab === 'cards' && (
          <>
            <section className="hero-panel">
              <div>
                <div className="eyebrow">CORE SET 01 · LABORATOIRE</div>
                <h2>{cards.length} cartes de travail</h2>
                <p>Consulte les cartes déjà définies et repère immédiatement celles qui sont validées, à revoir ou encore en draft. Braise est désormais complète : 20/20 cartes.</p>
              </div>
              <div className="hero-stats">
                <div><strong>{cards.filter(c => c.status === 'Validée').length}</strong><span>validées</span></div>
                <div><strong>{cards.filter(c => c.status === 'À revoir').length}</strong><span>à revoir</span></div>
                <div><strong>{cards.filter(c => c.status === 'Draft').length}</strong><span>drafts</span></div>
              </div>
            </section>

            <section className="filters">
              <label className="searchbox">
                <span>⌕</span>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher une carte…" />
              </label>

              <div className="chip-row horizontal-scroll">
                {affinities.map(a => (
                  <button key={a} className={`chip ${affinity === a ? 'active' : ''}`} onClick={() => setAffinity(a)}>
                    {a === 'Toutes' ? 'Toutes' : `${affinityMeta[a].icon} ${a}`}
                  </button>
                ))}
              </div>

              <div className="select-row">
                <label>Rareté
                  <select value={rarity} onChange={e => setRarity(e.target.value as typeof rarity)}>
                    {rarities.map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <label>Statut
                  <select value={status} onChange={e => setStatus(e.target.value as typeof status)}>
                    {statuses.map(s => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
            </section>

            <div className="result-line"><strong>{filtered.length}</strong> carte{filtered.length > 1 ? 's' : ''}</div>

            <section className="card-grid">
              {filtered.map(card => (
                <button className={`card-tile affinity-${card.affinity.toLowerCase().replace('é','e')}`} key={card.id} onClick={() => openCard(card)}>
                  <div className="card-head">
                    <div className="number">#{String(card.setNumber).padStart(3,'0')}</div>
                    <div className="cost">{card.cost}<small>Flux</small></div>
                  </div>
                  <div className="affinity-line">{affinityMeta[card.affinity].icon} {card.affinity}</div>
                  <h3>{card.name}</h3>
                  <div className="rarity">{card.rarity}</div>
                  {card.type === 'Créature' ? (
                    <div className="stats"><span>⚔ {card.atk}</span><span>🛡 {card.def}</span></div>
                  ) : (
                    <div className="type-badge">{card.type}</div>
                  )}
                  <div className={`status status-${card.status.replace('À ','a-').toLowerCase()}`}>{card.status}</div>
                </button>
              ))}
            </section>
          </>
        )}

        {tab === 'rules' && <Rules />}
        {tab === 'about' && <About />}
      </main>

      <nav className="bottom-nav">
        <button className={tab === 'cards' ? 'active' : ''} onClick={() => setTab('cards')}><span>▦</span>Cartes</button>
        <button className={tab === 'rules' ? 'active' : ''} onClick={() => setTab('rules')}><span>≡</span>Règles</button>
        <button className={tab === 'about' ? 'active' : ''} onClick={() => setTab('about')}><span>◇</span>Lab</button>
      </nav>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="card-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-top">
              <div className="big-icon">{affinityMeta[selected.affinity].icon}</div>
              <div>
                <div className="eyebrow">#{String(selected.setNumber).padStart(3,'0')} · {selected.rarity}</div>
                <h2>{selected.name}</h2>
                <p>{selected.affinity} · {selected.type} · {affinityMeta[selected.affinity].label}</p>
              </div>
              <div className="modal-cost">{selected.cost}<small>Flux</small></div>
            </div>
            <div className="modal-stats">
              {selected.type === 'Créature' && <><span><b>{selected.atk}</b> ATK</span><span><b>{selected.def}</b> DEF</span></>}
              <span className="type-badge">{selected.type}</span>
              <span className={`status status-${selected.status.replace('À ','a-').toLowerCase()}`}>{selected.status}</span>
            </div>

            <div className="segmented">
              {selected.physical && <button className={detailTab === 'physical' ? 'active' : ''} onClick={() => setDetailTab('physical')}>Physique</button>}
              {(selected.spiritualBonus || selected.spiritualEffect) && <button className={detailTab === 'spiritual' ? 'active' : ''} onClick={() => setDetailTab('spiritual')}>Spirituel</button>}
              {selected.reincarnation && <button className={detailTab === 'reincarnation' ? 'active' : ''} onClick={() => setDetailTab('reincarnation')}>Réincarnation</button>}
            </div>

            <div className="effect-panel">
              {detailTab === 'physical' && selected.physical && <><div className="effect-title">⚔ Effet Physique</div><p>{selected.physical}</p></>}
              {detailTab === 'spiritual' && <>
                {selected.spiritualBonus && <><div className="effect-title">👻 Bonus Spirituel</div><p>{selected.spiritualBonus}</p></>}
                {selected.spiritualEffect && <><div className="effect-title secondary">Effet Spirituel</div><p>{selected.spiritualEffect}</p></>}
              </>}
              {detailTab === 'reincarnation' && selected.reincarnation && <><div className="effect-title">💀 Réincarnation</div><p>{selected.reincarnation}</p></>}
            </div>

            {selected.keywords?.length ? <div className="keyword-row">{selected.keywords.map(k => <span key={k}>{k}</span>)}</div> : null}
            {selected.note && <div className="review-note"><b>Note d’équilibrage</b><br />{selected.note}</div>}
          </article>
        </div>
      )}
    </div>
  );
}

function Rules() {
  const rules = [
    ['🎯 Objectif', 'Réduire les 20 PV adverses à 0. Deck de 40 cartes, maximum 3 exemplaires d’une même carte.'],
    ['💠 Flux', '1 Flux au tour 1 puis +1 par tour. Le Flux non dépensé est perdu en fin de tour.'],
    ['🌐 Deux plans', 'Chaque créature est jouée soit en Physique, soit en Spirituel. Elle ne change ensuite plus de plan.'],
    ['⚔ Physique', 'Peut attaquer et bloquer, subir des dégâts et mourir. Sa mort déclenche sa Réincarnation.'],
    ['👻 Spirituel', 'Ne combat pas. Quand une carte est jouée en Spirituel, elle déclenche le Bonus Spirituel de son affinité puis son propre effet Spirituel.'],
    ['🔮 Bonus', 'Le Bonus Spirituel d’une même affinité ne peut se déclencher qu’une fois par tour. Si ce Bonus a déjà été utilisé, la carte jouée en Spirituel résout quand même son propre effet.'],
    ['🛡 Interposition', 'Un attaquant peut être bloqué par un seul bloqueur. Un bloqueur intercepte normalement une seule attaque.'],
    ['⚠ Combat', 'Seule la créature ATTAQUANTE inflige des dégâts. Le bloqueur ne riposte jamais.'],
    ['🃏 Affinités', 'Les affinités peuvent être mélangées librement dans un deck. Brume est l’affinité neutre.'],
    ['📜 Rituels', 'Les Rituels sont des effets immédiats. Ils peuvent être Physiques ou Spirituels ; un Rituel Spirituel peut déclencher le Bonus Spirituel de son affinité.'],
    ['🕯 Permanents', 'Les Permanents restent sur le Terrain Spirituel et appliquent leur effet tant qu’ils sont présents. Ils ne combattent pas.'],
    ['💀 Réincarnation', 'Quand une créature Physique meurt, son effet de Réincarnation se résout puis elle va au cimetière.'],
    ['🔥 Sacrifice', 'Sacrifier une créature Physique la fait mourir volontairement : sa Réincarnation se déclenche normalement, sauf si une carte précise le contraire.'],
  ];
  return <section className="page-panel"><div className="eyebrow">RÈGLES · RÉFÉRENCE RAPIDE</div><h2>Fondations actuelles</h2><p className="intro">Cette V0.1 sert de référence mobile. Les points de timing encore en cours d’audit restent volontairement hors automatisation.</p><div className="rule-list">{rules.map(([title,body]) => <div className="rule-card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>;
}

function About() {
  return <section className="page-panel"><div className="eyebrow">CARD LAB · V0.1.2</div><h2>Laboratoire du TCG</h2><p className="intro">Cette version intègre désormais les 20 cartes Braise : 12 créatures, 4 rituels et 4 permanents spirituels. Aucune partie n’est encore automatisée : le Deck Builder arrivera en V0.2.</p><div className="roadmap"><div className="done"><b>V0.1</b><span>Collection + fiches + règles</span></div><div><b>V0.2</b><span>Deck Builder 40 cartes</span></div><div><b>V0.3</b><span>Table de jeu locale</span></div><div><b>V0.4</b><span>Moteur de règles</span></div><div><b>V0.5</b><span>Statistiques de playtest</span></div></div></section>;
}

export default App;
