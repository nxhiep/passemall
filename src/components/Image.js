import React, { useState } from 'react';
import 'lazysizes'
const Image = ({ src, alt = '', width = '', height = '', onClick = () => { }, onLoaded = () => { }, onError = () => { }, className, style }) => {
    const [url, setUrl] = useState(src);
    return (
        <img data-src={url} alt={alt} width={width} height={height} className={"lazyload " + className}
            style={{ ...style }}
            onLoad={() => {
                onLoaded();
            }} onError={() => {
                onError();
                setUrl('/images/ImageError');
            }} onClick={onClick} />
    );
}

export default Image;