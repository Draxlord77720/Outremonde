# Integrity Check — V0.1.20 Deck Builder

- Base: V0.1.19 UI Readability.
- `src/data/cards.ts`: inchangé, SHA-256 `04cfd6abc40e30a3a78eddad56241bc0312568463d87bf71856a2e7eaf9facaa`.
- `src/data/rules.ts`: inchangé, SHA-256 `9d4379b5705e04a3fa7e5d69f7f2365b48cad9287186059a9265c8dd784bfee7`.
- 121 IDs uniques : 120 cartes Core numérotées 001–120 + Gaellix Promo hors-série.
- Deck Builder : 40 cartes exactement, maximum 3 exemplaires par ID.
- Sauvegarde locale, duplication, suppression avec confirmation, export/import fichier et code JSON.
- Parsing TS/TSX : OK.
- Vérification TypeScript de structure : OK.
- Build npm/Vite complet non exécuté localement : `npm install` a dépassé le délai réseau ; validation finale prévue via GitHub Actions inclus.
