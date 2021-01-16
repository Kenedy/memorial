Zprovoznění webu:

1. K lokálnímu spuštění je třeba mít instalován [node.js](https://nodejs.org/).
2. `npm install` v root adresáři repository
3. `npm start`
4. Web bude k dispozici na portu 3000 (pokud není systémovou proměnnou PORT nastaveno jinak, viz bin/www)

V adresáři public jsou statické fily webu. Server je posílá beze změn. Jediná serverová dynamika je url /uploadResult, kam web postuje vyplněný formulář. Na to reaguje skript routes/uploadResult.js. Dále viz app.js.

Pro vývoj je užitečné si nainstalovat utilitu, která web při změně automaticky reloadne, např. [nodemon](https://www.npmjs.com/package/nodemon). Ten si lze instalovat pomocí `npm install -g nodemon` a pak v kroku 3 místo `npm start` spustit v rootu repository `nodemon`.