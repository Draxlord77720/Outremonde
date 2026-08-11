# Outremonde Card Lab — Core Set V1

Prototype mobile du TCG « Les Lueurs de l’Outremonde » (nom de set provisoire).

## Version actuelle : Core Set V1 audité + Gaellix Promo — Deck Builder (V0.1.20)

**Le Core Set V1 reste complet : 120/120 cartes numérotées et validées, soit 20 cartes dans chacune des six affinités.** Gaellix reste une carte **Promo hors-série non numérotée**, ajoutée en V0.1.15 puis patchée en V0.1.16. V0.1.20 ne modifie ni Gaellix, ni les 120 cartes, ni les règles V0.1.17 ; elle ajoute le Deck Builder fonctionnel au-dessus de la base V0.1.19 et conserve la numérotation Core 001–120. Elle compte normalement parmi les **40 cartes exactement** du deck et peut être jouée en **maximum 3 exemplaires**, comme toute carte du pool légal.

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
- Brume : **20/20 cartes validées**
  - 12 créatures
  - 4 rituels
  - 4 permanents spirituels
- Chaque affinité suit la matrice **10 communes / 6 peu communes / 3 rares / 1 mythique**.

## Règles verrouillées

- Deck de **40 cartes exactement**, maximum **3 exemplaires d’une même carte**, cartes Promo comprises
- Pioche normale et premier joueur sans pioche au tour 1
- Mulligan unique 7 → nouvelle main de 7 → 1 carte sous le deck → départ à 6
- Une seule phase d’attaque par tour
- Ordre des attaques annoncé avant les bloqueurs
- Déclenchements « lorsqu’elle attaque » résolus avant la déclaration des bloqueurs ; déclenchements de blocage résolus avant la première attaque
- Les événements simultanés et leurs effets suivent un ordre déterministe choisi par leur contrôleur
- Résolution des attaques une par une
- Si un bloqueur quitte le Terrain Physique avant la résolution de l’attaque qu’il bloquait, cette attaque devient non bloquée et frappe normalement le joueur adverse
- Si l’attaquant quitte le Terrain Physique avant le moment où son attaque doit se résoudre, cette attaque ne se résout pas
- Le bloqueur ne riposte jamais
- Attaquer rend la créature Épuisée jusqu’au prochain redressement
- Définition officielle d’Impact X ; plusieurs valeurs d’Impact sur une même créature ne se cumulent pas
- Réincarnations résolues entre deux attaques
- Sacrifice = mort volontaire + Réincarnation normale
- Maximum **+2 Flux supplémentaires par tour**, toutes sources de cartes confondues, **Bonus Spirituels compris**
- Maximum **une carte de coût imprimé 0 Flux jouée par joueur et par tour**, quel que soit son type ou le Plan choisi
- Les PV commencent à 20, peuvent dépasser 20 et **n’ont aucun plafond**
- **Drain X** : première fois par tour qu’une créature inflige des dégâts de combat au joueur adverse, son contrôleur gagne X PV ; plusieurs valeurs de Drain ne se cumulent pas
- **Protection X** : la première fois de chaque tour que la créature devrait subir des dégâts, réduisez-les de X ; plusieurs Protections ne se cumulent pas, seule la valeur la plus élevée s’applique
- **Armure X** : chaque fois que la créature devrait subir des dégâts, réduisez-les de X ; plusieurs Armures ne se cumulent pas
- Protection et Armure peuvent coexister ; ordre : augmentations → Protection → Armure
- Les dégâts supplémentaires restent dans le même événement et conservent la même source
- En Spirituel, le Bonus d’affinité se résout avant l’effet propre de la carte
- Impact utilise les dégâts excédentaires réellement disponibles après augmentations/réductions et dégâts déjà marqués ; il ne s’applique que si le bloqueur est encore présent à la résolution et est détruit par les dégâts de cette attaque
- **Redressement** : retire Épuisée, sans créer de nouvelle attaque ni permettre un blocage rétroactif après la déclaration des bloqueurs
- Bonus Spirituel Écryme : +1 Flux uniquement si la carte Écryme jouée en Spirituel a un coût imprimé d’au moins 1 Flux
- Un seul Permanent Spirituel du même nom contrôlé à la fois
- Rituels joués en Phase principale et envoyés au cimetière après résolution
- **Intuition X** : regardez les X cartes du dessus, placez-en éventuellement sous le deck, puis remettez les autres au-dessus dans l’ordre choisi ; Intuition ne fait pas piocher
- Une défausse remplacée par un placement sous le deck **n’est pas une défausse**
- Un **effet Brume** provient d’une carte Brume ou du Bonus Spirituel Brume
- ATK négative traitée comme 0 pour les dégâts ; une créature meurt si sa DEF tombe à 0 ou moins ou si ses dégâts marqués atteignent sa DEF actuelle
- Les effets qui regardent/meulent plus de cartes que le deck n’en contient font autant que possible ; seule une pioche impossible fait perdre
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

