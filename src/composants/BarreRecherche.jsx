import React, {useEffect, useState} from "react";
import "./BarreRecherche.scss";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames";

// Nombre de mots-clés affichés avant « Voir tous les mots-clés »
const NB_MOTS_CLES_VISIBLES = 14;

function BarreRecherche({ setPublicationActuelleIndex, options, motRecherche, setMotRecherche, gererRecherche}) {

  useEffect(() => {
    setPublicationActuelleIndex(0);
    setValeurBarre(motRecherche);
  }, [motRecherche, setPublicationActuelleIndex]);

  const [valeurBarre, setValeurBarre] = useState([]);
  const [tousLesMotsCles, setTousLesMotsCles] = useState(false);

  const gererChangementValeur = (value) => {
    setValeurBarre(value);
  }

  const motsClesVisibles = tousLesMotsCles ? options : options.slice(0, NB_MOTS_CLES_VISIBLES);

  return (
    <div className="BarreRecherche">
      <h1 className="titrePage">Recherche</h1>
      <p className="sousTitre">Trouve des publications par mot-clé.</p>
      <AutoComplete
        className="champRecherche"
        options={options}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={gererRecherche}
        onChange={gererChangementValeur}
        value={valeurBarre}
      >
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Chercher un mot-clé, par exemple forêt"
        />
      </AutoComplete>
      <div className="motsClesPopulaires">
        <button
          type="button"
          className={classNames("puce", { actif: !motRecherche })}
          onClick={() => gererRecherche("")}
        >
          Tout
        </button>
        {motsClesVisibles.map((option) => (
          <button
            type="button"
            key={option.value}
            className={classNames("puce", { actif: option.value === motRecherche })}
            onClick={() => gererRecherche(option.value)}
          >
            #{option.value}
          </button>
        ))}
        {options.length > NB_MOTS_CLES_VISIBLES && (
          <button type="button" className="voirTout" onClick={() => setTousLesMotsCles(!tousLesMotsCles)}>
            {tousLesMotsCles ? "Voir moins" : `Voir les ${options.length} mots-clés`}
          </button>
        )}
      </div>
    </div>
  );
}

export default BarreRecherche;
