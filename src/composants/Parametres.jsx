import "./Parametres.scss";
import React from 'react';
import { Avatar, Input, DatePicker, Radio, Button } from "antd";
import { bd, collUtilisateurs } from '../code/init';
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import dayjs from 'dayjs';
import { useNotification } from "./Notifications";
import formatNom from '../code/formatNom';

const { TextArea } = Input;

function Parametres({utilisateur, connexion, deconnexion, setUtilisateur}) {
  
  const ouvreNotification = useNotification();

  const changementBio = async (e) => {
    try {
      await setDoc(doc(bd, collUtilisateurs, utilisateur.uid), { bio: e.target.value }, { merge: true });
      setUtilisateur({ ...utilisateur, bio: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  const changementGenre = async (e) => {
    try {
      await setDoc(doc(bd, collUtilisateurs, utilisateur.uid), { genre: e.target.value }, { merge: true });
      setUtilisateur({ ...utilisateur, genre: e.target.value });
    } catch (error) {
      console.log(error);
    }
  }

  const changementNaissance = async (dateInfo, date) => {
    try {
      await setDoc(doc(bd, collUtilisateurs, utilisateur.uid), { dateNaissance: date }, { merge: true });
      setUtilisateur({ ...utilisateur, dateNaissance: date });
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="Parametres">
      <h1 className="titrePage">Paramètres</h1>
      {utilisateur ? (
        <div className="carteProfil">
          <div className="infosProfil">
            <Avatar src={utilisateur.avatar} size={64}></Avatar>
            <div className="identite">
              <span className="nom">{formatNom(utilisateur.nomComplet)}</span>
              {utilisateur.courriel && <span className="courriel">{utilisateur.courriel}</span>}
            </div>
          </div>

          <label className="champ">
            <span className="etiquette">Bio</span>
            <TextArea
              placeholder={"Quelques mots sur toi"}
              defaultValue={utilisateur.bio}
              maxLength={35}
              showCount
              autoSize={{ minRows: 2, maxRows: 3 }}
              onChange={changementBio}
            />
          </label>

          <div className="champ">
            <span className="etiquette">Date de naissance</span>
            <DatePicker
              placeholder="AAAA-MM-JJ"
              onChange={changementNaissance}
              value={utilisateur.dateNaissance ? dayjs(utilisateur.dateNaissance) : null}
            />
          </div>

          <div className="champ">
            <span className="etiquette">Genre</span>
            <Radio.Group onChange={changementGenre} value={utilisateur.genre} optionType="button" buttonStyle="solid">
              <Radio.Button value={'M'}>M</Radio.Button>
              <Radio.Button value={'F'}>F</Radio.Button>
            </Radio.Group>
          </div>

          <Button className="boutonDeco" onClick={() => deconnexion(ouvreNotification)} danger>Se déconnecter</Button>
        </div>
      ) : (
        <div className="carteProfil vide">
          <p>Connecte-toi pour modifier ton profil.</p>
          <Button className="boutonGoogle" onClick={() => connexion(ouvreNotification)}>
            <FcGoogle /> Se connecter avec Google
          </Button>
        </div>
      )}
    </div>
  );
}

export default Parametres;
