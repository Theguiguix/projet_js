var INTERACTION = {
    "0" : "rien",
    "51" : "Un trou, il semble possible d'insérer un objet"
};

function Map(nom, layer) {
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();
		
	// Chargement du fichier
	xhr.open("GET", './maps/' + nom + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData = JSON.parse(mapJsonData);
	this.tileset = new Tileset(mapData.tilesets[0].name, mapData.tileheight);
    this.tailleTile = mapData.tileheight;
    this.terrain = new Array(this.mapWidth);
    
    var k = 0;
    for(var i = 0; i < mapData.height; i++) {
        this.terrain[i] = new Array(mapData.width);
        for(var j = 0; j < mapData.width; j++) {
            this.terrain[i][j] = mapData.layers[layer].data[k];
            k++;
        }
    }
    
    // Liste des personnages présents sur le terrain.
	this.personnages = new Array();
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
    return this.terrain.length;
}
Map.prototype.getLargeur = function() {
	return this.terrain[0].length;
}

Map.prototype.getTailleTile = function () {
    return this.tailleTile;
}

// Pour ajouter un personnage
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}

Map.prototype.dessinerMap = function(context) {
	for(var i = 0, l = this.terrain.length ; i < l ; i++) {
		var ligne = this.terrain[i];
		var y = i * this.tailleTile;
		for(var j = 0, k = ligne.length ; j < k ; j++) {
			this.tileset.dessinerTile(ligne[j], context, j * this.tailleTile, y);
		}
	} 
}

// Dessin des personnages
Map.prototype.dessinerPersonnage = function(context) {
	for(var i = 0, l = this.personnages.length ; i < l ; i++) {
		this.personnages[i].dessinerPersonnage(context);
	}
}














