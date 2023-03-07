import React from 'react';
import GalleryItem from './GalleryItem'

const GalleryList = ({datas, currItem, onView}) => {
    const {image} = currItem

    return (
        <article className="left">
            <img src={image}/>
            <ul>
                {
                    datas.map(item => 
                    item&&<GalleryItem key={item.id} item={item} onView={onView}/>)
                }
            </ul>
        </article>
    );
};

export default GalleryList;