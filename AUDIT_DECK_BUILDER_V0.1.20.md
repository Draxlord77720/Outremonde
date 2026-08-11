# Audit — Deck Builder V0.1.20

## Base

- Source : V0.1.19 UI Readability
- Core Set V1 : 120 cartes numérotées 001–120
- Promo : Gaellix hors-série
- Pool jouable total : 121 objets

## Intégrité gameplay

- `src/data/cards.ts` SHA-256 : `04cfd6abc40e30a3a78eddad56241bc0312568463d87bf71856a2e7eaf9facaa`
- `src/data/rules.ts` SHA-256 : `9d4379b5705e04a3fa7e5d69f7f2365b48cad9287186059a9265c8dd784bfee7`
- Ces deux hashes sont identiques à V0.1.19.
- Aucune carte ni règle modifiée.

## Contraintes Deck Builder

- Deck valide uniquement à 40 cartes exactement.
- Maximum 3 exemplaires par `cardId`.
- Gaellix suit la même limite de 3 exemplaires.
- Mélange libre des six affinités.
- Ajout bloqué si le deck atteint 40 cartes ou si une carte atteint 3 exemplaires.
- Import rejeté si carte inconnue, quantité invalide, cumul >3 pour un même ID ou total >40.

## Persistance et portabilité

- Sauvegarde automatique via `localStorage`, clé `outremonde.deckbuilder.v1`.
- Deck actif restauré via `outremonde.deckbuilder.active`.
- Export JSON `outremonde-deck-v1`.
- Import fichier JSON et import par code JSON.

## Vérification technique

- Parsing/transpilation TypeScript/TSX : OK.
- Type-check de structure avec stubs React : OK.
- `npm install` n’a pas pu être finalisé dans l’environnement de génération (timeout réseau), donc le build Vite/Capacitor complet reste à valider via GitHub Actions.
