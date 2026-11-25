import { HeartFilled } from "@ant-design/icons";
import { BsChatFill } from "react-icons/bs";
import "./InfosPublication.scss";

function InfosPublication({nbrAime, nbrCommentaire}) {
  
  return (
    <div className="InfosPublication">
      <span className="infoJaimes" title="J'aime">
        <HeartFilled /> <span>{nbrAime}</span>
      </span>
      <span className="infoCommentaires" title="Commentaires">
        <BsChatFill /> <span>{nbrCommentaire}</span>
      </span>
    </div>
  );
}

export default InfosPublication;
