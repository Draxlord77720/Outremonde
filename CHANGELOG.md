# Changelog

## Core Set V1 / V0.1.13 — 120 cartes complètes

- Injection complète de **Brume 101–120** après audit : 12 créatures, 4 rituels, 4 permanents spirituels ; 10 C / 6 U / 3 R / 1 M.
- Remplacement des anciennes Brume 101–114 par les versions corrigées et ajout de N115–N120.
- Nouveau mot-clé **Intuition X** et doctrine Brume centrée sur filtrage, adaptation et polyvalence sans pioche nette récurrente.
- Règle de remplacement formalisée : un événement remplacé n’a pas eu lieu ; une défausse remplacée n’est pas une défausse.
- Définition officielle d’un **effet Brume** : effet provenant d’une carte Brume ou du Bonus Spirituel Brume.
- Stress-test final des **63 combinaisons d’affinités** sans boucle infinie ni hard-lock théorique détecté.
- Construction verrouillée : **deck de 40 cartes exactement, maximum 3 exemplaires d’une même carte**, affinités librement mélangeables.
- Core Set V1 : **120/120 cartes validées**, 20 par affinité.
- Artifact Android : `outremonde-card-lab-core-set-v1-apk`.

## V0.1.12 — Obsidienne complète + moteur dégâts/Armure

- Injection complète d’Obsidienne **081 à 100** : 12 créatures, 4 rituels, 4 permanents spirituels ; 10 C / 6 U / 3 R / 1 M.
- Obsidienne 081–089 remplacée par la version auditée : recentrage sur **Armure / endurance / représailles / Fracture**, suppression des effets trop proches d’Umbra et correction des timings.
- Ajout de O090–O100 selon la matrice officielle.
- Bonus Spirituel Obsidienne : une créature Physique gagne **Armure 1 jusqu’au prochain tour**.
- **Armure X** formalisée : réduction de chaque source de dégâts ; plusieurs Armures ne se cumulent pas.
- Interaction **Protection + Armure** verrouillée : elles peuvent coexister ; Protection s’applique avant Armure sur la première source.
- Ordre de calcul verrouillé : dégâts de base → augmentations → Protection → Armure → dégâts finaux.
- Les dégâts supplémentaires appartiennent au **même événement et à la même source** ; aucune récursion artificielle.
- **Impact X** clarifié : l’excédent est calculé à partir des dégâts réellement disponibles après modifications/réductions et des dégâts déjà marqués sur le bloqueur.
- Ordre Spirituel verrouillé : **Bonus d’affinité d’abord, effet Spirituel propre ensuite**.
- E023 **Rongerêve Spectral** recentré sur le gain de PV Écryme, sans meule.
- U066 **Traquenuit Profanée** ne fait défausser que lorsqu’elle inflige réellement des dégâts de combat au joueur.
- O090 précise que son +1 DEF vérifie l’Armure présente avant la résolution de son effet Spirituel propre.
- Brume 101–114 reste volontairement en pool de travail pour le prochain audit.
- Artifact Android renommé `outremonde-card-lab-v0.1.12-apk`.

## V0.1.11 — Umbra complet + règle 0 Flux

- Umbra 61–80 complétée et validée après audit et stress-test global des 15 configurations avec les quatre affinités.
- U061–U069 corrigées selon l’audit : évasion, affaiblissement, manipulation des bloqueurs et du dessus du deck.
- U070–U080 ajoutées selon la matrice officielle : 12 créatures, 4 rituels, 4 permanents spirituels ; 10 C / 6 U / 3 R / 1 M.
- U062 corrigée après stress-test : ses effets Spirituel et Réincarnation de non-blocage sont liés à une créature Umbra Physique.
- Nouvelle règle verrouillée : un joueur ne peut jouer qu’une seule carte dont le coût imprimé est 0 Flux par tour, quel que soit son type ou le Plan choisi.
- Les règles PV sans plafond et +2 Flux supplémentaires maximum par tour restent inchangées.
- Watchlist Umbra : U068, U070, U071, U072, U076 et U080.
- Artifact Android renommé `outremonde-card-lab-v0.1.11-apk`.

## V0.1.10 — Soléane complet + Protection/Redressement

