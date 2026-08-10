# Outremonde Card Lab — V0.1.12

Prototype mobile du TCG « Les Lueurs de l’Outremonde » (nom de set provisoire).

## Version actuelle : V0.1.12

**Braise, Écryme, Soléane, Umbra et Obsidienne sont terminées et validées : 20/20 cartes chacune.** V0.1.12 injecte Obsidienne 81 à 100 après audit global des 100 cartes. Cette version applique aussi les corrections E023 et U066, formalise Armure X, l’ordre de résolution Spirituel, les dégâts supplémentaires de même source, l’interaction Protection + Armure et le calcul d’Impact après réduction. Les visuels HD Braise 01 à 05 restent intégrés et optimisés en WebP.

## Contenu validé

- Braise : **20/20 cartes validées**
- Écryme : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- Soléane : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- Umbra : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- 10 communes / 6 peu communes / 3 rares / 1 mythique
- Obsidienne : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- Brume reste dans son pool de travail actuel avant l’audit 101–120.

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
- Maximum **+2 Flux supplémentaires par tour**, toutes sources de cartes confondues, **Bonus Spirituels compris**
- Maximum **une carte de coût imprimé 0 Flux jouée par joueur et par tour**, quel que soit son type ou le Plan choisi
- Les PV commencent à 20, peuvent dépasser 20 et **n’ont aucun plafond**
- **Drain X** : première fois par tour qu’une créature inflige des dégâts de combat au joueur adverse, son contrôleur gagne X PV
- **Protection X** : la première fois de chaque tour que la créature devrait subir des dégâts, réduisez-les de X ; plusieurs Protections ne se cumulent pas, seule la valeur la plus élevée s’applique
- **Armure X** : chaque fois que la créature devrait subir des dégâts, réduisez-les de X ; plusieurs Armures ne se cumulent pas
- Protection et Armure peuvent coexister ; ordre : augmentations → Protection → Armure
- Les dégâts supplémentaires restent dans le même événement et conservent la même source
- En Spirituel, le Bonus d’affinité se résout avant l’effet propre de la carte
- Impact utilise les dégâts excédentaires réellement disponibles après augmentations/réductions et dégâts déjà marqués
- **Redressement** : retire Épuisée, sans créer de nouvelle attaque ni permettre un blocage rétroactif après la déclaration des bloqueurs
- Bonus Spirituel Écryme : +1 Flux uniquement si la carte Écryme jouée en Spirituel a un coût imprimé d’au moins 1 Flux
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
- Affichage des cartes complètes HD avec miniature dans la collection, bascule Physique / Spirituel et vue agrandie
- Règles de référence rapide
- Base Capacitor / Android
- GitHub Action pour produire un APK debug

### Images dans l’application

Les cartes HD embarquées dans l’APK utilisent désormais **WebP qualité maximale** à leur résolution native. Cela réduit fortement le poids du dépôt sans changer la mise en page. Les PNG masters peuvent être conservés séparément pour une future impression.

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

Lancez `.github/workflows/build-android.yml` depuis **Actions**. L’artifact généré s’appelle `outremonde-card-lab-v0.1.12-apk`.

## Roadmap

- **V0.1.12** : Obsidienne 81–100 complète + E023/U066 + Armure X + règles dégâts/Protection/Impact
- V0.1.11 : Umbra 61–80 complet + correction U062 + règle système des cartes à 0 Flux
- V0.1.10 : Soléane 41–60 complet + corrections audit/stress-test global + Protection X + redressement
- V0.1.9 : Écryme 21–40 complet + corrections stress-test Braise/Écryme + PV sans plafond + clarification Flux
- V0.1.8 : intégration HD vérifiée de Braise 01 à 05, Physique + Spirituel
- V0.1.4 : Braise 20/20 validée + règles Spirituelles clarifiées et verrouillées
- V0.1.3 : audit Braise + noyau de règles
- V0.2 : Deck Builder 40 cartes
- V0.3 : Table de jeu locale
- V0.4 : Rules Engine
- V0.5 : Statistiques de playtest
