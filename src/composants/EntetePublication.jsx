import "./EntetePublication.scss";
import { Avatar } from "antd";
import formatDate from '../code/formatTemps.js'

function EntetePublication({datePubli, motsCles, gererRecherche}) {

  return (
    <header className="EntetePublication">
      <div className="auteur">
        <Avatar src="/photo_profil.jpg" size={44} className="avatarAuteur" />
        <div className="auteurTexte">
          <span className="nom">Nutsa</span>
          <span className="date">{formatDate(datePubli)}</span>
        </div>
      </div>
      <div className="motsCles">
        {motsCles.map(motCle => (
          <button type="button" className="puce" key={motCle} onClick={() => gererRecherche(motCle)}>
            #{motCle}
          </button>
        ))}
      </div>
    </header>
  );
}

export default EntetePublication;
