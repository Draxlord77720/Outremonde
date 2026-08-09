# Outremonde Card Lab — V0.1.3

Prototype mobile du TCG « Les Lueurs de l’Outremonde » (nom de set provisoire).

## Version actuelle : V0.1.3

**Braise est maintenant terminée et validée : 20/20 cartes.** Cette version intègre aussi le premier noyau de règles verrouillé après l’audit complet de l’affinité.

## Contenu validé

- Braise : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- 10 communes / 6 peu communes / 3 rares / 1 mythique
- Les autres affinités restent dans leur état de travail actuel.

## Règles ajoutées / verrouillées en V0.1.3

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

## Fonctionnalités V0.1

- Collection mobile des cartes actuellement définies
- Recherche par nom / numéro
- Filtres d’affinité, rareté et statut
- Fiche Physique / Spirituel / Réincarnation
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

Lancez `.github/workflows/build-android.yml` depuis **Actions**. L’artifact généré s’appelle `outremonde-card-lab-v0.1.3-apk`.

## Roadmap

- **V0.1.3** : Braise 20/20 validée + noyau de règles verrouillé
- V0.2 : Deck Builder 40 cartes
- V0.3 : Table de jeu locale
- V0.4 : Rules Engine
- V0.5 : Statistiques de playtest
