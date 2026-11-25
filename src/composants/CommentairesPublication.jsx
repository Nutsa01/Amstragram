import "./CommentairesPublication.scss";
import Commentaire from "./Commentaire";
import SaisieCommentaire from "./SaisieCommentaire";

function CommentairesPublication({ commentaires, utilisateur, publicationId, saisieCommentaireRef }) {
  // console.log(commentaires);
  return (
    <section className="CommentairesPublication" aria-label="Commentaires">
      {commentaires.length > 0 ? (
        <div className="listeCommentaires">
          {commentaires.map(commentaire => (
            <Commentaire
              key={commentaire.id}
              idCommentaire={commentaire.id}
              idUtil={commentaire.idUtil}
              nomUtil={commentaire.nomUtil}
              avatarUtil={commentaire.avatar}
              texte={commentaire.texte}
              date={commentaire.timestamp}
              votes={commentaire.votes}
              sousCommentaires={commentaire.sousCommentaires}
              publicationId={publicationId}
              utilisateur={utilisateur}
            >
            </Commentaire>
          ))}
        </div>
      ) : (
        <p className="aucunCommentaire">
          Sois le premier à commenter cette publication.
        </p>
      )}
      <SaisieCommentaire utilisateur={utilisateur} publicationId={publicationId} saisieCommentaireRef={saisieCommentaireRef}/>
    </section>
  );
}

export default CommentairesPublication;