- Injection complète de Soléane **041 à 060** selon la matrice officielle : 12 créatures, 4 rituels et 4 permanents spirituels.
- Soléane 041–049 remplacée par la version auditée : suppression des effets de malus ATK trop proches d’Umbra, clarification des timings et recentrage sur DEF / Protection / redressement.
- **Protection X** formalisée : première prévention de dégâts de chaque tour, non cumulable ; seule la valeur la plus élevée s’applique.
- **Redressement** formalisé : retire Épuisée sans créer de seconde attaque ; aucun blocage rétroactif après la déclaration des bloqueurs.
- S044 **Veilleur Rayonnant** passe à 1 Flux et ses redressements sont réservés aux créatures Soléane.
- S048 **Gardien du Halo Brisé** passe de 1 à 2 Flux.
- S050 **Bastion du Soleil Voilé** corrigé après stress-test : son effet Spirituel ne peut redresser qu’une créature Soléane choisie.
- S058 **Cloche des Veilleurs** corrigée : première fois par tour, y compris pendant le tour adverse ; le redressement normal de début de tour ne déclenche pas l’effet.
- Watchlist conservée sans nerf supplémentaire : S042, S049, S052, S058, S060 ainsi que les interactions multi-affinités.
- Braise 01–05 conserve ses visuels HD WebP optimisés.
- Artifact Android renommé `outremonde-card-lab-v0.1.10-apk`.

## V0.1.9 — Écryme complet + règles PV/Flux

- Injection complète d’Écryme **021 à 040** selon la matrice 20 cartes : 12 créatures, 4 rituels, 4 permanents spirituels.
- Écryme 029 **Acolyte du Relâche-Sang** corrigé : son moteur ne se déclenche désormais que lorsqu’une autre créature **que vous contrôlez** meurt, et une seule fois par tour.
- Écryme 035 **Dernier Battement** passe de **1 à 2 Flux** après stress-test Braise + Écryme.
- Règle PV verrouillée : départ à 20 PV, dépassement autorisé, **aucun plafond de PV**, défaite à 0 PV ou moins.
- Règle Drain X ajoutée et formalisée.
- Plafond de Flux clarifié : maximum **+2 Flux supplémentaires par tour**, toutes sources de cartes confondues, **Bonus Spirituels compris**.
- Bonus Spirituel Écryme sécurisé : +1 Flux seulement si la carte Écryme jouée en Spirituel coûte au moins 1 Flux imprimé.
- Braise 01–05 conserve ses visuels HD WebP optimisés.
- Artifact Android renommé `outremonde-card-lab-v0.1.9-apk`.

## V0.1.8 — Assets HD optimisés pour GitHub
- Aucun changement de règles, de statistiques ou de direction artistique.
- Conversion des 10 visuels Braise 01 à 05 de PNG vers WebP qualité maximale pour l’application.
- Résolution native conservée ; les masters PNG restent destinés à l’archivage/impression et ne sont plus embarqués dans le package mobile.
- Le ZIP de mise à jour repasse sous la limite d’upload navigateur de GitHub.
- Artifact Android renommé `outremonde-card-lab-v0.1.8-apk`.

## V0.1.8 — Correctif intégration visuelle Braise 02–05
- Réintégration propre des 8 visuels HD de Braise 02 à 05 dans `public/cards/braise/`.
- Ajout explicite des références `art.physical` et `art.spiritual` aux fiches B002, B003, B004 et B005.
- Les visuels HD sont maintenant **visibles directement dans la collection**, pas seulement dans la fenêtre détaillée.
- La fenêtre détaillée conserve la bascule Physique / Spirituel et l’agrandissement plein écran.
- Les textes de gameplay restent ceux de la base V0.1.5 validée : ce correctif ne modifie pas l’équilibrage des 20 Braise.
- Tous les libellés de version de l’interface passent en V0.1.8.
- Artifact Android : `outremonde-card-lab-v0.1.8-apk`.

