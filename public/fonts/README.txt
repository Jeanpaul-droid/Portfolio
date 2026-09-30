Pour activer la vraie typographie "Newblack" (comme sur ta capture) :

1. Obtiens les fichiers officiels (licence payante / designer) :
   - Newblack-Regular.woff2
   - Newblack-Regular.woff (optionnel, fallback)

2. Copie-les ici :
   public/fonts/Newblack-Regular.woff2
   public/fonts/Newblack-Regular.woff

3. C'est tout : le @font-face dans src/index.css les charge
   automatiquement en priorité. En attendant, c'est "Archivo"
   (Google Fonts, très proche visuellement) qui s'affiche.
