# Integrity Check — V0.1.18 UI Forge

- Base source : V0.1.17 Core Set V1 audité + Gaellix.
- `src/data/cards.ts` : SHA-256 `04cfd6abc40e30a3a78eddad56241bc0312568463d87bf71856a2e7eaf9facaa`, strictement identique à V0.1.17.
- 121 IDs uniques.
- 120 cartes Core numérotées exactement de 001 à 120, aucun trou.
- 20 cartes Core par affinité ; Brume compte 21 objets uniquement parce que Gaellix est la Promo hors-série.
- Gaellix : ID `P-GAELLIX`, non numérotée, inchangée.
- Texte des règles : strictement identique à la V0.1.17 ; déplacé dans `src/data/rules.ts` pour séparer données et UI.
- Workflow Android GitHub Actions : inchangé.
- Vérification de syntaxe TypeScript/TSX par transpilation TypeScript : OK.
- Le build npm complet n’a pas pu être reproduit dans le conteneur, l’installation des dépendances ayant expiré ; le workflow GitHub reste la voie de build APK prévue.
