import React from "react";
import { Button, Popover, Avatar } from "antd";
import { FcGoogle } from "react-icons/fc";
import classNames from "classnames";
import "./MenuMobile.scss";
import {
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNotification } from "./Notifications";
import formatNom from "../code/formatNom";

const items = [
  {
    key: "Accueil",
    label: "Accueil",
    icone: <HomeOutlined />,
  },
  {
    key: "Recherche",
    label: "Recherche",
    icone: <SearchOutlined />,
  },
  {
    key: "Parametres",
    label: "Paramètres",
    icone: <SettingOutlined />,
  },
];

function MenuMobile({
  setOngletActif,
  ongletActif,
  connexion,
  deconnexion,
  utilisateur,
}) {

   // Initialise la fonction pour utiliser les notification
  const ouvreNotification = useNotification();
  
  const onTabClick = (key) => {
    console.log("Onglet cliquer", key);
    setOngletActif(key);
  };
  const profilFenetre = (
    <div>{utilisateur?.bio ?? ""}</div>
  );
  return (
    <div className="MenuMobile">
      <header className="barreHaut">
        <span className="marque">Amstragram</span>
        {utilisateur ? (
          <div className="compte">
            <Popover
              trigger="click"
              placement="bottomRight"
              title={formatNom(utilisateur.nomComplet)}
              content={profilFenetre}
              arrow={false}
            >
              <button type="button" className="avatarBouton" aria-label="Voir mon profil">
                <Avatar size={34} src={utilisateur.avatar} />
              </button>
            </Popover>
            <Button
              type="text"
              className="boutonDeconnexion"
              aria-label="Se déconnecter"
              icon={<LogoutOutlined />}
              onClick={() => deconnexion(ouvreNotification)}
            />
          </div>
        ) : (
          <button type="button" className="boutonGoogle" onClick={() => connexion(ouvreNotification)}>
            <FcGoogle /> Connexion
          </button>
        )}
      </header>

      <nav className="barreOnglets" aria-label="Navigation principale">
        {items.map((item) => (
          <button
            type="button"
            key={item.key}
            className={classNames("onglet", { actif: ongletActif === item.key })}
            aria-current={ongletActif === item.key ? "page" : undefined}
            onClick={() => onTabClick(item.key)}
          >
            {item.icone}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
export default MenuMobile;
