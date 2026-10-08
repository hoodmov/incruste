# incruste

## Synchro des modifications entre appareils
Les modifications faites dans le site (focale, distance, notes…) sont enregistrées dans `data/edits.json` via l'API GitHub.
Sur chaque appareil : menu « ⋯ » → « Synchro entre appareils (GitHub) » → coller un jeton fine-grained limité à ce dépôt (Contents : Read and write). Sans jeton, le site est en lecture seule (il affiche les modifs mais n'en envoie pas).
