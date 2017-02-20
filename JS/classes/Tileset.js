function Tileset(url, taille) {
    this.taille = taille;
    // Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		
		// Largeur du tileset en tiles
		this.referenceDuTileset.largeur = this.width / taille;
	}
	this.image.src = "tilesets/" + url + ".png";
}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
	var xSourceEnTiles = numero % this.largeur;
	if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
	var ySourceEnTiles = Math.ceil(numero / this.largeur);
	
	var xSource = (xSourceEnTiles - 1) * this.taille;
	var ySource = (ySourceEnTiles - 1) * this.taille;
	
	context.drawImage(this.image, xSource, ySource, this.taille, this.taille, xDestination, yDestination, this.taille, this.taille);
}
