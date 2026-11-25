import { collection, getDocs } from "firebase/firestore";
import { bd, collPublications, collComs } from "./init";

export async function obtenirPublication() {
  const publicationQuerySnapshot = await getDocs(collection(bd, collPublications));
  const publications = await Promise.all(publicationQuerySnapshot.docs.map(async (publicationDoc) => {
      const publicationDonnees = publicationDoc.data();
      const commentaireQuerySnapshot = await getDocs(collection(bd, collPublications, publicationDoc.id, collComs));
      
      // Récupérer les commentaires et leurs sous-commentaires
      const commentaires = await Promise.all(commentaireQuerySnapshot.docs.map(async (commentDoc) => {
          const commentDonnees = commentDoc.data();
          const sousCommentaireQuerySnapshot = await getDocs(collection(bd, collPublications, publicationDoc.id, collComs, commentDoc.id, 'sousCommentaires'));
          const sousCommentaires = sousCommentaireQuerySnapshot.docs.map(sousComDoc => sousComDoc.data());
          
          return {
              id: commentDoc.id,
              ...commentDonnees,
              sousCommentaires
          };
      }));

      return {
          id: publicationDoc.id,
          ...publicationDonnees,
          commentaires
      };
  }));
    // console.log(publications);
  return publications;
}

export default obtenirPublication;
