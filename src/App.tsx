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
  Obsidienne: { icon: '🪨', label: 'Armure & fracture' },
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
  const [artPlan, setArtPlan] = useState<'physical' | 'spiritual'>('physical');
  const [artFullscreen, setArtFullscreen] = useState(false);

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
    setArtFullscreen(false);
    if (card.art?.physical) setArtPlan('physical');
    else if (card.art?.spiritual) setArtPlan('spiritual');
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
        <div className="version">V0.1.12</div>
      </header>

      <main>
        {tab === 'cards' && (
          <>
            <section className="hero-panel">
              <div>
                <div className="eyebrow">CORE SET 01 · LABORATOIRE</div>
                <h2>{cards.length} cartes de travail</h2>
                <p>Consulte les cartes déjà définies et repère immédiatement celles qui sont validées, à revoir ou encore en draft. Braise, Écryme, Soléane, Umbra et Obsidienne sont désormais complètes : 20/20 cartes chacune. Brume reste en pool de travail.</p>
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
                  {card.art?.physical && (
                    <div className="card-tile-art">
                      <img src={card.art.physical} alt={`${card.name} — visuel Physique HD`} loading="lazy" />
                    </div>
                  )}
                  <div className="affinity-line">{affinityMeta[card.affinity].icon} {card.affinity}</div>
                  <h3>{card.name}</h3>
                  <div className="rarity">{card.rarity}</div>
                  {card.type === 'Créature' ? (
                    <div className="stats"><span>⚔ {card.atk}</span><span>🛡 {card.def}</span></div>
                  ) : (
                    <div className="type-badge">{card.type}</div>
                  )}
                  {card.art && <div className="art-ready">🎨 Visuel HD</div>}
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

            {selected.art && (
              <section className="card-art-section">
                <div className="card-art-heading">
                  <div><b>Carte complète HD</b><span>Prototype visuel intégré à la fiche</span></div>
                  <div className="art-plan-toggle">
                    {selected.art.physical && <button className={artPlan === 'physical' ? 'active' : ''} onClick={() => setArtPlan('physical')}>Physique</button>}
                    {selected.art.spiritual && <button className={artPlan === 'spiritual' ? 'active' : ''} onClick={() => setArtPlan('spiritual')}>Spirituel</button>}
                  </div>
                </div>
                <button className="card-art-button" onClick={() => setArtFullscreen(true)} aria-label={`Agrandir la carte ${artPlan === 'physical' ? 'Physique' : 'Spirituelle'}`}>
                  <img src={artPlan === 'physical' ? selected.art.physical : selected.art.spiritual} alt={`${selected.name} — plan ${artPlan === 'physical' ? 'Physique' : 'Spirituel'}`} />
                </button>
                <p className="art-hint">Touchez la carte pour l’afficher en grand. Les données de la fiche restent la référence de playtest tant que les visuels sont en phase de production.</p>
              </section>
            )}

            <div className="segmented">
              {selected.physical && <button className={detailTab === 'physical' ? 'active' : ''} onClick={() => { setDetailTab('physical'); if (selected.art?.physical) setArtPlan('physical'); }}>Physique</button>}
              {(selected.spiritualBonus || selected.spiritualEffect) && <button className={detailTab === 'spiritual' ? 'active' : ''} onClick={() => { setDetailTab('spiritual'); if (selected.art?.spiritual) setArtPlan('spiritual'); }}>Spirituel</button>}
              {selected.reincarnation && <button className={detailTab === 'reincarnation' ? 'active' : ''} onClick={() => setDetailTab('reincarnation')}>Réincarnation</button>}
            </div>

            <div className="effect-panel">
              {detailTab === 'physical' && selected.physical && <><div className="effect-title">⚔ Effet Physique</div><p>{selected.physical}</p></>}
              {detailTab === 'spiritual' && <>
                {selected.spiritualBonus && <><div className="effect-title">👻 Bonus Spirituel</div><p>{selected.spiritualBonus}</p></>}
                {selected.spiritualEffect && <><div className="effect-title secondary">Effet Spirituel</div><p>{selected.spiritualEffect}</p></>}
                <div className="review-note"><b>Rappel Spirituel</b><br />Le Bonus d’affinité ne se cumule pas : 1 déclenchement maximum par affinité et par tour. L’effet Spirituel propre à cette carte se résout à son arrivée et ne se répète pas aux tours suivants, sauf si le texte indique qu’il s’agit d’un effet permanent.</div>
              </>}
              {detailTab === 'reincarnation' && selected.reincarnation && <><div className="effect-title">💀 Réincarnation</div><p>{selected.reincarnation}</p></>}
            </div>

            {selected.keywords?.length ? <div className="keyword-row">{selected.keywords.map(k => <span key={k}>{k}</span>)}</div> : null}
            {selected.note && <div className="review-note"><b>Note d’équilibrage</b><br />{selected.note}</div>}
          </article>
        </div>
      )}
      {selected?.art && artFullscreen && (
        <div className="art-lightbox" onClick={() => setArtFullscreen(false)}>
          <button className="art-lightbox-close" onClick={() => setArtFullscreen(false)}>×</button>
          <img onClick={e => e.stopPropagation()} src={artPlan === 'physical' ? selected.art.physical : selected.art.spiritual} alt={`${selected.name} — carte ${artPlan === 'physical' ? 'Physique' : 'Spirituelle'} HD`} />
          <div className="art-lightbox-caption">{selected.name} · {artPlan === 'physical' ? 'Plan Physique' : 'Plan Spirituel'}</div>
        </div>
      )}
    </div>
  );
}

