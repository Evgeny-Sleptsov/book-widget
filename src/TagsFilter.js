import React from 'react';

export default (props) => {
    const {activeTags, handlerClick} = props;
    return (
        <div className='book-widget__tags-box'>
            <div className='book-widget__tags-content'>
                <p>Filter by tags:</p>
                <div className='book-widget__tags-list'>
                    {activeTags
                        .map(tag => <div className='book-widget__tags-item' key={`id_${tag}`}>{tag}</div>)}
                </div>
                <button onClick={handlerClick}>(clear)</button>
            </div>
        </div>
    )
}