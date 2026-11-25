// Met une majuscule au début de chaque mot d'un nom : "omar lahia" -> "Omar Lahia"
// (fonctionne aussi pour les noms composés : "jean-luc" -> "Jean-Luc")
export default function formatNom(nom) {
  if (!nom) {
    return "";
  }
  return nom.replace(/(^|[\s-])(\p{L})/gu, (_, separateur, lettre) => separateur + lettre.toLocaleUpperCase("fr"));
}
