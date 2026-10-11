#!/bin/bash
# Construit incruste/index.html (GitHub Pages) à partir de site/index.html : en-tête HTML complet + og:image absolue
{ printf '%s' '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'; sed 's#property="og:image" content="img/001.jpg"#property="og:image" content="https://hoodmov.github.io/incruste/img/001.jpg"#' /home/claude/site/index.html; } > /home/claude/incruste/index.html