## Deck Builder V0.1.20

- Création, renommage, duplication et suppression de decks
- Sauvegarde automatique locale sur l’appareil / navigateur
- Restauration automatique des decks au lancement
- Deck légal à **40 cartes exactement**
- Maximum **3 exemplaires d’une même carte**, Gaellix comprise
- Recherche et filtres Affinité / Type pendant la construction
- Analyse en temps réel : répartition par affinité, type et courbe de Flux
- Export en fichier `.outremonde.json`
- Import de fichier ou de code JSON Outremonde
- Les exports refusent / imports rejettent les cartes inconnues, les quantités >3 et les listes >40

> La sauvegarde locale survit aux fermetures et mises à jour normales de l’app, mais peut être perdue si l’utilisateur désinstalle l’application ou efface ses données. L’export permet de conserver une copie portable.

## Fonctionnalités V0.1

- Collection mobile des **120 cartes du Core Set V1 + les cartes Promo jouables**
- Recherche par nom / numéro
- Filtres d’affinité, rareté et statut
- Fiche Physique / Spirituel / Réincarnation
- Support d’import progressif des futurs visuels Physique / Spirituel dans les fiches (aucun visuel embarqué dans V0.1.19)
- Règles de référence rapide
- Base Capacitor / Android
- GitHub Action pour produire un APK debug

### Images dans l’application

**V0.1.19 n’embarque aucun visuel de carte.** Les anciens prototypes Braise 001–005 ont été retirés. Le support `art` de l’application est conservé afin de pouvoir ajouter progressivement les futurs visuels Physique / Spirituel définitifs sans reconstruire l’interface.

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

Lancez `.github/workflows/build-android.yml` depuis **Actions**. L’artifact généré s’appelle `outremonde-card-lab-core-set-v1-audited-apk`.

## Roadmap

- **V0.1.19 — UI Readability** : typographie et contrôles agrandis, lisibilité desktop/mobile renforcée, sans modification des cartes ni des règles.
- **V0.1.18 — UI Forge** : refonte complète UI/UX, navigation Accueil / Collection / Decks / Jouer / Règles, collection enrichie, fiche carte responsive, recherche de règles, prévisualisations du Deck Builder et de la table. Aucune donnée de carte ni règle modifiée.
- **V0.1.17 — Patch résolution du combat** : un bloqueur disparu avant sa résolution ouvre l’attaque vers le joueur ; un attaquant disparu ne résout pas son attaque ; Impact aligné sur cette règle ; O089 mis en conformité. Aucune autre carte modifiée.
- **V0.1.16 — Patch Gaellix** : Effet Spirituel = +1 ATK/+1 DEF jusqu’à la fin de votre prochain tour + Intuition 2 ; Réincarnation = +1 ATK/+1 DEF jusqu’à la fin de votre prochain tour ; Core 120/120 inchangé
- **V0.1.15 — Gaellix Promo** : ajout de Gaellix en Promo hors-série non numérotée, Brume Mythique / Édition Légendaire, 4 Flux, 4/4 ; le Core Set reste 120/120 et la Promo est légale jusqu’à 3 exemplaires dans un deck de 40 cartes
- **V0.1.14 — Core Set V1 audité** : audit intégral des 120 cartes, corrections de timing E023/U068/U079/B003/B008/U063/O082, règles de simultanéité/statistiques/Drain/Impact/deck presque vide, et retrait de tous les visuels embarqués
- **Core Set V1 / V0.1.13** : Brume 101–120 complète + Intuition X + règles de remplacement + 120/120 cartes validées
- V0.1.12 : Obsidienne 81–100 complète + E023/U066 + Armure X + règles dégâts/Protection/Impact
- V0.1.11 : Umbra 61–80 complet + correction U062 + règle système des cartes à 0 Flux
- V0.1.10 : Soléane 41–60 complet + corrections audit/stress-test global + Protection X + redressement
- V0.1.9 : Écryme 21–40 complet + corrections stress-test Braise/Écryme + PV sans plafond + clarification Flux
- V0.1.8 : intégration HD vérifiée de Braise 01 à 05, Physique + Spirituel
- V0.1.4 : Braise 20/20 validée + règles Spirituelles clarifiées et verrouillées
- V0.1.3 : audit Braise + noyau de règles
- V0.1.20 : Deck Builder 40 cartes
- V0.1.20 : Outils de playtest (main, mulligan, Flux), puis Table de jeu locale
- V0.4 : Rules Engine
- V0.5 : Statistiques de playtest
