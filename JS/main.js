//Création des maps
var maps = [];
for (var i = 0; i < 9; i++) {
    maps[i] = new Map("Ile", i);
    console.log("Chargement de la couche " + (i+1) + "...");
}

var obstacles = [];
obstacles.push(maps[1]);
obstacles.push(maps[5]);
obstacles.push(maps[6]);
obstacles.push(maps[7]);
obstacles.push(maps[8]);

var cleTrouvee = false;

var porteOuverte = false;
var joueur;

window.onload = function() {
    // Création du joueur
    joueur = new Personnage("soldat.png", 13, 14, DIRECTION.BAS);
    var direction = DIRECTION.BAS;
    maps[2].addPersonnage(joueur);
    
	var canvas = document.getElementById('canvas');
    var game = document.getElementById('game');
	var ctx = canvas.getContext('2d');
    var libelle = document.getElementById('down');
    
	canvas.width  = maps[0].getLargeur() * maps[0].getTailleTile();
	canvas.height = maps[0].getHauteur() * maps[0].getTailleTile();
    game.style.width = canvas.width + "px";
    

	var eau1 = constantes.NB_FRAMES_EAU;
    var cascade1 = constantes.NB_FRAMES_CASCADE; 
    var eau2 = 0;
    var cascade2 = 0;
    var cle1 = constantes.NB_FRAMES_CLE;
    var cle2 = 0;
    var cle3 = 0;
    var cle4 = 0;
    
    main = function () {
        drawLowerLayers(ctx);
        if(cle1 != 0 && !cleTrouvee) {
            maps[2].terrain[2][2] = 366;
            cle1 = cle1 - 1;
            if(cle1 == 0) {
                cle2 = constantes.NB_FRAMES_CLE;
            }
        } else if (cle2 != 0 && !cleTrouvee) {
            maps[2].terrain[2][2] = 367;
            cle2 = cle2 - 1;
            if(cle2 == 0) {
                cle3 = constantes.NB_FRAMES_CLE;
            }
        } else if (cle3 != 0 && !cleTrouvee) {
            maps[2].terrain[2][2] = 368;
            cle3 = cle3 - 1;
            if(cle3 == 0){
              cle4 = constantes.NB_FRAMES_CLE;  
            } 
        } else if (cle4 != 0 && !cleTrouvee) {
            maps[2].terrain[2][2] = 367;
            cle4 = cle4 - 1;
            if(cle4 == 0){
              cle1 = constantes.NB_FRAMES_CLE;  
            } 
        }
        maps[2].dessinerMap(ctx);
        
        maps[2].dessinerPersonnage(ctx);
        drawUpperLayers(ctx);
        
        if(eau1 != 0) {
            maps[6].dessinerMap(ctx);
            eau1 = eau1 - 1;
            if(eau1 == 0) eau2 = constantes.NB_FRAMES_EAU;
        } else if(eau2 != 0) {
            maps[5].dessinerMap(ctx);
            eau2 = eau2 - 1;
            if(eau2 == 0) eau1 = constantes.NB_FRAMES_EAU;
        }
        
        if(cascade1 != 0) {
            maps[7].dessinerMap(ctx);
            cascade1 = cascade1 - 1;
            if(cascade1 == 0) cascade2 = constantes.NB_FRAMES_CASCADE;
        } else if(cascade2 != 0) {
            maps[8].dessinerMap(ctx);
            cascade2 = cascade2 - 1;
            if(cascade2 == 0) cascade1 = constantes.NB_FRAMES_CASCADE;
        }
        
        if(porteOuverte && joueur.getPositionY() == 12 && joueur.getPositionX() == 8) {
            endGame();
        }
        requestAnimationFrame(main);
    };
    requestAnimationFrame(main);
    console.log("Chargement fini !");
    
    // Gestion du clavier
	window.onkeydown = function(event) {
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
				joueur.deplacer(DIRECTION.HAUT, obstacles);
                direction = DIRECTION.HAUT;
				break;
			case 40 : case 115 : case 83 : // Flèche bas, s, S
				joueur.deplacer(DIRECTION.BAS, obstacles);
                direction = DIRECTION.BAS;
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
				joueur.deplacer(DIRECTION.GAUCHE, obstacles);
                direction = DIRECTION.GAUCHE;
				break;
			case 39 : case 100 : case 68 : // Flèche droite, d, D
				joueur.deplacer(DIRECTION.DROITE, obstacles);
                direction = DIRECTION.DROITE;
				break;
            case 70 : case 102 : // f, F
                interaction(joueur.interagir(direction, maps[2]));
                endGame();
                break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}
}

// On déssine les couches inférieur au personnage
drawLowerLayers = function (ctx) {
    maps[0].dessinerMap(ctx);
    maps[1].dessinerMap(ctx);
    maps[3].dessinerMap(ctx);
}

// On déssine les couches supérieur au personnage
drawUpperLayers = function (ctx) {
    maps[4].dessinerMap(ctx);
}

// On vérifie ce que doit faire l'interaction avec le tile passé en paramètre
interaction = function (numTileset) {
    console.log(numTileset);
    switch(numTileset) {
        case 51 :
            document.getElementById("interaction").innerHTML = constantes.Serrure;
            if(joueur.getInventaire().getObjet(constantes.Cle)) {
                afficherPorte();
            }
            break;
        case 366 :
        case 367 :
        case 368 :
            document.getElementById("interaction").innerHTML = constantes.Cle;
            joueur.getInventaire().addObjet(constantes.Cle);
            cleTrouvee = true;
            maps[2].terrain[joueur.getPositionY()][joueur.getPositionX()] = 0;
            break;
        default :
            document.getElementById("interaction").innerHTML = "rien";
    }
}

// On affiche la porte et on débloque l'entrée
afficherPorte = function () {
    maps[2].terrain[11][8] = 342;
    maps[2].terrain[12][8] = 365;
    maps[1].terrain[12][8] = 0;
    porteOuverte = true;
}

// On affiche l'écran de fin du jeu
endGame = function () {
    $(document).ready(function(){
        $("#canvas").fadeTo("slow", 0.15);
        $("#endgame").prop("hidden", false);
    });
}
