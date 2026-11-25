import "./FlechesPublication.scss";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Button } from 'antd';

// Affiche un nombre sur deux chiffres : 7 -> 07
const deuxChiffres = (n) => String(n).padStart(2, "0");

function FlechesPublication({ premierePublication, suivantePublication, precedentePublication, dernierePublication, publications, publicationActuelleIndex }) {
  // console.log(publicationActuelleIndex);
  // console.log(publications);
  return (
    <nav className='FlechesPublication' aria-label="Parcourir les publications">
      <Button 
        type="text" 
        aria-label="Première publication"
        onClick={premierePublication} 
        icon={<DoubleLeftOutlined />} 
        disabled={publicationActuelleIndex === 0}
      />
      <Button 
        type="text" 
        aria-label="Publication précédente"
        onClick={precedentePublication} 
        icon={<LeftOutlined />} 
        disabled={publicationActuelleIndex === 0}
      />
      <span className="compteur" aria-live="polite">
        <span className="actuel">{deuxChiffres(publicationActuelleIndex + 1)}</span>
        <span className="total">/ {deuxChiffres(publications.length)}</span>
      </span>
      <Button 
        type="text" 
        aria-label="Publication suivante"
        onClick={suivantePublication} 
        icon={<RightOutlined />} 
        disabled={publicationActuelleIndex === publications.length - 1}
      />
      <Button 
        type="text" 
        aria-label="Dernière publication"
        onClick={dernierePublication} 
        icon={<DoubleRightOutlined />} 
        disabled={publicationActuelleIndex === publications.length - 1}
      />
    </nav>
  );
}

export default FlechesPublication;
