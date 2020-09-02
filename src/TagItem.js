import React from 'react'

export default (props) => {
    return (
    <button 
        onClick={props.handlerForTag} >{`#${props.tagName}`}</button>
    )
}