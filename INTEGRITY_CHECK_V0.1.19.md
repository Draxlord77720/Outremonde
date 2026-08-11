# Integrity Check — V0.1.19 UI Readability

- Base : V0.1.18 UI Forge.
- `src/data/cards.ts` SHA-256 : `04cfd6abc40e30a3a78eddad56241bc0312568463d87bf71856a2e7eaf9facaa` — identique à V0.1.18.
- `src/data/rules.ts` SHA-256 : `9d4379b5705e04a3fa7e5d69f7f2365b48cad9287186059a9265c8dd784bfee7` — identique à V0.1.18.
- 121 objets de carte présents dans `cards.ts` : 120 Core + Gaellix Promo.
- Gaellix reste `P-GAELLIX`, sans numéro de set.
- Vérification syntaxique TS/TSX par transpilation TypeScript : OK.
- Workflow GitHub Actions Android conservé.
- Build npm local non exécuté jusqu’au bout : `npm install` a expiré dans l’environnement de génération.
