function Map(nom) {
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();
		
	// Chargement du fichier
	xhr.open("GET", './maps/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData = JSON.parse(mapJsonData);
    this.layers = mapData.layers;
    this.tileset = new Tileset(mapData.layers[0].tileset);
	this.terrain = mapData.layers[0].terrain;
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * 32;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * 32, y);
		}
	}
}

Map.prototype.dessinerCouches = function(context) {
    for(var k = 0; k < this.layers.lenght; k++) {
        this.terrain = this.layers[k].terrain;
        this.tileset = new Tileset(this.layers[k].tileset);
        for(var i = 0, l = this.terrain.length ; i < l ; i++) {
            var ligne = this.terrain;
            var y = i * 32;
            for(var j = 0, k = ligne.length ; j < k ; j++) {
                this.tileset.dessinerTile(ligne[j], context, j * 32, y);
            }
        }
    }
}















