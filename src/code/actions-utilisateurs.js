import { doc, updateDoc, setDoc, getDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { bd, collPublications, collComs, collSousComs } from "./init";
import { v4 as uuidv4 } from "uuid";

export async function ajouterLikePublication(publicationId, idUtil) {
    const publicationRef = doc(bd, collPublications, publicationId);

        await updateDoc(publicationRef, {
            [`aime`]: arrayUnion(idUtil)
        })
   
}

export async function enleverLikePublication(publicationId, idUtil) {
    const publicationRef = doc(bd, collPublications, publicationId);

    await updateDoc(publicationRef, {
        [`aime`]: arrayRemove(idUtil)
    })
}

export async function ajouterCommentaire(texte, publicationId, idUtil, nomUtil, avatarUtil, timestamp) {
    const commentairePublicationRef = doc(bd, collPublications, publicationId, collComs, uuidv4());

    await setDoc(commentairePublicationRef,{
        idUtil: idUtil,
        nomUtil: nomUtil,
        avatar: avatarUtil,
        texte: texte,
        timestamp: timestamp,
        votes: null,
    })
}

export async function supprimerCommentaire(publicationId, idCommentaire) {
    const commentaireRef = doc(bd, collPublications, publicationId, collComs, idCommentaire);
    await deleteDoc(commentaireRef);
}

export async function ajouterVoteCommentaire(publicationId, idCommentaire, idUtil, vote, ouvreNotification) {
    const commentaireRef = doc(bd, collPublications, publicationId, collComs, idCommentaire);
  
    const commentaireDoc = await getDoc(commentaireRef);
    if (commentaireDoc.exists()) {
      const commentaireData = commentaireDoc.data();
      const commentaireVotes = commentaireData.votes || {};

      if (commentaireVotes[idUtil] === vote) {
        delete commentaireVotes[idUtil];
        ouvreNotification('info', 'Vote retiré', 'Votre vote a été retiré !', 2);
      } else {
        commentaireVotes[idUtil] = vote;
        if (vote === 1) {
          ouvreNotification('info', 'Vote positif ajouté', 'Votre vote a été ajouté !', 2);
        } else if (vote === -1) {
          ouvreNotification('info', 'Vote négatif ajouté', 'Votre vote a été ajouté !', 2);
        }
      }
  
      await updateDoc(commentaireRef, {
        votes: commentaireVotes
      });
    } else {
      console.error("Commentaire non existant");
    }
  }
  
export async function ajouterSousCommentaire(texte, publicationId, idUtil, nomUtil, avatarUtil, timestamp, idCommentaire) {
    const sousCommentaireRef = doc(bd, collPublications, publicationId, collComs, idCommentaire, collSousComs, uuidv4());

    await setDoc(sousCommentaireRef,{
        idUtil: idUtil,
        nomUtil: nomUtil,
        avatar: avatarUtil,
        texte: texte,
        timestamp: timestamp,
        votes: null,
    })
}

export async function supprimerSousCommentaire(publicationId, idCommentaire, idSousCommentaire) {
  const sousCommentaireRef = doc(bd, collPublications, publicationId, collComs, idCommentaire, collSousComs, idSousCommentaire);

  await deleteDoc(sousCommentaireRef);
}

export async function ajouterVoteSousCommentaire(publicationId, idCommentaire, idSousCommentaire, idUtil, vote, ouvreNotification) {
  const sousCommentaireRef = doc(bd, collPublications, publicationId, collComs, idCommentaire, collSousComs, idSousCommentaire);

  const sousCommentaireDoc = await getDoc(sousCommentaireRef);

  if (sousCommentaireDoc.exists()) {
    const sousCommentaireVotes = sousCommentaireDoc.data().votes || {};

    if (sousCommentaireVotes[idUtil] === vote) {
      delete sousCommentaireVotes[idUtil];
      ouvreNotification('info', 'Vote retiré', 'Votre vote a été retiré !', 2);
    } else {
      sousCommentaireVotes[idUtil] = vote;
      if (vote === 1) {
        ouvreNotification('info', 'Vote positif ajouté', 'Votre vote a été ajouté !', 2);
      } else if (vote === -1) {
        ouvreNotification('info', 'Vote négatif ajouté', 'Votre vote a été ajouté !', 2);
      }
    }

    await updateDoc(sousCommentaireRef, {
      votes: sousCommentaireVotes
    })
  } else {
    console.error("Sous commentaire existe pas");
  }

}
