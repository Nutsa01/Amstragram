import React, { useState, useEffect } from "react";
import "./Recherche.scss";
import BarreRecherche from "./BarreRecherche";
import Publication from "./Publication";


function Recherche({utilisateur, publications, options, motRecherche, setMotRecherche, gererRecherche, setOngletActif}) {
  const [publicationActuelleIndex, setPublicationActuelleIndex] = useState(0);
  
  const [publicationsFiltrees, setPublicationsFiltrees] = useState(publications);

  useEffect(() => {
    if (motRecherche) {
      const filtered = publications.filter(publication =>
        publication.motsCles.includes(motRecherche)
      );
      setPublicationsFiltrees(filtered);
    } else {
      setPublicationsFiltrees(publications);
    }
  }, [motRecherche, publications]);


  const premierePublication = () => {setPublicationActuelleIndex(0);};
  const suivantePublication = () => {setPublicationActuelleIndex((indexActuel) => (indexActuel + 1) % publicationsFiltrees.length);};
  const precedentePublication = () => {setPublicationActuelleIndex((indexActuel) => (indexActuel - 1 + publicationsFiltrees.length) % publicationsFiltrees.length);};
  const dernierePublication = () => {setPublicationActuelleIndex(publicationsFiltrees.length - 1);};


  return (
    <div className="Recherche">
      <BarreRecherche setPublicationActuelleIndex={setPublicationActuelleIndex} options={options} motRecherche={motRecherche} setMotRecherche={setMotRecherche} gererRecherche={gererRecherche} />
      {publicationsFiltrees.length === 0 && motRecherche && (
        <p className="aucunResultat">Aucune publication avec le mot-clé « {motRecherche} ».</p>
      )}
      {publicationsFiltrees.length > 0 && (
        <>
          {publicationsFiltrees.map(
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
                  publications={publicationsFiltrees}
                  publicationActuelleIndex={publicationActuelleIndex}
                  utilisateur={utilisateur}
                  setOngletActif={setOngletActif}
                  gererRecherche={gererRecherche}
                />
              )
          )}
        </>
      )}
    </div>
  );
}

export default Recherche;
