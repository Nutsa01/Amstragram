export default function formatDate(dateString) {
    const annee = dateString.substring(0, 4);
    const mois = dateString.substring(4, 6);
    const jour = dateString.substring(6, 8);

    // Enleve limpact du fuseau horaire
    const isoDateString = `${annee}-${mois}-${jour}T00:00:00Z`;

    // Crée un objet Date de la date sans impact
    const date = new Date(isoDateString);

    // Options pour afficher le format de la date qu'on veut
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    };

    // Formater la date en utilisant la langue et les options
    let dateFormatee = new Intl.DateTimeFormat('fr-FR', options).format(date);
    
    // Mettre en majuscule la première lettre du jour et du mois, ajouter "le" et une virgule
    dateFormatee = dateFormatee.charAt(0).toUpperCase() + dateFormatee.slice(1);
    dateFormatee = dateFormatee.replace(/ (\d+)/, ', le $1');
    
    // La date affichee
    return dateFormatee;
}


export function tempsDepuis(timestamp) {
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      console.error('Timestamp invalide :', timestamp);
      return 'Date invalide' + timestamp;
    }
  
    const maintenant = new Date().getTime();
    const ecoule = maintenant - timestamp;
  
    const msParMinute = 60 * 1000;
    const msParHeure = msParMinute * 60;
    const msParJour = msParHeure * 24;
    const msParMois = msParJour * 30;
    const msParAn = msParJour * 365;

    if (ecoule < msParMinute) {
      const secondes = Math.floor(ecoule / 1000);
      return `${secondes}s`;
    } else if (ecoule < msParHeure) {
      const minutes = Math.floor(ecoule / msParMinute);
      return `${minutes}min`;
    } else if (ecoule < msParJour) {
      const heures = Math.floor(ecoule / msParHeure);
      return `${heures}h`;
    } else if (ecoule < msParMois) {
      const jours = Math.floor(ecoule / msParJour);
      return `${jours}j`;
    } else if (ecoule < msParAn) {
      const mois = Math.floor(ecoule / msParMois);
      return `${mois}mo`;
    } else {
      const annees = Math.floor(ecoule / msParAn);
      return `${annees}a`;
    }
}
