function Inventaire(taille) {
    this.objets = [];
    if(taille > 6) {
        this.objets.length = 6
    } else {
        this.objets.length = taille;
    }
    var inventaire = document.getElementById('inventaire');
    var HTML = "";
    for(var i = 0; i < this.objets.length; i++) {
        HTML = HTML + "<div class='emplacement' id='emplacement" + i + "'>" + (i+1) + "</div>";
    }
    inventaire.innerHTML = HTML;
}

Inventaire.prototype.addObjet = function (nomObjet) {
    var pos = this.addElement(nomObjet);
    console.log(pos);
    var divInventaire = document.getElementById('emplacement' + pos);
    switch(nomObjet) {
        case constantes.Cle :
            divInventaire.innerHTML = divInventaire.innerHTML + "<br><img src='cle_doree.png' alt='Une clé en dorée' class='objet'>";
            break;
        default :
            document.getElementById("interaction").innerHTML = "rien";
    }
};

Inventaire.prototype.getObjet = function (nomObjet) {
    for(var i = 0; i < this.objets.length; i++) {
       if(this.objets[i] == nomObjet) return true;
    }
    return false;
};

Inventaire.prototype.addElement = function (element) {
    if(this.objets.indexOf(element) === -1) {
        for(var i = 0; i < this.objets.length; i++) {
            if(this.objets[i] == null || this.objets[i] == "") {
                this.objets[i] = element;
                return i;
            }
        }
    } else {
        return this.objets.indexOf(nomObjet);
    }
}