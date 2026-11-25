import React, { useState, useEffect } from "react";
import "./Contenu.scss";
import "./Appli.scss";
import Accueil from "./Accueil";
import Recherche from "./Recherche";
import Parametres from "./Parametres";
import { obtenirPublication } from "../code/publication-modele";

function Contenu({
  ongletActif,
  setOngletActif,
  utilisateur,
  connexion,
  deconnexion,
  setUtilisateur
}) {

  // Etat des publications pris de firebase
  const [publications, setPublications] = useState([]);
  // Etat des options (tous les mots cles existant dans firebase)
  const [options, setOptions] = useState([]);
  // Etat du mot entrain de se faire chercher
  const [motRecherche, setMotRecherche] = useState("");

  // Met le mot entrain de se faire marcher selon le mot clé cherché/cliqué, puis va dans l'onglet recherche
  const gererRecherche = (motCle) => {
    setMotRecherche(motCle);
    setOngletActif("Recherche");
  };

  useEffect(() => {}, [ongletActif]); 

  useEffect(() => {
    const obtenirLesPublications = async () => {
      const lesPublications = await obtenirPublication();
      const lesPublicationsOrdonner = lesPublications.sort((a, b) => {
        const dateA = new Date(a.dpub.substring(0, 4), a.dpub.substring(4, 6) - 1, a.dpub.substring(6, 8));
        const dateB = new Date(b.dpub.substring(0, 4), b.dpub.substring(4, 6) - 1, b.dpub.substring(6, 8));
        return dateB - dateA;
      });
      setPublications(lesPublicationsOrdonner);
    };

    obtenirLesPublications();
  }, []);

  
  useEffect(() => {
    const motsClesTableau = [];
    publications.forEach((publication) => {
      publication.motsCles.forEach((motCle) => {
        if (!motsClesTableau.includes(motCle)) {
          motsClesTableau.push(motCle);
        }
      });
    });
    setOptions(motsClesTableau.map((motCle) => ({ value: motCle })));
  }, [publications]);

  return (
    <div className="Contenu">
      {ongletActif === "Accueil" && (
        <Accueil
          utilisateur={utilisateur}
          publications={publications}
          setOngletActif={setOngletActif}
          gererRecherche={gererRecherche}

        />
      )}
      {ongletActif === "Recherche" && (
        <Recherche
          utilisateur={utilisateur}
          publications={publications}
          options={options}
          setOngletActif={setOngletActif}
          gererRecherche={gererRecherche}
          setMotRecherche={setMotRecherche}
          motRecherche={motRecherche}
        />
      )}
      {ongletActif === "Parametres" && (
        <Parametres
          utilisateur={utilisateur}
          connexion={connexion}
          deconnexion={deconnexion}
          setUtilisateur={setUtilisateur}
        />
      )}
    </div>
  );
}

export default Contenu;
