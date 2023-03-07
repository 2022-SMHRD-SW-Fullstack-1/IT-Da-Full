import React from 'react';

const GalleryItem = ({item, onView}) => {
    const {image, id} = item
    return (
        <li onClick={()=>onView(id)}> 
            <img src={image}/>
        </li>
    );
};

export default GalleryItem;