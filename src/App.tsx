import { useEffect, useMemo, useRef, useState } from 'react';
import { cards } from './data/cards';
import { rules } from './data/rules';
import type { Affinity, Card, CardStatus, CardType, Rarity } from './types';

type AppTab = 'home' | 'collection' | 'decks' | 'play' | 'rules';
type DetailTab = 'physical' | 'spiritual' | 'reincarnation';
type ArtPlan = 'physical' | 'spiritual';
type CollectionView = 'grid' | 'list';
type SortMode = 'number' | 'name' | 'cost';

type DeckItem = { cardId: string; quantity: number };
type Deck = { id: string; name: string; items: DeckItem[]; createdAt: string; updatedAt: string };

const DECK_STORAGE_KEY = 'outremonde.deckbuilder.v1';
const ACTIVE_DECK_KEY = 'outremonde.deckbuilder.active';

const createDeckId = () => globalThis.crypto?.randomUUID?.() ?? `deck-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const deckTotal = (deck: Deck) => deck.items.reduce((sum, item) => sum + item.quantity, 0);

function loadDecks(): Deck[] {
  try {
    const raw = localStorage.getItem(DECK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((deck: Partial<Deck>) => ({
      id: typeof deck.id === 'string' ? deck.id : createDeckId(),
      name: typeof deck.name === 'string' && deck.name.trim() ? deck.name.trim() : 'Deck sans nom',
      createdAt: typeof deck.createdAt === 'string' ? deck.createdAt : new Date().toISOString(),
      updatedAt: typeof deck.updatedAt === 'string' ? deck.updatedAt : new Date().toISOString(),
      items: Array.isArray(deck.items) ? deck.items
        .filter((item): item is DeckItem => !!item && typeof item.cardId === 'string' && typeof item.quantity === 'number' && cards.some(card => card.id === item.cardId))
        .map(item => ({ cardId: item.cardId, quantity: Math.max(1, Math.min(3, Math.floor(item.quantity))) })) : [],
    }));
  } catch {
    return [];
  }
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

type IconName = AppTab | 'search' | 'filter' | 'close' | 'sword' | 'shield' | 'spark' | 'chevron' | 'cards' | 'status' | 'arrow';

const affinities: Array<'Toutes' | Affinity> = ['Toutes', 'Braise', 'Écryme', 'Soléane', 'Umbra', 'Obsidienne', 'Brume'];
const rarities: Array<'Toutes' | Rarity> = ['Toutes', 'Commune', 'Peu Commune', 'Rare', 'Mythique'];
const statuses: Array<'Tous' | CardStatus> = ['Tous', 'Validée', 'À revoir', 'Draft'];
const types: Array<'Tous' | CardType> = ['Tous', 'Créature', 'Rituel Physique', 'Rituel Spirituel', 'Permanent Spirituel'];

const affinityMeta: Record<Affinity, { sigil: string; short: string; label: string; motif: string }> = {
  Braise: { sigil: 'BR', short: 'Braise', label: 'Aggression · sacrifice · pression', motif: '✦' },
  Écryme: { sigil: 'ÉC', short: 'Écryme', label: 'Drain · Flux · attrition', motif: '◆' },
  Soléane: { sigil: 'SO', short: 'Soléane', label: 'Protection · défense · redressement', motif: '☼' },
  Umbra: { sigil: 'UM', short: 'Umbra', label: 'Évasion · affaiblissement · illusion', motif: '◐' },
  Obsidienne: { sigil: 'OB', short: 'Obsidienne', label: 'Armure · endurance · punition', motif: '⬢' },
  Brume: { sigil: 'BRM', short: 'Brume', label: 'Intuition · flexibilité · contrôle léger', motif: '∞' },
};

const navItems: Array<{ id: AppTab; label: string; kicker: string }> = [
  { id: 'home', label: 'Accueil', kicker: 'Vue d’ensemble' },
  { id: 'collection', label: 'Collection', kicker: '121 cartes jouables' },
  { id: 'decks', label: 'Decks', kicker: 'Constructeur actif' },
  { id: 'play', label: 'Jouer', kicker: 'Table de jeu à venir' },
  { id: 'rules', label: 'Règles', kicker: 'Référence V0.1.17' },
];

const cardReference = (card: Card) => card.isPromo ? `PROMO · ${card.promoCode ?? card.id}` : `#${String(card.setNumber).padStart(3, '0')}`;
const affinityClass = (affinity: Affinity) => `affinity-${affinity.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()}`;

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (name === 'home') return <svg {...common}><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5.5h5V20"/></svg>;
  if (name === 'collection' || name === 'cards') return <svg {...common}><rect x="4" y="3" width="13" height="17" rx="2"/><path d="m8 7 5 0M8 11h5M8 15h3"/><path d="M17 7h3v13H8"/></svg>;
  if (name === 'decks') return <svg {...common}><path d="m5 5 12-2 2 14-12 2z"/><path d="m5 8-2 1 4 12 11-4"/></svg>;
  if (name === 'play') return <svg {...common}><path d="M8 5.5v13l10-6.5z"/></svg>;
  if (name === 'rules') return <svg {...common}><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>;
  if (name === 'filter') return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4"/></svg>;
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
  if (name === 'sword') return <svg {...common}><path d="m14.5 4.5 5-1-1 5-9 9-3-3z"/><path d="m8 16-3.5 3.5M5 14l5 5"/></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 3 5.5 5.5v5.8c0 4.4 2.6 7.5 6.5 9.7 3.9-2.2 6.5-5.3 6.5-9.7V5.5z"/></svg>;
  if (name === 'spark') return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
  if (name === 'status') return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
  return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
}

function AffinitySigil({ affinity, compact = false }: { affinity: Affinity; compact?: boolean }) {
  return <span className={`affinity-sigil ${affinityClass(affinity)} ${compact ? 'compact' : ''}`} aria-label={affinity}><span>{affinityMeta[affinity].sigil}</span></span>;
}

