import React, { useState } from "react";
import "./Accueil.scss";
import Publication from "./Publication";



function Accueil({utilisateur, publications, setOngletActif, gererRecherche}) {

  const [publicationActuelleIndex, setPublicationActuelleIndex] = useState(0);

  const premierePublication = () => {setPublicationActuelleIndex(0);};
  const suivantePublication = () => {setPublicationActuelleIndex((indexActuel) => (indexActuel + 1) % publications.length);};
  const precedentePublication = () => {setPublicationActuelleIndex((indexActuel) => (indexActuel - 1 + publications.length) % publications.length);};
  const dernierePublication = () => {setPublicationActuelleIndex(publications.length - 1);};

  return (
    <div className="Accueil">
      {publications.length > 0 && (
        <>
          {publications.map(
            (publication, index) =>
              index === publicationActuelleIndex && (
                <Publication
                  key={publication.id}
                  publicationId={publication.id}
                  url={publication.url}
                  nbrAime={publication.aime}
                  datePubli={publication.dpub}
                  nbrCommentaire={publication.commentaires.length}
                  motsCles={publication.motsCles}
                  commentaires={publication.commentaires}
                  premierePublication={premierePublication}
                  precedentePublication={precedentePublication}
                  suivantePublication={suivantePublication}
                  dernierePublication={dernierePublication}
                  publications={publications}
                  publicationActuelleIndex={publicationActuelleIndex}
                  utilisateur={utilisateur}
                  gererRecherche={gererRecherche}
                />
              )
          )}
        </>
      )}
    </div>
  );
}

export default Accueil;
