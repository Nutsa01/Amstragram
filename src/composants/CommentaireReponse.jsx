import "./CommentaireReponse.scss";
import { Flex, Avatar, Button } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { tempsDepuis } from "../code/formatTemps";
import { supprimerSousCommentaire, ajouterVoteSousCommentaire } from "../code/actions-utilisateurs";
import classNames from 'classnames';
import { useNotification } from "./Notifications";
import formatNom from "../code/formatNom";


function CommentaireReponse({
  idSousCommentaire,
  idUtil,
  nomUtil,
  avatarUtil,
  texte,
  date,
  votes,
  idCommentaire,
  publicationId,
  utilisateur,
}) {

  const ouvreNotification = useNotification();

  const supprimerSousComm = () => {
    ouvreNotification('success', 'Supprimé', 'Votre commentaire a été supprimé !', 2);
    supprimerSousCommentaire(publicationId, idCommentaire, idSousCommentaire); 
  }

  const ajouterVote = async (vote) => {
    try {
      await ajouterVoteSousCommentaire(publicationId, idCommentaire, idSousCommentaire ,utilisateur.uid, vote, ouvreNotification)
    } catch (error) {
      console.error(error);
    }
  }

  const voteUtil = utilisateur ? (votes ? votes[utilisateur.uid] : null) : null;

  const aimerClasses = classNames('aimer interactif', {
    'actif': voteUtil ? voteUtil === 1 : null,
  });

  const desaimerClasses = classNames('desaimer interactif', {
    'actif': voteUtil ? voteUtil === -1 : null,
  });

  return (
    <Flex className="CommentaireReponse">
      <Avatar src={avatarUtil ? avatarUtil : "/placeholderAvatar.jpg"} size={30} />
      <Flex className="corpsCommentaire" vertical >
        <div className="commentaireTexte">
          <span className="auteur">{formatNom(nomUtil)}</span> {texte}
        </div>
        <div className="commentaireInfos">
          <span>{tempsDepuis(date)}</span>
          <Button type="text" icon={<LikeFilled />}  className={aimerClasses} onClick={() => (utilisateur ? ajouterVote(1) : ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2))}>
            <span>
            { votes ? Object.values(votes).reduce(
                  (total, vote) => (vote === 1 ? total + 1 : total),
                  0
                ) : 0}
            </span>
          </Button>
          <Button type="text" icon={<DislikeFilled />} className={desaimerClasses} onClick={() => (utilisateur ? ajouterVote(-1) : ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2))}>
            <span>
              { votes ? Object.values(votes).reduce(
                  (total, vote) => (vote === -1 ? total + 1 : total),
                  0
                ) : 0}
            </span>
          </Button>
          <Button type="text" disabled={!utilisateur || utilisateur.uid != idUtil} onClick={supprimerSousComm}>Supprimer</Button>
        </div>
      </Flex>
    </Flex>
  );
}

export default CommentaireReponse;
