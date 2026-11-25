import React from 'react';
import './ImagePublication.scss';
import { Image } from 'antd';


function ImagePublication({url}) {
    return (
    <div className="ImagePublication">
        <Image width="100%" src={url} alt="Photo de la publication"></Image>
      </div>
    );
}

export default ImagePublication;
