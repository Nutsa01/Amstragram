import "./Menu.scss";
import React from "react";
import { useMediaQuery } from "react-responsive";
import MenuBureau from "./MenuBureau";
import MenuMobile from "./MenuMobile";

function Menu({ setOngletActif, ongletActif, connexion, deconnexion, utilisateur }) {

  // Vérifie si il est en version mobile ou pas dépendamment de la largeur
  const enMobile = useMediaQuery({ maxWidth: 768 });


  // Si il est en mobile, montre le menu mobile, sinon montre le menu bureau
  return (
    <div className="Menu">
      {enMobile ? (<MenuMobile setOngletActif={setOngletActif} ongletActif={ongletActif} connexion={connexion} deconnexion={deconnexion} utilisateur={utilisateur}/>) 
                : (<MenuBureau setOngletActif={setOngletActif} ongletActif={ongletActif} connexion={connexion} deconnexion={deconnexion} 
                utilisateur={utilisateur} />)}
    </div>
  );
}
export default Menu;
