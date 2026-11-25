import "./Commentaire.scss";
import { Flex, Avatar, Button } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { tempsDepuis } from "../code/formatTemps";
import CommentaireReponse from "./CommentaireReponse";
import { useState } from "react";
import classNames from "classnames";
import {
  ajouterVoteCommentaire,
  supprimerCommentaire,
} from "../code/actions-utilisateurs";
import SaisieSousCommentaire from "./SaisieSousCommentaire";
import { useNotification } from "./Notifications";
import formatNom from "../code/formatNom";

function Commentaire({
  idUtil,
  nomUtil,
  avatarUtil,
  texte,
  date,
  votes,
  sousCommentaires,
  utilisateur,
  idCommentaire,
  publicationId,
}) {
  const [montrerReponse, setMontrerReponse] = useState(false);

  const ouvreNotification = useNotification();

  function basculerVisibilite() {
    setMontrerReponse(!montrerReponse);
    console.log(montrerReponse);
  }

  const supprimerComm = () => {
    if (!utilisateur) {
      ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2);
    } else if (utilisateur.uid != idUtil) {
      ouvreNotification('error', 'Pas votre commentaire', 'Veuillez supprimer vos commentaires !', 2); 
    } else {
      ouvreNotification('success', 'Supprimé', 'Votre commentaire a été supprimé !', 2);
      supprimerCommentaire(publicationId, idCommentaire);
    }
  };

  const ajouterVote = async (vote) => {
    try {
      await ajouterVoteCommentaire(
        publicationId,
        idCommentaire,
        utilisateur.uid,
        vote,
        ouvreNotification,
      );
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  };

  const voteUtil = utilisateur ? (votes ? votes[utilisateur.uid] : null) : null;

  const aimerClasses = classNames('aimer interactif', {
    'actif': voteUtil ? voteUtil === 1 : null,
  });

  const desaimerClasses = classNames('desaimer interactif', {
    'actif': voteUtil ? voteUtil === -1 : null,
  });
  return (
    <Flex className="Commentaire" vertical>
      <Flex className="CommentairePrincipal">
        <Avatar
          src={avatarUtil ? avatarUtil : "/placeholderAvatar.jpg"}
          size={36}
        />
        <Flex className="corpsCommentaire" vertical>
          <div className="commentaireTexte">
            <span className="auteur">{formatNom(nomUtil)}</span> {texte}
          </div>
          <div className="commentaireInfos">
            <span>{tempsDepuis(date)}</span>
            <Button
              type="text"
              icon={<LikeFilled />}
              className={aimerClasses}
              onClick={() => (utilisateur ? ajouterVote(1) : ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2))}
            >
              <span>
                {votes
                  ? Object.values(votes).reduce(
                      (total, vote) => (vote === 1 ? total + 1 : total),
                      0
                    )
                  : 0}
              </span>
            </Button>
            <Button
              type="text"
              icon={<DislikeFilled />}
              className={desaimerClasses}
              onClick={() => (utilisateur ? ajouterVote(-1) : ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2))}
            >
              <span>
                {votes
                  ? Object.values(votes).reduce(
                      (total, vote) => (vote === -1 ? total + 1 : total),
                      0
                    )
                  : 0}
              </span>
            </Button>
            <Button
              type="text"
              onClick={supprimerComm}
            >
              Supprimer
            </Button>
          </div>
        </Flex>
      </Flex>

      {montrerReponse && (
        <>
          {sousCommentaires && sousCommentaires.length > 0 ? (
            sousCommentaires.map((sousCommentaire) => (
              <CommentaireReponse
                key={sousCommentaire.id}
                idSousCommentaire={sousCommentaire.id}
                idUtil={sousCommentaire.idUtil}
                nomUtil={sousCommentaire.nomUtil}
                avatarUtil={sousCommentaire.avatar}
                texte={sousCommentaire.texte}
                date={sousCommentaire.timestamp}
                votes={sousCommentaire.votes}
                idCommentaire={idCommentaire}
                publicationId={publicationId}
                utilisateur={utilisateur}
              />
            ))
          ) : (
            <p className="aucuneReponse">Aucune réponse pour l'instant.</p>
          )}
          <SaisieSousCommentaire
            publicationId={publicationId}
            utilisateur={utilisateur}
            idCommentaire={idCommentaire}
          />
        </>
      )}

      <Button
        type="text"
        className="basculeReponses"
        onClick={basculerVisibilite}
      >
        {montrerReponse
          ? "Masquer les réponses"
          : "Voir les réponses"}
      </Button>
    </Flex>
  );
}

export default Commentaire;
