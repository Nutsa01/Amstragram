import "./MenuBureau.scss";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar } from "antd";
import { useNotification } from "./Notifications";
import formatNom from "../code/formatNom";

const { Sider } = Layout;


// Fonction de ant afin de mettre des item dans le menu
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function MenuBureau({
  ongletActif,
  setOngletActif,
  connexion,
  deconnexion,
  utilisateur,
}) {

  // Initialise la fonction pour utiliser les notification
  const ouvreNotification = useNotification();

  // Etat si le menu est reduit ou pas
  const [collapsed, setCollapsed] = useState(false);
  // Les onglets du menu grace a la fonction ant en haut
  const itemsMenu = [
    getItem("Accueil", "Accueil", <HomeOutlined />),
    getItem("Recherche", "Recherche", <SearchOutlined />),
    getItem("Paramètres", "Parametres", <SettingOutlined />),
  ];


  const gereCliqueMenu = (key) => {
    console.log("Onglet cliquer:", key["key"]);
    setOngletActif(key["key"]);
  };

  return (
    <Layout className="MenuBureau">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={248}
        collapsedWidth={84}
      >
        <div className="MenuBureau-contenu">
          <div className="entete">
            {!collapsed && <span className="marque">Amstragram</span>}
            <Button
              type="text"
              className="boutonReduire"
              aria-label={collapsed ? "Ouvrir le menu" : "Réduire le menu"}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>

          {utilisateur ? (
            collapsed ? (
              <div className="profilReduit">
                <Avatar size={44} src={utilisateur.avatar || "/placeholderAvatar.jpg"} />
              </div>
            ) : (
              <div className="profil">
                <Avatar size={48} src={utilisateur.avatar || "/placeholderAvatar.jpg"} />
                <div className="profilTexte">
                  <span className="nom">{formatNom(utilisateur.nomComplet) || "Votre nom"}</span>
                  {utilisateur.bio ? <span className="bio">{utilisateur.bio}</span> : null}
                </div>
              </div>
            )
          ) : collapsed ? (
            <Button
              className="boutonGoogle reduit"
              aria-label="Se connecter avec Google"
              icon={<FcGoogle />}
              onClick={() => connexion(ouvreNotification)}
            />
          ) : (
            <Button className="boutonGoogle" onClick={() => connexion(ouvreNotification)}>
              <FcGoogle /> Se connecter avec Google
            </Button>
          )}

          <Menu
            theme="dark"
            selectedKeys={[ongletActif]}
            onClick={gereCliqueMenu}
            mode="inline"
            items={itemsMenu}
          />

          {utilisateur && (
            <Button
              type="text"
              className="boutonDeconnexion"
              aria-label="Se déconnecter"
              icon={<LogoutOutlined />}
              onClick={() => deconnexion(ouvreNotification)}
            >
              {!collapsed && "Se déconnecter"}
            </Button>
          )}
        </div>
      </Sider>
    </Layout>
  );
}

export default MenuBureau;