function App() {
  const [tab, setTab] = useState<AppTab>('home');
  const [query, setQuery] = useState('');
  const [affinity, setAffinity] = useState<'Toutes' | Affinity>('Toutes');
  const [rarity, setRarity] = useState<'Toutes' | Rarity>('Toutes');
  const [status, setStatus] = useState<'Tous' | CardStatus>('Tous');
  const [type, setType] = useState<'Tous' | CardType>('Tous');
  const [sort, setSort] = useState<SortMode>('number');
  const [view, setView] = useState<CollectionView>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Card | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('physical');
  const [artPlan, setArtPlan] = useState<ArtPlan>('physical');
  const [artFullscreen, setArtFullscreen] = useState(false);

  const coreCards = useMemo(() => cards.filter(card => !card.isPromo), []);
  const promoCards = useMemo(() => cards.filter(card => card.isPromo), []);
  const gaellix = useMemo(() => cards.find(card => card.id === 'P-GAELLIX'), []);
  const validatedCount = useMemo(() => cards.filter(card => card.status === 'Validée').length, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = cards.filter((card) => {
      const haystack = `${card.name} ${card.id} ${card.setNumber ?? ''} ${card.promoCode ?? ''} ${card.affinity} ${card.type} ${card.rarity} ${(card.keywords ?? []).join(' ')}`.toLowerCase();
      return (!q || haystack.includes(q))
        && (affinity === 'Toutes' || card.affinity === affinity)
        && (rarity === 'Toutes' || card.rarity === rarity)
        && (status === 'Tous' || card.status === status)
        && (type === 'Tous' || card.type === type);
    });
    return result.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'fr');
      if (sort === 'cost') return a.cost - b.cost || (a.setNumber ?? 999) - (b.setNumber ?? 999);
      return (a.isPromo ? 1 : 0) - (b.isPromo ? 1 : 0) || (a.setNumber ?? 999) - (b.setNumber ?? 999);
    });
  }, [query, affinity, rarity, status, type, sort]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (artFullscreen) setArtFullscreen(false);
        else if (selected) setSelected(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, artFullscreen]);

  useEffect(() => {
    document.body.style.overflow = selected || artFullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected, artFullscreen]);

  const openCard = (card: Card) => {
    setSelected(card);
    setArtFullscreen(false);
    if (card.art?.physical) setArtPlan('physical');
    else if (card.art?.spiritual) setArtPlan('spiritual');
    if (card.physical) setDetailTab('physical');
    else if (card.spiritualBonus || card.spiritualEffect) setDetailTab('spiritual');
    else setDetailTab('reincarnation');
  };

  const navigate = (next: AppTab) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setQuery(''); setAffinity('Toutes'); setRarity('Toutes'); setStatus('Tous'); setType('Tous'); setSort('number');
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <aside className="side-rail">
        <BrandMark />
        <nav className="side-nav" aria-label="Navigation principale">
          {navItems.map(item => (
            <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
              <span className="nav-icon"><Icon name={item.id} /></span>
              <span><b>{item.label}</b><small>{item.kicker}</small></span>
            </button>
          ))}
        </nav>
        <div className="rail-status">
          <span className="pulse-dot" />
          <div><b>Core Set V1</b><small>V0.1.21 · Deck Builder</small></div>
        </div>
      </aside>

      <div className="app-stage">
        <header className="topbar">
          <div className="mobile-brand"><BrandMark compact /></div>
          <div className="page-title">
            <div className="eyebrow">OUTREMONDE · CARD LAB</div>
            <h1>{navItems.find(item => item.id === tab)?.label}</h1>
          </div>
          <div className="topbar-actions">
            <button className="version-pill" onClick={() => navigate('rules')}><span className="pulse-dot" />V0.1.20</button>
          </div>
        </header>

        <main className="main-content">
          {tab === 'home' && <Home onNavigate={navigate} onOpenCard={openCard} coreCount={coreCards.length} promoCount={promoCards.length} validatedCount={validatedCount} gaellix={gaellix} />}
          {tab === 'collection' && (
            <Collection
              filtered={filtered} query={query} setQuery={setQuery}
              affinity={affinity} setAffinity={setAffinity}
              rarity={rarity} setRarity={setRarity}
              status={status} setStatus={setStatus}
              type={type} setType={setType}
              sort={sort} setSort={setSort}
              view={view} setView={setView}
              filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
              resetFilters={resetFilters} openCard={openCard}
            />
          )}
          {tab === 'decks' && <DeckBuilder onNavigate={navigate} openCard={openCard} />}
          {tab === 'play' && <PlayPreview onNavigate={navigate} />}
          {tab === 'rules' && <RulesPage />}
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Navigation mobile">
        {navItems.map(item => (
          <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
            <Icon name={item.id} size={20} /><span>{item.label}</span>
          </button>
        ))}
      </nav>

      {selected && <CardDetail card={selected} onClose={() => setSelected(null)} detailTab={detailTab} setDetailTab={setDetailTab} artPlan={artPlan} setArtPlan={setArtPlan} onFullscreen={() => setArtFullscreen(true)} />}
      {selected?.art && artFullscreen && (
        <div className="art-lightbox" onClick={() => setArtFullscreen(false)}>
          <button className="icon-button lightbox-close" onClick={() => setArtFullscreen(false)}><Icon name="close" /></button>
          <img onClick={event => event.stopPropagation()} src={artPlan === 'physical' ? selected.art.physical : selected.art.spiritual} alt={`${selected.name} — ${artPlan === 'physical' ? 'Physique' : 'Spirituel'}`} />
          <div className="lightbox-caption"><span>{selected.name}</span><small>{artPlan === 'physical' ? 'Plan Physique' : 'Plan Spirituel'} · {cardReference(selected)}</small></div>
        </div>
      )}
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-mark ${compact ? 'compact' : ''}`}>
    <span className="brand-glyph"><i /><i /><i /></span>
    {!compact && <span className="brand-copy"><b>OUTREMONDE</b><small>CARD LAB</small></span>}
  </div>;
}

function Home({ onNavigate, onOpenCard, coreCount, promoCount, validatedCount, gaellix }: { onNavigate: (tab: AppTab) => void; onOpenCard: (card: Card) => void; coreCount: number; promoCount: number; validatedCount: number; gaellix?: Card }) {
  const counts = useMemo(() => Object.fromEntries((Object.keys(affinityMeta) as Affinity[]).map(a => [a, cards.filter(card => card.affinity === a && !card.isPromo).length])) as Record<Affinity, number>, []);
  return <div className="page-stack home-page">
    <section className="hero-premium panel-glow">
      <div className="hero-copy">
        <span className="section-kicker">CORE SET V1 · FORGE ACTIVE</span>
        <h2>Le laboratoire devient<br /><em>un vrai client Outremonde.</em></h2>
        <p>Une interface reconstruite pour la collection, le Deck Builder actif et la future table de jeu. Les données du Core restent intactes ; seule l’expérience évolue.</p>
        <div className="hero-actions">
          <button className="primary-cta" onClick={() => onNavigate('collection')}>Explorer la collection <Icon name="arrow" size={17} /></button>
          <button className="secondary-cta" onClick={() => onNavigate('play')}>Aperçu du terrain</button>
        </div>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
        <div className="orbit-core"><span>OUTRE</span><b>MONDE</b><small>VI LUEURS</small></div>
        {(Object.keys(affinityMeta) as Affinity[]).map((a, index) => <span key={a} className={`orbit-sigil orbit-${index + 1} ${affinityClass(a)}`}>{affinityMeta[a].sigil}</span>)}
      </div>
    </section>

    <section className="metric-grid">
      <Metric value={coreCount} label="Cartes Core" hint="001 — 120" />
      <Metric value={validatedCount} label="Cartes validées" hint="Référence injectée" />
      <Metric value={promoCount} label="Promo jouable" hint="Gaellix hors-série" />
      <Metric value="6" label="Affinités" hint="Libre mélange" />
    </section>

    <div className="dashboard-grid">
      <section className="surface affinity-overview">
        <SectionHeading kicker="SIX LUEURS" title="Identités du Core" action="Collection" onAction={() => onNavigate('collection')} />
        <div className="affinity-list">
          {(Object.keys(affinityMeta) as Affinity[]).map(a => (
            <button key={a} className="affinity-row" onClick={() => onNavigate('collection')}>
              <AffinitySigil affinity={a} compact />
              <span><b>{a}</b><small>{affinityMeta[a].label}</small></span>
              <strong>{counts[a]}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="surface promo-spotlight">
        <SectionHeading kicker="PROMO · ÉDITION LÉGENDAIRE" title="Gaellix" />
        {gaellix && <>
          <div className="promo-portrait">
            <CardVisual card={gaellix} large />
          </div>
          <div className="spotlight-copy"><span>Brume · Mythique · 4 Flux</span><p>Une promo hors numérotation, pleinement jouable et soumise à la limite standard de 3 exemplaires.</p></div>
          <button className="wide-cta" onClick={() => onOpenCard(gaellix)}>Ouvrir la fiche <Icon name="arrow" size={16} /></button>
        </>}
      </section>
    </div>

    <section className="surface roadmap-strip">
      <SectionHeading kicker="FEUILLE DE ROUTE" title="Du laboratoire au jeu" />
      <div className="roadmap-steps">
        <RoadmapStep index="01" title="Interface" text="Refonte premium et architecture mobile" />
        <RoadmapStep index="02" title="Deck Builder" text="40 cartes, max 3 exemplaires" state="active" />
        <RoadmapStep index="03" title="Playtest" text="Main, mulligan, Flux et tirages" />
        <RoadmapStep index="04" title="Table" text="Terrain Physique & Spirituel" />
      </div>
    </section>
  </div>;
}

function Metric({ value, label, hint }: { value: string | number; label: string; hint: string }) {
  return <div className="metric surface"><strong>{value}</strong><span>{label}</span><small>{hint}</small></div>;
}

function SectionHeading({ kicker, title, action, onAction }: { kicker: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading"><div><span>{kicker}</span><h3>{title}</h3></div>{action && <button onClick={onAction}>{action}<Icon name="chevron" size={14} /></button>}</div>;
}

function RoadmapStep({ index, title, text, state }: { index: string; title: string; text: string; state?: 'active' }) {
  return <div className={`roadmap-step ${state ?? ''}`}><span>{index}</span><div><b>{title}</b><small>{text}</small></div></div>;
}

function Collection(props: {
  filtered: Card[]; query: string; setQuery: (v: string) => void;
  affinity: 'Toutes' | Affinity; setAffinity: (v: 'Toutes' | Affinity) => void;
  rarity: 'Toutes' | Rarity; setRarity: (v: 'Toutes' | Rarity) => void;
  status: 'Tous' | CardStatus; setStatus: (v: 'Tous' | CardStatus) => void;
  type: 'Tous' | CardType; setType: (v: 'Tous' | CardType) => void;
  sort: SortMode; setSort: (v: SortMode) => void;
  view: CollectionView; setView: (v: CollectionView) => void;
  filtersOpen: boolean; setFiltersOpen: (v: boolean) => void;
  resetFilters: () => void; openCard: (card: Card) => void;
}) {
  const activeFilterCount = [props.affinity !== 'Toutes', props.rarity !== 'Toutes', props.status !== 'Tous', props.type !== 'Tous'].filter(Boolean).length;
  return <div className="page-stack collection-page">
    <section className="collection-intro">
      <div><span className="section-kicker">ARCHIVES DE L’OUTREMONDE</span><h2>Collection</h2><p>120 cartes du Core Set V1 + Gaellix, promo hors-série. Recherche, tri et filtres travaillent directement sur la base injectée.</p></div>
      <div className="collection-count"><strong>{props.filtered.length}</strong><span>résultats</span></div>
    </section>

    <section className="collection-tools surface">
      <div className="search-field"><Icon name="search" size={18} /><input value={props.query} onChange={e => props.setQuery(e.target.value)} placeholder="Nom, numéro, mot-clé, affinité…" />{props.query && <button onClick={() => props.setQuery('')}><Icon name="close" size={15} /></button>}</div>
      <button className={`filter-button ${props.filtersOpen || activeFilterCount ? 'active' : ''}`} onClick={() => props.setFiltersOpen(!props.filtersOpen)}><Icon name="filter" size={17} />Filtres{activeFilterCount > 0 && <span>{activeFilterCount}</span>}</button>
      <div className="view-toggle" aria-label="Mode d’affichage"><button className={props.view === 'grid' ? 'active' : ''} onClick={() => props.setView('grid')}>▦</button><button className={props.view === 'list' ? 'active' : ''} onClick={() => props.setView('list')}>☷</button></div>
      {props.filtersOpen && <div className="filter-drawer">
        <label><span>Rareté</span><select value={props.rarity} onChange={e => props.setRarity(e.target.value as typeof props.rarity)}>{rarities.map(v => <option key={v}>{v}</option>)}</select></label>
        <label><span>Type</span><select value={props.type} onChange={e => props.setType(e.target.value as typeof props.type)}>{types.map(v => <option key={v}>{v}</option>)}</select></label>
        <label><span>Statut</span><select value={props.status} onChange={e => props.setStatus(e.target.value as typeof props.status)}>{statuses.map(v => <option key={v}>{v}</option>)}</select></label>
        <label><span>Trier par</span><select value={props.sort} onChange={e => props.setSort(e.target.value as SortMode)}><option value="number">Numéro</option><option value="name">Nom</option><option value="cost">Coût</option></select></label>
        <button className="reset-button" onClick={props.resetFilters}>Réinitialiser</button>
      </div>}
    </section>

    <div className="affinity-chips horizontal-scroll">
      {affinities.map(a => <button key={a} className={`${props.affinity === a ? 'active' : ''} ${a !== 'Toutes' ? affinityClass(a) : ''}`} onClick={() => props.setAffinity(a)}>{a !== 'Toutes' && <span className="chip-dot" />}{a}</button>)}
    </div>

    {props.filtered.length > 0 ? <section className={`cards-layout ${props.view}`}>
      {props.filtered.map(card => <CardTile key={card.id} card={card} onOpen={props.openCard} view={props.view} />)}
    </section> : <div className="empty-state surface"><span className="empty-rune">∅</span><h3>Aucune carte trouvée</h3><p>Modifiez la recherche ou réinitialisez les filtres.</p><button onClick={props.resetFilters}>Réinitialiser</button></div>}
  </div>;
}

function CardTile({ card, onOpen, view }: { card: Card; onOpen: (card: Card) => void; view: CollectionView }) {
  if (view === 'list') return <button className={`card-list-row surface ${affinityClass(card.affinity)} ${card.isPromo ? 'promo' : ''}`} onClick={() => onOpen(card)}>
    <AffinitySigil affinity={card.affinity} compact />
    <span className="list-main"><small>{cardReference(card)} · {card.rarity}{card.edition ? ` · ${card.edition}` : ''}</small><b>{card.name}</b><em>{card.affinity} · {card.type}</em></span>
    {card.type === 'Créature' && <span className="list-stats"><i><Icon name="sword" size={14} />{card.atk}</i><i><Icon name="shield" size={14} />{card.def}</i></span>}
    <span className="flux-orb small"><b>{card.cost}</b><small>Flux</small></span>
    <Icon name="chevron" size={18} />
  </button>;

  return <button className={`card-tile-premium ${affinityClass(card.affinity)} ${card.isPromo ? 'promo-card' : ''}`} onClick={() => onOpen(card)}>
    <div className="tile-topline"><span>{cardReference(card)}</span><span className={`rarity-mark rarity-${card.rarity.toLowerCase().replace(' ', '-')}`}>{card.rarity === 'Mythique' ? '✦' : card.rarity === 'Rare' ? '◆' : '◇'}</span></div>
    <CardVisual card={card} />
    <div className="tile-copy">
      <div className="tile-affinity"><AffinitySigil affinity={card.affinity} compact /><span>{card.affinity}</span></div>
      <h3>{card.name}</h3>
      <p>{card.type}</p>
      <div className="tile-footer">
        {card.type === 'Créature' ? <div className="mini-stats"><span><Icon name="sword" size={13} />{card.atk}</span><span><Icon name="shield" size={13} />{card.def}</span></div> : <span className="type-pill">{card.rarity}</span>}
        <span className="flux-orb small"><b>{card.cost}</b><small>Flux</small></span>
      </div>
    </div>
  </button>;
}

function CardVisual({ card, large = false }: { card: Card; large?: boolean }) {
  const art = card.art?.physical;
  return <div className={`card-visual ${affinityClass(card.affinity)} ${large ? 'large' : ''}`}>
    {art ? <img src={art} alt={`${card.name} — visuel Physique`} loading="lazy" /> : <>
      <div className="visual-mist mist-a" /><div className="visual-mist mist-b" />
      <div className="visual-rune">{affinityMeta[card.affinity].motif}</div>
      <div className="visual-sigil"><AffinitySigil affinity={card.affinity} /></div>
      {card.isPromo && <span className="legendary-crown">ÉDITION LÉGENDAIRE</span>}
    </>}
  </div>;
}

function CardDetail({ card, onClose, detailTab, setDetailTab, artPlan, setArtPlan, onFullscreen }: { card: Card; onClose: () => void; detailTab: DetailTab; setDetailTab: (v: DetailTab) => void; artPlan: ArtPlan; setArtPlan: (v: ArtPlan) => void; onFullscreen: () => void }) {
  const currentArt = artPlan === 'physical' ? card.art?.physical : card.art?.spiritual;
  return <div className="modal-backdrop" onClick={onClose}>
    <article className={`card-detail ${affinityClass(card.affinity)} ${card.isPromo ? 'promo-detail' : ''}`} onClick={e => e.stopPropagation()}>
      <button className="icon-button detail-close" onClick={onClose}><Icon name="close" /></button>
      <div className="detail-layout">
        <section className="detail-visual-column">
          <div className="detail-card-preview">
            {currentArt ? <button className="detail-art" onClick={onFullscreen}><img src={currentArt} alt={`${card.name} — ${artPlan}`} /></button> : <CardVisual card={card} large />}
          </div>
          {card.art && <div className="plan-toggle">{card.art.physical && <button className={artPlan === 'physical' ? 'active' : ''} onClick={() => setArtPlan('physical')}>Physique</button>}{card.art.spiritual && <button className={artPlan === 'spiritual' ? 'active' : ''} onClick={() => setArtPlan('spiritual')}>Spirituel</button>}</div>}
        </section>

        <section className="detail-info-column">
          <div className="detail-reference"><span>{cardReference(card)}</span><span>{card.rarity}{card.edition ? ` · ${card.edition}` : ''}</span></div>
          <div className="detail-title-row"><div><div className="detail-affinity"><AffinitySigil affinity={card.affinity} compact />{card.affinity}</div><h2>{card.name}</h2><p>{card.type} · {affinityMeta[card.affinity].label}</p></div><span className="flux-orb"><b>{card.cost}</b><small>Flux</small></span></div>

          <div className="detail-stats">
            {card.type === 'Créature' && <><span><Icon name="sword" size={16} /><b>{card.atk}</b><small>ATK</small></span><span><Icon name="shield" size={16} /><b>{card.def}</b><small>DEF</small></span></>}
            <span><Icon name="status" size={16} /><b>{card.status}</b><small>Statut</small></span>
          </div>

          <div className="effect-tabs">
            {card.physical && <button className={detailTab === 'physical' ? 'active' : ''} onClick={() => { setDetailTab('physical'); if (card.art?.physical) setArtPlan('physical'); }}><Icon name="sword" size={15} />Physique</button>}
            {(card.spiritualBonus || card.spiritualEffect) && <button className={detailTab === 'spiritual' ? 'active' : ''} onClick={() => { setDetailTab('spiritual'); if (card.art?.spiritual) setArtPlan('spiritual'); }}><Icon name="spark" size={15} />Spirituel</button>}
            {card.reincarnation && <button className={detailTab === 'reincarnation' ? 'active' : ''} onClick={() => setDetailTab('reincarnation')}>↻ Réincarnation</button>}
          </div>

          <div className="effect-sheet">
            {detailTab === 'physical' && card.physical && <EffectBlock label="Effet Physique" body={card.physical} />}
            {detailTab === 'spiritual' && <>
              {card.spiritualBonus && <EffectBlock label="Bonus Spirituel" body={card.spiritualBonus} />}
              {card.spiritualEffect && <EffectBlock label="Effet Spirituel" body={card.spiritualEffect} secondary />}
              <div className="rules-reminder">Bonus d’affinité : 1 déclenchement maximum par affinité et par tour. L’effet Spirituel propre se résout à l’arrivée, sauf texte permanent.</div>
            </>}
            {detailTab === 'reincarnation' && card.reincarnation && <EffectBlock label="Réincarnation" body={card.reincarnation} />}
          </div>

          {card.keywords?.length ? <div className="keyword-row">{card.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}</div> : null}
          {card.note && <div className="note-panel"><span>NOTE DE LAB</span><p>{card.note}</p></div>}
        </section>
      </div>
    </article>
  </div>;
}

function EffectBlock({ label, body, secondary = false }: { label: string; body: string; secondary?: boolean }) {
  return <div className={`effect-block ${secondary ? 'secondary' : ''}`}><span>{label}</span><p>{body}</p></div>;
}

function DeckBuilder({ onNavigate, openCard }: { onNavigate: (tab: AppTab) => void; openCard: (card: Card) => void }) {
  const [decks, setDecks] = useState<Deck[]>(loadDecks);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(() => { try { return localStorage.getItem(ACTIVE_DECK_KEY); } catch { return null; } });
  const [query, setQuery] = useState('');
  const [affinity, setAffinity] = useState<'Toutes' | Affinity>('Toutes');
  const [type, setType] = useState<'Tous' | CardType>('Tous');
  const [toast, setToast] = useState('');
  const importInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
      if (activeDeckId) localStorage.setItem(ACTIVE_DECK_KEY, activeDeckId);
      else localStorage.removeItem(ACTIVE_DECK_KEY);
    } catch { /* stockage indisponible : l'UI reste utilisable pour la session */ }
  }, [decks, activeDeckId]);

  useEffect(() => {
    if (decks.length === 0) { setActiveDeckId(null); return; }
    if (!activeDeckId || !decks.some(deck => deck.id === activeDeckId)) setActiveDeckId(decks[0].id);
  }, [decks, activeDeckId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeDeck = decks.find(deck => deck.id === activeDeckId) ?? null;
  const quantities = useMemo(() => new Map((activeDeck?.items ?? []).map(item => [item.cardId, item.quantity])), [activeDeck]);
  const total = activeDeck ? deckTotal(activeDeck) : 0;
  const valid = !!activeDeck && total === 40 && activeDeck.items.every(item => item.quantity >= 1 && item.quantity <= 3);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter(card => {
      const haystack = `${card.name} ${card.id} ${card.promoCode ?? ''} ${card.affinity} ${card.type} ${card.rarity} ${(card.keywords ?? []).join(' ')}`.toLowerCase();
      return (!q || haystack.includes(q)) && (affinity === 'Toutes' || card.affinity === affinity) && (type === 'Tous' || card.type === type);
    }).sort((a, b) => a.cost - b.cost || (a.setNumber ?? 999) - (b.setNumber ?? 999));
  }, [query, affinity, type]);

  const deckCards = useMemo(() => (activeDeck?.items ?? []).map(item => ({ ...item, card: cards.find(card => card.id === item.cardId)! })).filter(entry => entry.card), [activeDeck]);
  const affinityCounts = useMemo(() => {
    const result = Object.fromEntries((Object.keys(affinityMeta) as Affinity[]).map(a => [a, 0])) as Record<Affinity, number>;
    deckCards.forEach(({ card, quantity }) => { result[card.affinity] += quantity; });
    return result;
  }, [deckCards]);
  const typeCounts = useMemo(() => {
    const result: Record<string, number> = {};
    deckCards.forEach(({ card, quantity }) => { result[card.type] = (result[card.type] ?? 0) + quantity; });
    return result;
  }, [deckCards]);
  const costCounts = useMemo(() => {
    const maxCost = Math.max(5, ...deckCards.map(({ card }) => card.cost));
    return Array.from({ length: maxCost + 1 }, (_, cost) => ({ cost, count: deckCards.filter(({ card }) => card.cost === cost).reduce((sum, entry) => sum + entry.quantity, 0) }));
  }, [deckCards]);

  const patchActive = (updater: (deck: Deck) => Deck) => {
    if (!activeDeckId) return;
    setDecks(current => current.map(deck => deck.id === activeDeckId ? { ...updater(deck), updatedAt: new Date().toISOString() } : deck));
  };

  const createDeck = () => {
    const now = new Date().toISOString();
    const deck: Deck = { id: createDeckId(), name: `Deck ${decks.length + 1}`, items: [], createdAt: now, updatedAt: now };
    setDecks(current => [...current, deck]); setActiveDeckId(deck.id); setToast('Nouveau deck créé');
  };

  const changeQuantity = (cardId: string, delta: number) => {
    if (!activeDeckId || delta === 0) return;
    setDecks(current => current.map(deck => {
      if (deck.id !== activeDeckId) return deck;
      const currentQty = deck.items.find(item => item.cardId === cardId)?.quantity ?? 0;
      const currentTotal = deckTotal(deck);
      if (delta > 0 && (currentQty >= 3 || currentTotal >= 40)) return deck;

      const nextQty = Math.max(0, Math.min(3, currentQty + delta));
      if (nextQty === currentQty) return deck;

      const items = deck.items.filter(item => item.cardId !== cardId);
      if (nextQty > 0) items.push({ cardId, quantity: nextQty });
      return { ...deck, items, updatedAt: new Date().toISOString() };
    }));
  };

  const duplicateDeck = () => {
    if (!activeDeck) return;
    const now = new Date().toISOString();
    const duplicate: Deck = { ...activeDeck, id: createDeckId(), name: `${activeDeck.name} — copie`, items: activeDeck.items.map(item => ({ ...item })), createdAt: now, updatedAt: now };
    setDecks(current => [...current, duplicate]); setActiveDeckId(duplicate.id); setToast('Deck dupliqué');
  };

  const deleteDeck = () => {
    if (!activeDeck || !window.confirm(`Supprimer « ${activeDeck.name} » ?`)) return;
    setDecks(current => current.filter(deck => deck.id !== activeDeck.id)); setToast('Deck supprimé');
  };

  const exportDeck = () => {
    if (!activeDeck) return;
    const payload = { format: 'outremonde-deck-v1', appVersion: '0.1.21', name: activeDeck.name, items: activeDeck.items };
    const safe = activeDeck.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'deck';
    downloadText(`${safe}.outremonde.json`, JSON.stringify(payload, null, 2));
    setToast('Deck exporté');
  };

  const copyDeck = async () => {
    if (!activeDeck) return;
    const payload = JSON.stringify({ format: 'outremonde-deck-v1', name: activeDeck.name, items: activeDeck.items });
    try { await navigator.clipboard.writeText(payload); setToast('Code du deck copié'); }
    catch { setToast('Copie indisponible sur cet appareil'); }
  };

  const installImportedDeck = (parsed: { format?: string; name?: string; items?: unknown[] }) => {
    if (!parsed || parsed.format !== 'outremonde-deck-v1' || !Array.isArray(parsed.items)) throw new Error('format');
    const merged = new Map<string, number>();
    for (const raw of parsed.items) {
      const item = raw as Partial<DeckItem>;
      const cardId = String(item.cardId ?? '');
      const quantity = Number(item.quantity);
      if (!cards.some(card => card.id === cardId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 3) throw new Error('cards');
      const next = (merged.get(cardId) ?? 0) + quantity;
      if (next > 3) throw new Error('copies');
      merged.set(cardId, next);
    }
    const items: DeckItem[] = Array.from(merged, ([cardId, quantity]) => ({ cardId, quantity }));
    if (items.reduce((sum, item) => sum + item.quantity, 0) > 40) throw new Error('total');
    const now = new Date().toISOString();
    const deck: Deck = { id: createDeckId(), name: typeof parsed.name === 'string' && parsed.name.trim() ? parsed.name.trim() : 'Deck importé', items, createdAt: now, updatedAt: now };
    setDecks(current => [...current, deck]); setActiveDeckId(deck.id); setToast('Deck importé');
  };

  const importDeck = async (file: File) => {
    try { installImportedDeck(JSON.parse(await file.text())); }
    catch { window.alert('Import impossible : fichier Outremonde invalide, carte inconnue, plus de 3 exemplaires ou plus de 40 cartes.'); }
    finally { if (importInput.current) importInput.current.value = ''; }
  };

  const importDeckCode = () => {
    const code = window.prompt('Collez le code JSON du deck Outremonde :');
    if (!code) return;
    try { installImportedDeck(JSON.parse(code)); }
    catch { window.alert('Code de deck invalide ou non conforme aux limites du Deck Builder.'); }
  };

  return <div className="page-stack deck-builder-page">
    <section className="deck-builder-intro">
      <div><span className="section-kicker">V0.1.21 · FORGE DE DECK</span><h2>Deck Builder</h2><p>Construisez vos listes avec la base injectée : 40 cartes exactement, 3 exemplaires maximum par carte, sauvegarde automatique locale et export/import.</p></div>
      <div className={`deck-validity ${valid ? 'valid' : ''}`}><strong>{total}<span>/40</span></strong><small>{valid ? 'Deck valide' : activeDeck ? `${40 - total} carte${40 - total > 1 ? 's' : ''} restante${40 - total > 1 ? 's' : ''}` : 'Aucun deck'}</small></div>
    </section>

    <section className="deck-builder-shell surface">
      <aside className="deck-library">
        <div className="deck-library-head"><div><span>MES DECKS</span><b>{decks.length} sauvegardé{decks.length > 1 ? 's' : ''}</b></div><button onClick={createDeck}>＋</button></div>
        <div className="deck-list">
          {decks.map(deck => <button key={deck.id} className={deck.id === activeDeckId ? 'active' : ''} onClick={() => setActiveDeckId(deck.id)}><span className="deck-list-glyph"><Icon name="decks" size={17} /></span><span><b>{deck.name}</b><small>{deckTotal(deck)}/40 · {deck.items.length} cartes uniques</small></span><i className={deckTotal(deck) === 40 ? 'ready' : ''} /></button>)}
          {decks.length === 0 && <div className="deck-list-empty"><Icon name="decks" size={24} /><b>Aucun deck</b><small>Créez votre première liste.</small></div>}
        </div>
        <button className="new-deck-button" onClick={createDeck}>＋ Nouveau deck</button>
        <div className="local-save-note"><span className="pulse-dot" /><div><b>Sauvegarde auto</b><small>Stockage local de l’appareil</small></div></div>
      </aside>

      <div className="deck-workspace">
        {!activeDeck ? <div className="deck-first-state"><span className="empty-rune">＋</span><h3>Créez votre premier deck</h3><p>Le constructeur sauvegarde automatiquement chaque modification sur cet appareil.</p><button className="primary-cta" onClick={createDeck}>Créer un deck</button></div> : <>
          <div className="deck-editor-head">
            <div className="deck-name-field"><span>NOM DU DECK</span><input value={activeDeck.name} maxLength={48} onChange={e => patchActive(deck => ({ ...deck, name: e.target.value }))} /></div>
            <div className="deck-actions"><button onClick={duplicateDeck}>Dupliquer</button><button onClick={copyDeck}>Copier code</button><button onClick={importDeckCode}>Coller code</button><button onClick={exportDeck}>Exporter</button><button onClick={() => importInput.current?.click()}>Importer</button><button className="danger" onClick={deleteDeck}>Supprimer</button><input ref={importInput} hidden type="file" accept=".json,.outremonde.json,application/json" onChange={e => e.target.files?.[0] && importDeck(e.target.files[0])} /></div>
          </div>

          <div className="deck-summary-row">
            <div className={`deck-progress-card ${valid ? 'valid' : ''}`}><div><span>CONSTRUCTION</span><b>{total} / 40</b></div><div className="deck-progress-track"><i style={{ width: `${Math.min(100, total / 40 * 100)}%` }} /></div><small>{valid ? '✓ Prêt à jouer' : `Il reste ${Math.max(0, 40 - total)} emplacement${40 - total === 1 ? '' : 's'}`}</small></div>
            <div className="deck-rule-card"><span>RÈGLE</span><b>3× maximum</b><small>Par carte, Gaellix comprise</small></div>
            <div className="deck-rule-card"><span>AFFINITÉS</span><b>Libre mélange</b><small>Aucune restriction de couleur</small></div>
          </div>

          <div className="deck-columns">
            <section className="deck-card-pool">
              <div className="deck-section-head"><div><span>COLLECTION</span><h3>Ajouter des cartes</h3></div><small>{filteredCards.length} résultats</small></div>
              <div className="deck-pool-tools"><div className="search-field"><Icon name="search" size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher une carte…" />{query && <button onClick={() => setQuery('')}><Icon name="close" size={14} /></button>}</div><select value={affinity} onChange={e => setAffinity(e.target.value as typeof affinity)}>{affinities.map(value => <option key={value}>{value}</option>)}</select><select value={type} onChange={e => setType(e.target.value as typeof type)}>{types.map(value => <option key={value}>{value}</option>)}</select></div>
              <div className="deck-pool-list">
                {filteredCards.map(card => { const qty = quantities.get(card.id) ?? 0; const addDisabled = qty >= 3 || total >= 40; return <div key={card.id} className={`deck-pool-card ${affinityClass(card.affinity)} ${qty ? 'included' : ''}`}>
                  <button type="button" className="deck-card-info" onClick={() => openCard(card)}><AffinitySigil affinity={card.affinity} compact /><span><small>{cardReference(card)} · {card.rarity}</small><b>{card.name}</b><em>{card.type}</em></span><span className="deck-cost">{card.cost}<small>Flux</small></span></button>
                  <div className="quantity-control"><button type="button" aria-label={`Retirer ${card.name}`} disabled={qty === 0} onClick={() => changeQuantity(card.id, -1)}>−</button><strong>{qty}<span>/3</span></strong><button type="button" className="deck-add-card" aria-label={`Ajouter ${card.name}`} disabled={addDisabled} onClick={() => changeQuantity(card.id, 1)}>{qty === 0 ? 'Ajouter' : '＋'}</button></div>
                </div>; })}
              </div>
            </section>

            <section className="deck-current-list">
              <div className="deck-section-head"><div><span>LISTE ACTIVE</span><h3>{activeDeck.name || 'Deck sans nom'}</h3></div><small>{activeDeck.items.length} cartes uniques</small></div>
              {deckCards.length ? <div className="deck-selected-cards">{deckCards.slice().sort((a,b) => a.card.cost - b.card.cost || a.card.name.localeCompare(b.card.name, 'fr')).map(({ card, quantity }) => <div key={card.id} className={`deck-selected-row ${affinityClass(card.affinity)}`}><button onClick={() => openCard(card)}><AffinitySigil affinity={card.affinity} compact /><span><b>{card.name}</b><small>{card.cost} Flux · {card.type}</small></span></button><div><button type="button" onClick={() => changeQuantity(card.id, -1)}>−</button><strong>{quantity}</strong><button type="button" disabled={quantity >= 3 || total >= 40} onClick={() => changeQuantity(card.id, 1)}>＋</button></div></div>)}</div> : <div className="deck-list-empty large"><span className="empty-rune">∅</span><b>Liste vide</b><small>Ajoutez des cartes depuis la collection.</small></div>}
            </section>
          </div>

          <section className="deck-analysis">
            <div className="deck-section-head"><div><span>ANALYSE</span><h3>Profil du deck</h3></div><small>{valid ? 'Deck légal' : 'Construction en cours'}</small></div>
            <div className="analysis-grid">
              <div className="analysis-panel"><b>Affinités</b><div className="affinity-analysis">{(Object.keys(affinityMeta) as Affinity[]).map(a => <div key={a} className={affinityClass(a)}><span><i style={{ background: 'var(--aff)' }} />{a}</span><strong>{affinityCounts[a]}</strong></div>)}</div></div>
              <div className="analysis-panel"><b>Types</b><div className="type-analysis">{Object.entries(typeCounts).length ? Object.entries(typeCounts).map(([name,count]) => <div key={name}><span>{name}</span><strong>{count}</strong></div>) : <small>Aucune carte</small>}</div></div>
              <div className="analysis-panel curve-panel"><b>Courbe de Flux</b><div className="flux-curve">{costCounts.map(({ cost, count }) => { const max = Math.max(1, ...costCounts.map(item => item.count)); return <div key={cost}><span className="curve-bar"><i style={{ height: `${Math.max(count ? 12 : 2, count / max * 100)}%` }} /></span><strong>{count}</strong><small>{cost}</small></div>; })}</div></div>
            </div>
          </section>
        </>}
      </div>
    </section>

    <div className="deck-footer-actions"><button className="secondary-cta" onClick={() => onNavigate('collection')}>Ouvrir la collection</button><button className="primary-cta" onClick={() => onNavigate('play')} disabled={!valid}>Préparer le playtest <Icon name="arrow" size={16} /></button></div>
    {toast && <div className="app-toast"><span>✓</span>{toast}</div>}
  </div>;
}

function Spec({ title, text }: { title: string; text: string }) { return <div className="spec"><span>✦</span><div><b>{title}</b><small>{text}</small></div></div>; }

function PlayPreview({ onNavigate }: { onNavigate: (tab: AppTab) => void }) {
  return <div className="page-stack future-page">
    <section className="future-hero surface panel-glow"><div><span className="section-kicker">ARCHITECTURE DE JEU</span><h2>Table Outremonde</h2><p>Le langage visuel prévoit déjà les deux Plans, le Flux, les PV, la main et la séquence d’attaque. Le moteur de jeu viendra après la forge de decks et les outils de playtest.</p></div><div className="future-badge play"><Icon name="play" size={34} /><span>2</span><small>Plans</small></div></section>
    <section className="game-board-preview surface">
      <div className="player-strip opponent"><span className="avatar-orb">II</span><div><b>Adversaire</b><small>20 PV · Flux 3/3</small></div><span className="life-orb">20</span></div>
      <BoardZone label="Terrain Spirituel adverse" ghost cards={2} />
      <BoardZone label="Terrain Physique adverse" cards={3} />
      <div className="attack-lane"><span>PHASE D’ATTAQUE</span><i /><i /><i /></div>
      <BoardZone label="Votre Terrain Physique" cards={3} />
      <BoardZone label="Votre Terrain Spirituel" ghost cards={2} />
      <div className="player-strip"><span className="avatar-orb">I</span><div><b>Vous</b><small>20 PV · Flux 4/4</small></div><span className="life-orb">20</span></div>
      <div className="hand-preview">{[1,2,3,4,5].map(i => <span key={i} style={{ transform: `rotate(${(i-3)*2.4}deg)` }} />)}</div>
    </section>
    <div className="future-actions"><button className="secondary-cta" onClick={() => onNavigate('rules')}>Relire les règles</button><button className="primary-cta" onClick={() => onNavigate('decks')}>Voir le Deck Builder <Icon name="arrow" size={16} /></button></div>
  </div>;
}

function BoardZone({ label, ghost = false, cards: count }: { label: string; ghost?: boolean; cards: number }) {
  return <div className={`board-zone ${ghost ? 'ghost' : ''}`}><span className="zone-label">{label}</span><div className="board-cards">{Array.from({ length: count }).map((_, i) => <span key={i}><i>{ghost ? 'S' : i + 1}</i></span>)}</div></div>;
}

function RulesPage() {
  const [query, setQuery] = useState('');
  const [openRule, setOpenRule] = useState<string | null>('🎯 Objectif');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rules.filter(([title, body]) => !q || `${title} ${body}`.toLowerCase().includes(q));
  }, [query]);
  const groups = useMemo(() => {
    const map = new Map<string, Array<[string, string]>>();
    filtered.forEach(rule => {
      const category = ruleCategory(rule[0]);
      if (!map.has(category)) map.set(category, []);
      map.get(category)!.push(rule);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return <div className="page-stack rules-page">
    <section className="rules-intro"><div><span className="section-kicker">RÉFÉRENCE DE JEU</span><h2>Règles du Core Set V1</h2><p>Texte de règles conservé depuis la V0.1.17. Le Deck Builder V0.1.21 ne change aucune mécanique.</p></div><span className="rule-count"><b>{rules.length}</b><small>entrées</small></span></section>
    <div className="rules-search surface"><Icon name="search" size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher : Impact, blocage, Flux, Intuition…" />{query && <button onClick={() => setQuery('')}><Icon name="close" size={15} /></button>}</div>
    <div className="rules-groups">
      {groups.map(([group, entries]) => <section key={group} className="rule-group"><div className="rule-group-title"><span>{group}</span><small>{entries.length}</small></div><div className="rule-accordion">{entries.map(([title, body]) => <button key={title} className={openRule === title ? 'open' : ''} onClick={() => setOpenRule(openRule === title ? null : title)}><span className="rule-heading"><b>{title}</b><Icon name="chevron" size={16} /></span>{openRule === title && <p>{body}</p>}</button>)}</div></section>)}
    </div>
    {filtered.length === 0 && <div className="empty-state surface"><span className="empty-rune">?</span><h3>Aucune règle trouvée</h3><p>Essayez un mot-clé différent.</p></div>}
  </div>;
}

function ruleCategory(title: string) {
  const t = title.toLowerCase();
  if (/objectif|points de vie|construction|main|pioche|deck/.test(t)) return 'Fondations';
  if (/flux|plan|spirituel|permanent|rituel|bonus|intuition|brume/.test(t)) return 'Plans & Ressources';
  if (/attaque|combat|interposition|impact|drain|protection|armure|dégâts|blessée|mort|sacrifice|épuisement|redressement/.test(t)) return 'Combat';
  return 'Timing & Résolution';
}

export default App;
