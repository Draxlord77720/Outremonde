# Audit V0.1.17 — Patch résolution du combat

Source de départ : `outremonde-card-lab-core-set-v1-audited-gaellix-v0.1.16.zip`.

## Règle verrouillée

- Un attaquant est initialement dirigé vers le joueur adverse.
- Le défenseur assigne au maximum un bloqueur par attaquant.
- Si le bloqueur n’est plus sur le Terrain Physique au moment où cette attaque doit se résoudre, l’attaque devient non bloquée et l’attaquant inflige normalement son ATK au joueur adverse.
- Si le bloqueur est encore présent, l’attaquant inflige ses dégâts au bloqueur ; le bloqueur ne riposte pas.
- Si le bloqueur meurt des dégâts de cette attaque, l’attaque reste déjà résolue contre ce bloqueur. Seul Impact peut transmettre des dégâts excédentaires selon sa valeur.
- Si l’attaquant n’est plus sur le Terrain Physique au moment où son attaque doit se résoudre, cette attaque ne se résout pas.
- Si le bloqueur a disparu avant la résolution, Impact ne s’applique pas : l’attaque est simplement devenue non bloquée et inflige l’ATK normale au joueur.

## Carte modifiée

Une seule carte Core est modifiée :

**O089 — Titan Ébène Veine-Noire**

Avant : `Rupture Tellurique — Lorsqu’une créature ennemie Blessée est déclarée bloqueuse du Titan, elle subit immédiatement 1 dégât. Si elle meurt ainsi, l’attaque du Titan reste bloquée.`

V0.1.17 : `Rupture Tellurique — Lorsqu’une créature ennemie Blessée est déclarée bloqueuse du Titan, elle subit immédiatement 1 dégât.`

La règle générale prend désormais le relais : si cette bloqueuse meurt avant la résolution de l’attaque du Titan, l’attaque devient non bloquée.

## Intégrité attendue

- Core Set V1 : 120 cartes numérotées, 001–120.
- Gaellix : Promo hors-série non numérotée, inchangée.
- Total d’objets jouables : 121.
- Aucune autre carte ne doit différer de V0.1.16.
