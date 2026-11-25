import "./Appli.scss";
import React, { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import frFR from "antd/locale/fr_FR";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");
import Menu from "./Menu";
import Contenu from "./Contenu";
import {
  connexion,
  deconnexion,
  observerEtatConnexion,
} from "../code/utilisateurs";

function Appli() {
  // L'onglet actif et l'utilisateur
  const [ongletActif, setOngletActif] = useState("Accueil");
  const [utilisateur, setUtilisateur] = useState(null);


  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, []);

  useEffect(() => {}, [ongletActif]);

  return (
    // Change ce qui est compliqué à changer en scss
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: "#2d6a86",
          colorLink: "#2d6a86",
          colorText: "#1b2420",
          colorTextSecondary: "#66706a",
          colorBorder: "#dce2da",
          colorBgLayout: "#edf0ea",
          fontFamily: '"Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", sans-serif',
          borderRadius: 10,
        },
        components: {
          Input: {
            activeBorderColor: "#2d6a86",
            hoverBorderColor: "#2d6a86",
            colorBorder: "#dce2da",
          },
          Layout: {
            siderBg: "#17332c",
            headerBg: "#17332c",
            bodyBg: "#edf0ea",
          },
          Menu: {
            darkItemBg: "#17332c",
            darkSubMenuItemBg: "#17332c",
            darkItemColor: "rgba(237, 240, 234, 0.72)",
            darkItemHoverColor: "#ffffff",
            darkItemHoverBg: "#22453c",
            darkItemSelectedBg: "#22453c",
            darkItemSelectedColor: "#b9c9a5",
            itemBorderRadius: 10,
            itemHeight: 46,
            iconSize: 18,
            collapsedIconSize: 18,
          },
        },
      }}
    >
      <div className="Appli">
        <Menu
          setOngletActif={setOngletActif}
          ongletActif={ongletActif}
          connexion={connexion}
          deconnexion={deconnexion}
          utilisateur={utilisateur}
        />
        <Contenu
          ongletActif={ongletActif}
          setOngletActif={setOngletActif}
          connexion={connexion}
          deconnexion={deconnexion}
          utilisateur={utilisateur}
          setUtilisateur={setUtilisateur}
        />
      </div>
    </ConfigProvider>
  );
}

export default Appli;
