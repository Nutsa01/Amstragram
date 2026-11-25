import "./SaisieCommentaire.scss";
import { Button, Input, Flex, Avatar } from "antd";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { ajouterCommentaire } from "../code/actions-utilisateurs";
import { useNotification } from "./Notifications";

function SaisieCommentaire({ utilisateur, publicationId, saisieCommentaireRef }) {
  const [commentaire, setCommentaire] = useState("");


  const ouvreNotification = useNotification();


  const enregistreCommentaire = (e) => {
    setCommentaire(e.target.value);
  };

  const ajoutCommentaire = async (e) => {
    e.preventDefault();
    if (!commentaire.trim()) {
      return;
    }
    try {
      await ajouterCommentaire(
        commentaire,
        publicationId,
        utilisateur.uid,
        utilisateur.nomComplet,
        utilisateur.avatar,
        Date.now()
      );
      ouvreNotification('success', 'Envoyé', 'Votre commentaire a été envoyé !', 2);
      setCommentaire("");
    } catch (error) {
      console.error("Ajout commentaire marche pas", error);
    }
  };


  return (
    <Flex className="SaisieCommentaire" ref={saisieCommentaireRef}>
      <Avatar
        src={utilisateur?.avatar ? utilisateur.avatar : '/placeholderAvatar.jpg'}
        size={36}
        className="avatarSaisie"
      />
      <Input
        placeholder={utilisateur ? "Écris ton commentaire" : "Connecte-toi pour commenter"}
        onChange={enregistreCommentaire}
        value={commentaire}
        onPressEnter={utilisateur ? ajoutCommentaire : null}
        disabled={!utilisateur}
      />
      <Button type="text" aria-label="Envoyer" onClick={ajoutCommentaire} disabled={!utilisateur || !commentaire.trim()}>
        <IoSend />
      </Button>
    </Flex>
  );
}

export default SaisieCommentaire;
