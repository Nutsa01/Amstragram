import { useEffect, useState } from 'react';
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { bd, collPublications } from '../code/init';

export const LikeTempsReel = (publicationId, utilisateur) => {
  const [likes, setLikes] = useState(0);
  const [dejaLike, setDejaLike] = useState(false);

  useEffect(() => {
    const publicationRef = doc(bd, collPublications, publicationId);
    const unsubscribe = onSnapshot(publicationRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const donnees = docSnapshot.data();
        const aimeArray = donnees.aime || [];
        setLikes(aimeArray.length || 0);
        if (utilisateur) {
          setDejaLike(aimeArray.includes(utilisateur.uid));
        } else {
          setDejaLike(false);
        }
      } else {
        console.log("Le document n'existe pas");
      }
    });

    return () => unsubscribe();
  }, [publicationId, utilisateur]);

  return { likes, dejaLike };
};

export const CommentaireTempsReel = (publicationId) => {
  const [commentaires, setCommentaires] = useState([]);
  const [nbrCommentaires, setNbrCommentaires] = useState(0);

  useEffect(() => {
    const commentairesRef = collection(bd, collPublications, publicationId, 'commentaires');
    const q = query(commentairesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentairesMisAJour = querySnapshot.docs.map(commentDoc => {
        const sousCommentairesRef = collection(bd, collPublications, publicationId, 'commentaires', commentDoc.id, 'sousCommentaires');
        const sousCommentairesQuery = query(sousCommentairesRef, orderBy('timestamp', 'desc'));
        
        onSnapshot(sousCommentairesQuery, (sousComQuerySnapshot) => {
          const sousCommentaires = sousComQuerySnapshot.docs.map(sousComDoc => ({
            id: sousComDoc.id,
            ...sousComDoc.data()
          }));

          setCommentaires(prevCommentaires => prevCommentaires.map(commentaire => 
            commentaire.id === commentDoc.id ? { ...commentaire, sousCommentaires, scoreVotes } : commentaire
          ));
        });

        const votes = commentDoc.data().votes || {};
        const scoreVotes = Object.values(votes).reduce((total, vote) => total + vote, 0);

        return {
          id: commentDoc.id,
          ...commentDoc.data(),
          sousCommentaires: [], 
          scoreVotes,
        };
      });

      // console.log(commentairesMisAJour);

      const commentairesTrier = commentairesMisAJour.sort((a, b) => b.scoreVotes - a.scoreVotes);

      setCommentaires(commentairesTrier);
      setNbrCommentaires(querySnapshot.size);
    });

    return () => unsubscribe();
  }, [publicationId]);

  return { commentaires, nbrCommentaires };
};

export default { LikeTempsReel, CommentaireTempsReel };
