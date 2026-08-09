# Outremonde Card Lab — V0.1.5

Prototype mobile du TCG « Les Lueurs de l’Outremonde » (nom de set provisoire).

## Version actuelle : V0.1.5

**Braise est terminée et validée : 20/20 cartes.** V0.1.5 intègre le premier visuel de carte complet HD : Écumeur Cendré, en Plan Physique et en Plan Spirituel.

## Contenu validé

- Braise : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- 10 communes / 6 peu communes / 3 rares / 1 mythique
- Les autres affinités restent dans leur état de travail actuel.

## Règles verrouillées

- Pioche normale et premier joueur sans pioche au tour 1
- Mulligan unique 7 → nouvelle main de 7 → 1 carte sous le deck → départ à 6
- Une seule phase d’attaque par tour
- Ordre des attaques annoncé avant les bloqueurs
- Résolution des attaques une par une
- Le bloqueur ne riposte jamais
- Attaquer rend la créature Épuisée jusqu’au prochain redressement
- Définition officielle d’Impact X
- Réincarnations résolues entre deux attaques
- Sacrifice = mort volontaire + Réincarnation normale
- Maximum **+2 Flux supplémentaires par tour**, toutes sources de cartes confondues
- Un seul Permanent Spirituel du même nom contrôlé à la fois
- Rituels joués en Phase principale et envoyés au cimetière après résolution
- Dégâts des créatures effacés en fin de tour

### Clarification du Plan Spirituel

- Une créature jouée en Spirituel reste sur le Terrain Spirituel, ne combat pas et ne meurt pas au combat.
- Son **effet Spirituel propre est un effet d’arrivée** : il se résout une seule fois quand la carte est jouée en Spirituel.
- Il **ne se réactive pas automatiquement** à chaque nouveau tour.
- Le **Bonus Spirituel d’une même affinité ne se stacke pas** : maximum 1 déclenchement par affinité et par tour.
- Si sa condition n’est pas remplie, le Bonus ne se déclenche pas et ne consomme pas ce déclenchement.
- Les **effets Spirituels propres aux différentes cartes continuent de se résoudre** et peuvent se cumuler, sauf indication contraire.
- Un **Permanent Spirituel** conserve son effet permanent tour après tour tant qu’il reste présent.
- Un **Rituel Spirituel** résout son effet puis va au cimetière ; il ne reste pas sur le Terrain Spirituel.
- Les cartes Spirituelles sont hors combat mais pourront être retirées, renvoyées ou affectées par des effets qui le disent explicitement.

## Fonctionnalités V0.1

- Collection mobile des cartes actuellement définies
- Recherche par nom / numéro
- Filtres d’affinité, rareté et statut
- Fiche Physique / Spirituel / Réincarnation
- Premier affichage de carte complète HD avec bascule Physique / Spirituel et vue agrandie
- Règles de référence rapide
- Base Capacitor / Android
- GitHub Action pour produire un APK debug

## Stack

- React 19.2
- TypeScript
- Vite 8.1
- Capacitor 8

## Lancer localement

```bash
npm install
npm run dev
```

## Build web

```bash
npm run build
```

## Android local

```bash
npm install
npm run android:add
npm run android:open
```

Après la première génération Android :

```bash
npm run android:sync
npm run android:open
```

## Modifier les cartes

Les données du pool sont dans `src/data/cards.ts`.

## Build APK avec GitHub

Lancez `.github/workflows/build-android.yml` depuis **Actions**. L’artifact généré s’appelle `outremonde-card-lab-v0.1.5-apk`.

## Roadmap

- **V0.1.5** : intégration HD de Braise 01 Physique + Spirituel
- V0.1.4 : Braise 20/20 validée + règles Spirituelles clarifiées et verrouillées
- V0.1.3 : audit Braise + noyau de règles
- V0.2 : Deck Builder 40 cartes
- V0.3 : Table de jeu locale
- V0.4 : Rules Engine
- V0.5 : Statistiques de playtest
