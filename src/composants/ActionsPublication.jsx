import './ActionsPublication.scss';
import { HeartFilled } from "@ant-design/icons";
import { BsChatFill } from "react-icons/bs";
import { Button } from 'antd';
import { ajouterLikePublication, enleverLikePublication } from '../code/actions-utilisateurs';
import classNames from 'classnames';
import { useNotification } from "./Notifications";


function ActionsPublication({publicationId, utilisateur, dejaLike, allerBarreCommentaire}) {

    const ouvreNotification = useNotification();

    const basculerLike = () => {
        if(dejaLike) {
            ouvreNotification('info', 'Like supprimé', 'Vous avez supprimé votre like sur cette publication !', 2)
            enleverLikePublication(publicationId, utilisateur.uid)
        } else {
            ouvreNotification('info', 'Like ajouté', 'Vous avez ajouté un like sur cette publication !', 2)
            ajouterLikePublication(publicationId, utilisateur.uid)
        }
    }
    
    
    const aimerClasses = classNames({
        'dejaLike' : dejaLike && utilisateur,
        'actif' : true,
    })

    console.log("deja", dejaLike);
    return (
        <div className='ActionsPublication'>
            <Button type="text" icon={<HeartFilled />} onClick={() => utilisateur ? basculerLike() : ouvreNotification('warning', 'Non connecté', 'Veuillez vous connecter !', 2)} className={aimerClasses} >J'aime</Button>
            <Button type="text" icon={<BsChatFill />} onClick={allerBarreCommentaire} >Commenter</Button>
        </div>
    );
}

export default ActionsPublication;