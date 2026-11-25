import "./Publication.scss";
import EntetePublication from "./EntetePublication";
import ImagePublication from "./ImagePublication";
import InfosPublication from "./InfosPublication";
import ActionsPublication from "./ActionsPublication";
import CommentairesPublication from "./CommentairesPublication";
import FlechesPublication from "./FlechesPublication";
import React, { useRef } from "react";
import { LikeTempsReel, CommentaireTempsReel }from "./PublicationTempsReel";

function Publication({
  url,
  datePubli,
  motsCles,
  premierePublication,
  suivantePublication,
  precedentePublication,
  dernierePublication,
  publications,
  publicationActuelleIndex,
  publicationId,
  utilisateur,
  gererRecherche,
}) {

  const { likes, dejaLike } = LikeTempsReel(publicationId, utilisateur);
  const { commentaires, nbrCommentaires } = CommentaireTempsReel(publicationId);
  const saisieCommentaireRef = useRef(null);

  const allerBarreCommentaire = () => {
    if (saisieCommentaireRef.current) {
      console.log(saisieCommentaireRef.current);
      saisieCommentaireRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article className="Publication">
      <EntetePublication datePubli={datePubli} motsCles={motsCles} gererRecherche={gererRecherche} />
      <ImagePublication url={url} />
      <FlechesPublication
        premierePublication={premierePublication}
        precedentePublication={precedentePublication}
        suivantePublication={suivantePublication}
        dernierePublication={dernierePublication}
        publications={publications}
        publicationActuelleIndex={publicationActuelleIndex}
      />
      <div className="Publication-reactions">
        <InfosPublication nbrAime={likes} nbrCommentaire={nbrCommentaires}  />
        <ActionsPublication publicationId={publicationId} utilisateur={utilisateur} dejaLike={dejaLike} allerBarreCommentaire={allerBarreCommentaire}/>
      </div>
      <CommentairesPublication commentaires={commentaires}  utilisateur={utilisateur} publicationId={publicationId} saisieCommentaireRef={saisieCommentaireRef} />
    </article>
  );
}

export default Publication;
