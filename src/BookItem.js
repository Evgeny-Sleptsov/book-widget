import React from 'react';
import TagItem from './TagItem';


export default (props) => {
    const {bookContent, handlerClick, handlerForTag} = props;

    const btnName = generateBtnName(bookContent.status);
    function generateBtnName(status) {
        const statusList = {
            start : 'start',
            progress : 'progress',
            done : 'done'
        }
        let result;

        switch(status) {
            case statusList.start : 
                result = 'Start reading →';
              break;
            case statusList.progress : 
                result = 'Finish reading →'
              break;
            case statusList.done : 
                result = 'Return in «to read» ↲'
              break;
            default:
                result = 'change book status'
          }
        

        return result;
    }
    
    return (
        <div className='book-item'>
            <div className='book-item__author'>{bookContent.author}</div>
            <div className='book-item__title-wrap'>
                <h2>{bookContent.title}</h2>
                <button className='book-item__btn' onClick={handlerClick}>
                    {btnName}
                </button>
            </div>
            <div className='book-item__descr'>
                {bookContent.description ? bookContent.description : 'No description'}
            </div>
            <div className='book-item__tags-list'>
                {bookContent.tags.map(el => {
                    return <TagItem key={`id_${el}`} tagName={el} handlerForTag={() => handlerForTag(el)}/>
                })}
            </div>
        </div>
    )
}