function Rules() {
  const rules = [
    ['🎯 Objectif', 'Chaque joueur commence à 20 PV. Réduisez les PV adverses à 0 ou moins. Vous perdez aussi si vous devez piocher une carte alors que votre deck est vide.'],
    ['❤️ Points de vie', 'Les PV peuvent dépasser les 20 PV de départ et n’ont aucun maximum. Un joueur perd immédiatement s’il atteint 0 PV ou moins.'],
    ['🃏 Construction', 'Deck de 40 cartes, maximum 3 exemplaires d’une même carte. Les affinités peuvent être mélangées librement ; Brume est neutre.'],
    ['✋ Main & mulligan', 'Main de départ : 7 cartes. Mulligan unique : remélangez votre main, piochez 7 nouvelles cartes, puis placez 1 carte sous votre deck ; vous commencez donc avec 6 cartes.'],
    ['📥 Pioche', 'Piochez 1 carte au début de chacun de vos tours. Le joueur qui commence la partie ne pioche pas lors de son premier tour.'],
    ['💠 Flux', 'Vous disposez de 1 Flux au tour 1, puis votre Flux de base augmente de +1 au début de chacun de vos tours. Le Flux non dépensé est perdu en fin de tour.'],
    ['⚡ Flux supplémentaire', 'Vous ne pouvez gagner que +2 Flux supplémentaires par tour, toutes sources de cartes confondues. Cette limite inclut explicitement les Bonus Spirituels qui génèrent du Flux, notamment le Bonus Écryme. Le Flux de base gagné normalement au début du tour ne compte pas dans cette limite. Une fois +2 Flux supplémentaires gagnés pendant le tour, tout gain supplémentaire de Flux provenant d’une carte est ignoré.'],
    ['0️⃣ Cartes à 0 Flux', 'Chaque joueur ne peut jouer qu’une seule carte dont le coût imprimé est 0 Flux par tour, quel que soit son type ou le Plan choisi. Cette limite porte sur le coût imprimé : une carte dont le coût est réduit à 0 par un effet n’est pas une carte de coût imprimé 0.'],
    ['🌐 Choix du plan', 'Lorsqu’une créature est jouée, choisissez définitivement son plan : Physique ou Spirituel. Une créature déjà en jeu ne change pas de plan, sauf si une future carte l’autorise explicitement.'],
    ['⚔ Plan Physique', 'Une créature Physique peut attaquer et bloquer selon les règles normales. Elle peut subir des dégâts, mourir et déclencher sa Réincarnation.'],
    ['👻 Plan Spirituel', 'Une créature jouée en Spirituel reste sur le Terrain Spirituel. Elle ne peut ni attaquer ni bloquer, ne subit pas de dégâts de combat et ne meurt donc pas au combat. Elle peut toutefois quitter le Terrain Spirituel si un effet de carte l’indique explicitement.'],
    ['✨ Effet Spirituel d’arrivée', 'L’effet Spirituel propre à une carte se résout une seule fois, au moment où cette carte est jouée en Spirituel. Il ne se réactive pas automatiquement au début des tours suivants, même si la carte reste sur le Terrain Spirituel.'],
    ['👻 Bonus Spirituel d’affinité', 'Lorsqu’une carte est jouée en Spirituel, vérifiez puis résolvez d’abord le Bonus Spirituel de son affinité s’il peut se déclencher ; résolvez ensuite l’effet Spirituel propre de la carte. Le Bonus Spirituel d’une même affinité ne se cumule pas et ne peut être déclenché qu’une seule fois par tour. Le Bonus Écryme ne donne +1 Flux que si la carte Écryme jouée en Spirituel a un coût imprimé d’au moins 1 Flux.'],
    ['🚫 Bonus non stackable', 'Jouer plusieurs cartes de la même affinité en Spirituel pendant un même tour ne multiplie jamais le Bonus Spirituel d’affinité. Exemple : deux Braise Spirituelles ne peuvent produire qu’un seul Bonus Spirituel Braise pendant ce tour.'],
    ['🧩 Effets propres des cartes', 'La limitation du Bonus Spirituel d’affinité ne bloque pas les effets Spirituels propres aux cartes. Chaque carte jouée en Spirituel résout normalement son effet personnel ; ces effets peuvent se cumuler entre eux sauf si leur texte indique le contraire.'],
    ['✅ Condition du Bonus', 'Si la condition nécessaire au Bonus Spirituel n’est pas remplie au moment où la carte est jouée, le Bonus ne se déclenche pas et ne consomme pas l’unique déclenchement autorisé de cette affinité pour le tour.'],
    ['🕯 Permanents Spirituels', 'Un Permanent Spirituel reste sur le Terrain Spirituel et son effet permanent s’applique aussi longtemps qu’il est présent. Contrairement à un simple effet Spirituel d’arrivée, un texte explicitement permanent continue donc de fonctionner tour après tour. Vous ne pouvez pas jouer un Permanent Spirituel si vous en contrôlez déjà un du même nom.'],
    ['📜 Rituels', 'Un Rituel est joué pendant une Phase principale, résout entièrement son effet puis va au cimetière. Un Rituel Spirituel peut déclencher le Bonus Spirituel de son affinité lorsqu’il est joué, mais il ne reste pas sur le Terrain Spirituel après sa résolution. Les cartes ne sont pas jouées pendant la phase d’attaque, sauf si un futur mot-clé l’autorise explicitement.'],
    ['🛌 Arrivée & Ruée', 'Une créature Physique ne peut pas attaquer le tour où elle arrive en jeu, sauf si elle possède Ruée.'],
    ['⚔ Attaque', 'Il y a exactement une phase d’attaque par tour. Tous les attaquants sont déclarés ensemble, puis le joueur attaquant annonce leur ordre de résolution avant que le défenseur ne choisisse ses bloqueurs.'],
    ['🛡 Interposition', 'Un attaquant peut être bloqué par un seul bloqueur et un bloqueur ne peut normalement bloquer qu’une seule attaque. Une attaque déclarée bloquée reste bloquée même si son bloqueur quitte le terrain avant sa résolution.'],
    ['💥 Combat', 'Les attaques sont résolues une par une dans l’ordre annoncé. Seule la créature ATTAQUANTE inflige des dégâts : le bloqueur ne riposte jamais. Sans bloqueur, l’attaquant inflige son ATK au joueur adverse.'],
    ['🔥 Impact X', 'Si une attaque avec Impact X est bloquée et que ses dégâts détruisent le bloqueur, les dégâts excédentaires réellement disponibles après les augmentations, Protection, Armure et les dégâts déjà marqués sur ce bloqueur peuvent être infligés au joueur adverse, jusqu’à un maximum de X. Si le bloqueur n’est plus présent à la résolution, l’attaque reste bloquée et Impact ne s’applique pas.'],
    ['🩸 Drain X', 'La première fois par tour qu’une créature avec Drain X inflige des dégâts de combat au joueur adverse, son contrôleur gagne X PV. Les pertes de PV causées par des effets de cartes ne déclenchent pas Drain.'],
    ['🌞 Protection X', 'La première fois de chaque tour qu’une créature avec Protection X devrait subir des dégâts, réduisez ces dégâts de X, jusqu’à un minimum de 0. Une même créature ne peut bénéficier de Protection qu’une seule fois par tour, même si elle reçoit de nouveau Protection. Plusieurs valeurs de Protection ne se cumulent pas : seule la valeur la plus élevée s’applique.'],
    ['🪨 Armure X', 'Chaque fois qu’une créature avec Armure X devrait subir des dégâts, réduisez ces dégâts de X, jusqu’à un minimum de 0. Plusieurs valeurs d’Armure ne se cumulent pas : seule la valeur la plus élevée s’applique. Le Bonus Spirituel Obsidienne donne Armure 1 jusqu’à votre prochain tour.'],
    ['🛡️ Protection + Armure', 'Protection et Armure peuvent coexister sur une même créature. Sur la première source de dégâts du tour, Protection s’applique puis Armure. Protection est alors consommée pour ce tour ; Armure continue de s’appliquer aux sources suivantes. Une perte de PV n’est pas un dégât et n’est réduite ni par Protection ni par Armure.'],
    ['💥 Calcul des dégâts', 'Pour un même événement : dégâts de base → augmentations de dégâts → Protection → Armure → dégâts finaux. Les dégâts supplémentaires augmentent le même événement et conservent la même source : ils ne créent jamais une nouvelle source et ne peuvent pas redéclencher eux-mêmes un effet attendant « la prochaine fois que cette créature subit des dégâts ».'],
    ['😴 Épuisement', 'Une créature qui attaque devient Épuisée. Une créature Épuisée ne peut pas bloquer pendant le prochain tour adverse. Au début de votre tour, toutes vos créatures sont redressées.'],
    ['☀️ Redressement', 'Redresser une créature retire son état Épuisée. Cela ne crée jamais une nouvelle phase d’attaque et ne permet jamais à une créature d’attaquer une seconde fois pendant le même tour. Une créature redressée pendant la phase d’attaque adverse après la déclaration des bloqueurs ne peut pas devenir rétroactivement bloqueuse.'],
    ['🩸 Blessée', 'Une créature est Blessée si elle a subi au moins 1 dégât pendant le tour et se trouve toujours sur le terrain. Les dégâts sur les créatures sont effacés à la fin du tour.'],
    ['💀 Mort & Réincarnation', 'Quand une créature Physique meurt, sa Réincarnation se résout puis elle va au cimetière. Une carte sur le Plan Spirituel ne déclenche pas de Réincarnation simplement parce qu’elle quitte ce plan, sauf si le texte d’une carte dit explicitement le contraire. Entre deux attaques, les morts et Réincarnations sont entièrement résolues avant de passer à l’attaque suivante.'],
    ['🧩 Résolution des effets', 'Lorsqu’un effet commence à se résoudre, terminez tout son texte avant de traiter les morts et Réincarnations qu’il a provoquées, puis passez à l’action suivante.'],
    ['🔥 Sacrifice', 'Sacrifier une créature Physique la fait mourir volontairement et déclenche normalement sa Réincarnation, sauf indication contraire.'],
    ['🔄 Tour', 'Ordre : effets de début de tour → redressement → pioche → augmentation du Flux de base → Phase principale 1 → attaque → Phase principale 2 → fin de tour. En fin de tour, les effets « ce tour » expirent, les dégâts des créatures sont effacés et le Flux inutilisé est perdu.'],
  ];
  return <section className="page-panel"><div className="eyebrow">RÈGLES · V0.1.12 VALIDÉES</div><h2>Fondations actuelles</h2><p className="intro">Cette référence inclut désormais Braise, Écryme, Soléane, Umbra et Obsidienne complètes à 20/20. V0.1.12 ajoute Armure X, Fracture et les clarifications de résolution nécessaires après l’audit des 100 cartes : ordre Bonus Spirituel → effet propre, dégâts supplémentaires de même source, interaction Protection/Armure et calcul d’Impact après réductions.</p><div className="rule-list">{rules.map(([title,body]) => <div className="rule-card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>;
}

function About() {
  return <section className="page-panel"><div className="eyebrow">CARD LAB · V0.1.12</div><h2>Laboratoire du TCG</h2><p className="intro">Les cinq affinités principales Braise, Écryme, Soléane, Umbra et Obsidienne sont désormais complètes et validées à 20/20 cartes chacune. V0.1.12 injecte Obsidienne 81–100, corrige E023 et U066, formalise Armure X et verrouille les interactions dégâts / Protection / Armure / Impact. Brume 101–114 reste volontairement un pool de travail à auditer avant de compléter 101–120. Les visuels HD Braise 01 à 05 restent intégrés.</p><div className="roadmap"><div className="done"><b>V0.1</b><span>Collection + fiches + règles</span></div><div><b>V0.2</b><span>Deck Builder 40 cartes</span></div><div><b>V0.3</b><span>Table de jeu locale</span></div><div><b>V0.4</b><span>Moteur de règles</span></div><div><b>V0.5</b><span>Statistiques de playtest</span></div></div></section>;
}

export default App;
