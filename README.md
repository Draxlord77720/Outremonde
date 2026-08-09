# Outremonde Card Lab — V0.1.2

Prototype mobile du TCG « Les Lueurs de l’Outremonde » (nom de set provisoire).

## Version actuelle : V0.1.2

Correctif technique Capacitor 8 : suppression de l’option obsolète `bundledWebRuntime`.

## Fonctionnalités V0.1

- Collection mobile des cartes actuellement définies
- Recherche par nom / numéro
- Filtres d’affinité, rareté et statut
- Fiche Physique / Spirituel / Réincarnation
- Notes d’équilibrage sur les cartes encore à revoir
- Règles de référence rapide
- Base prête pour Capacitor / Android
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

Après la première génération Android, utilisez plutôt :

```bash
npm run android:sync
npm run android:open
```

## Modifier les cartes

Toutes les données du pool de cartes sont dans :

`src/data/cards.ts`

L’interface n’a normalement pas besoin d’être modifiée pour ajouter ou équilibrer une carte.

## Build APK avec GitHub

Le workflow `.github/workflows/build-android.yml` peut être lancé depuis l’onglet **Actions** de GitHub. L’APK est ensuite disponible dans les **Artifacts** du run sous le nom `outremonde-card-lab-v0.1.2-apk`.

## Roadmap

- V0.1.2 : Correctif build Capacitor 8
- V0.1 : Collection / fiches / règles
- V0.2 : Deck Builder 40 cartes
- V0.3 : Table de jeu locale
- V0.4 : Rules Engine
- V0.5 : Statistiques de playtest


## État du contenu V0.1.2
- Braise : **20/20 cartes** (12 créatures, 4 rituels, 4 permanents spirituels).
- Les autres affinités restent au stade de travail déjà intégré.
- Les nouvelles Braise 13–20 sont marquées Draft jusqu’au prochain audit d’équilibrage.