## V0.1.5 — Braise 01 HD intégrée
- Intégration de la carte complète HD **Écumeur Cendré (Braise 01)** en deux versions : Plan Physique et Plan Spirituel.
- Ajout des assets HD dans `public/cards/braise/`.
- Ajout d’une bascule Physique / Spirituel directement dans la fiche de la carte.
- La carte HD peut être ouverte en grand écran sur mobile.
- Ajout d’un badge « Visuel HD » dans la collection pour les cartes disposant d’un visuel final/prototype.
- Les 20 Braise validées et les règles V0.1.4 restent inchangées.
- Artifact Android renommé `outremonde-card-lab-v0.1.5-apk`.

## V0.1.4 — Règles Spirituelles clarifiées
- Les 20 cartes Braise restent validées sans changement de statistiques ni d’effets.
- Clarification : une créature jouée en Spirituel reste sur le Terrain Spirituel et ne participe pas au combat.
- Clarification : l’effet Spirituel propre d’une carte est un effet d’arrivée et ne se réactive pas automatiquement aux tours suivants.
- Clarification : le Bonus Spirituel d’une même affinité **ne se cumule pas** et ne peut se déclencher qu’une fois par tour.
- Si la condition d’un Bonus Spirituel n’est pas remplie, il n’est pas consommé pour le tour.
- Les effets Spirituels propres aux cartes continuent de se résoudre même si le Bonus d’affinité a déjà été utilisé ; ils peuvent se cumuler sauf texte contraire.
- Distinction explicite entre effet Spirituel d’arrivée, Permanent Spirituel et Rituel Spirituel.
- Les cartes du Plan Spirituel ne meurent pas au combat, mais pourront être affectées par des effets de cartes explicites.
- Ajout d’un rappel Spirituel directement dans la fiche de chaque carte de l’application.
- Artifact Android renommé `outremonde-card-lab-v0.1.4-apk`.

## V0.1.3 — Braise validée + règles verrouillées
- Audit complet et validation des 20 cartes Braise.
- Écumeur Cendré réduit à 1/1, Ruée, sans Déferlement.
- Impact X défini officiellement et Fendeur Rouge adapté.
- Correctifs de timing sur Brûle-Terre, Marcheur de Braises et Ravageur Incandescent.
- Porte-Braise limité à son premier déclenchement de mort par tour.
- Maître du Brasier limité à son premier déclenchement de mort par tour.
- Incendiaire du Cœur-Rouge corrigé pour éviter le double bonus de sacrifice.
- Pyromane de la Faille-Vive déclenche sa Fièvre après la résolution de son attaque.
- Réincarnation d’Avalanche de Cendres rendue exploitable sans ambiguïté de timing.
- Offrande Incandescente exige désormais le sacrifice comme coût supplémentaire.
- Braise 01–20 passent toutes au statut **Validée**.
- Ajout de la pioche normale, du mulligan, de l’Épuisement/redressement, de l’ordre séquentiel des attaques et de la résolution complète des effets.
- Plafond global de +2 Flux supplémentaires par tour.
- Un seul Permanent Spirituel du même nom peut être contrôlé.
- Rituels limités aux Phases principales sauf futur mot-clé explicite.
- Artifact Android renommé `outremonde-card-lab-v0.1.3-apk`.

## V0.1.2 — Braise 20/20
- Ajout des Braise 13 à 20.
- Braise atteint 20 cartes : 12 créatures, 4 rituels, 4 permanents spirituels.
- L’interface gère maintenant Créature, Rituel Physique, Rituel Spirituel et Permanent Spirituel.
- Les ATK/DEF ne sont plus affichées sur les cartes non-créatures.
- Référence rapide des règles enrichie avec Rituels, Permanents, Bonus Spirituel et Sacrifice.
- APK GitHub renommé en V0.1.2.

## V0.1.1 — Correctif Capacitor 8

- Suppression de `bundledWebRuntime`, option obsolète/incompatible avec `CapacitorConfig` v8.
- Mise à jour de la version du package en `0.1.1`.
- Ajout des fichiers `VERSION` et `CHANGELOG.md` pour suivre clairement les versions dans GitHub.

## V0.1.0 — Card Lab initial

- Collection mobile des cartes actuellement définies.
- Recherche et filtres.
- Fiches Physique / Spirituel / Réincarnation.
- Règles de référence rapide.
- Préparation Android avec Capacitor.
- Workflow GitHub Actions pour produire un APK debug.
