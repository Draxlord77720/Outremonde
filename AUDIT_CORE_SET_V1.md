# Audit Core Set V1 — V0.1.14

Audit réalisé sur les 120 cartes et les règles intégrées à l'application.

## Contrôles structurels

- 120 cartes exactement, numéros 001 à 120 sans trou.
- 120 identifiants uniques.
- 20 cartes par affinité.
- Pour chaque affinité : 12 Créatures, 4 Rituels, 4 Permanents Spirituels.
- Pour chaque affinité : 10 Communes, 6 Peu Communes, 3 Rares, 1 Mythique.
- Toutes les cartes sont au statut `Validée`.
- Toutes les créatures possèdent ATK, DEF, effet Physique, Bonus/Effet Spirituel et Réincarnation.
- Tous les Rituels/Permanents utilisent les champs correspondant à leur type.
- Aucun visuel ni aucune référence `art` n'est embarqué dans cette version.

## Corrections appliquées pendant l'audit

- E023 : condition de gain de PV rendue non ambiguë.
- U068 : Réincarnation reformulée comme augmentation du même événement de dégâts.
- U079 : déclenchement lié au fait qu'un effet Umbra empêche réellement un blocage.
- B003, B008, U063 et O082 : timing des effets « prochaine attaque » compatible avec la déclaration simultanée des attaquants.
- Clarification des déclenchements d'attaque/blocage et des événements simultanés.
- Clarification ATK/DEF et condition de mort.
- Clarification du non-cumul d'Impact et de Drain.
- Clarification des opérations sur un deck presque vide et des durées « jusqu'au prochain tour adverse ».

## Visuels

Les 10 anciens WebP Braise 001–005 ont été supprimés. Le champ optionnel `art` et l'interface d'affichage restent disponibles pour réimporter les futurs visuels définitifs au fur et à mesure.

## Extension Promo V0.1.15 — Gaellix

- Le Core Set V1 audité reste inchangé : **120 cartes numérotées 001 à 120**.
- Une carte hors-série est ajoutée au pool jouable : **Gaellix** (`P-GAELLIX`), sans `setNumber`.
- Gaellix est **Brume / Créature / Mythique / Édition Légendaire / 4 Flux / 4 ATK / 4 DEF**.
- Elle possède un effet Physique, le Bonus Spirituel Brume, un Effet Spirituel et une Réincarnation.
- Elle est légale jusqu’à **3 exemplaires** et compte normalement parmi les **40 cartes exactement** du deck.
- Aucun numéro 121 n’est créé ; l’application l’affiche comme `PROMO · GAELLIX`.
- Aucun visuel n’est embarqué avec cette injection.
