import React, { useState } from 'react';

const Image = ({ src, alt = '', width = '', height = '', onClick = () => { }, onLoaded = () => { }, onError = () => { }, className }) => {
    const [url, setUrl] = useState(src);
    return (
        <span className={'my-image' + (className ? ' ' + className : '')}>
            <img src={url} alt={alt} width={width} height={height}
                onLoad={() => {
                    onLoaded();
                }} onError={() => {
                    onError();
                    setUrl('/images/ImageError');
                }} onClick={onClick} />
        </span>
    );
}

export default Image;