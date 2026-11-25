import "./SaisieSousCommentaire.scss";
import { Button, Input, Flex, Avatar } from "antd";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { ajouterSousCommentaire } from "../code/actions-utilisateurs";
import { useNotification } from "./Notifications";

function SaisieSousCommentaire({ utilisateur, publicationId, idCommentaire }) {
  const [commentaire, setCommentaire] = useState("");
  
  const ouvreNotification = useNotification();

  const enregistreCommentaire = (e) => {
    setCommentaire(e.target.value);
  };

  const ajoutSousCommentaire = async (e) => {
    e.preventDefault();
    if (!commentaire.trim()) {
      return;
    }
    try {
      await ajouterSousCommentaire(
        commentaire,
        publicationId,
        utilisateur.uid,
        utilisateur.nomComplet,
        utilisateur.avatar,
        Date.now(),
        idCommentaire,
      );
      ouvreNotification('success', 'Envoyé', 'Votre commentaire a été envoyé !', 2);
      setCommentaire("");
    } catch (error) {
      console.error("Ajout commentaire marche pas", error);
    }
  };


  return (
    <Flex className="SaisieSousCommentaire">
      <Avatar
        src={utilisateur?.avatar ? utilisateur.avatar : '/placeholderAvatar.jpg'}
        size={30}
        className="avatarSaisie"
      />
      <Input
        placeholder={utilisateur ? "Répondre au commentaire" : "Connecte-toi pour répondre"}
        onChange={enregistreCommentaire}
        value={commentaire}
        onPressEnter={utilisateur ? ajoutSousCommentaire : null}
        disabled={!utilisateur}
      />
      <Button type="text" aria-label="Envoyer" onClick={ajoutSousCommentaire} disabled={!utilisateur || !commentaire.trim()}>
        <IoSend />
      </Button>
    </Flex>
  );
}

export default SaisieSousCommentaire;
