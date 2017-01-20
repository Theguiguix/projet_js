class Map {
  constructor(nom) {
    var xhr = getXMLHttpRequest();
    // Chargement du fichier
    xhr.open("GET", './maps/' + nom + '.json', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;
  }
}