import React from 'react';

export default (props) => {
    return (
        <button
            className={props.isActive  ? 'book-widget__filter js-active' : 'book-widget__filter'}
            onClick={props.handlerClick} > { `${props.filterName} (${props.bookCount})` } 
        </button>
    )
}
