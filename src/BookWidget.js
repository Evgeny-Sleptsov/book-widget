import React from 'react';
import BookItem from './BookItem';
import FilterItem from './FilterItem';
import TagsFilter from './TagsFilter';
import {getBookData} from './helpers/getBookData';
import {getFilterParams} from './helpers/getFilterParams';
import './styles/App.scss';


export default class BookWidget extends React.Component {
  state = {
    bookData : [],
    tagsFilterData : [],
    filterParam : '' 
  }


  updateTagsFilterData = (tagName) => {
    this.setState ({
      tagsFilterData : this.state.tagsFilterData.add(tagName)
    })
    
    const params = new URLSearchParams(`tags=${[...this.state.tagsFilterData]}`);
    const tags  = params.toString().replace(/%2C/g, ',');
    const query = `?tab=${this.state.filterParam}&${tags}`

    if (this.props.location.search !== query) {
      this.props.history.push(`/${query}`);
    }
  }


  clearTagsFilter(status) {
    this.setState ({
      tagsFilterData : new Set([]),
    })
    this.props.history.push(`/?tab=${status || this.state.filterParam}`);
  }

  handlerTabFilter(status) {
    this.setState (
      {
        filterParam : status,
      }
    )
    this.clearTagsFilter(status);
  }

  historyStateListener = () => {
    this.setState (
      {
        filterParam : getFilterParams('tab'),
        tagsFilterData : getFilterParams('tags') ? 
        new Set([...getFilterParams('tags').split(',')]) : new Set([])
      }
    )
  }


  getLocalStorageData() {
    this.setState (
      {
        bookData : JSON.parse(localStorage.getItem('bookData'))
      }
    )
  }

  getBooksCount(status) {
    const bookCount =  this.state.bookData.filter(el => el.status === status);
    return bookCount.length
  }

  changeBookStatus(bookId) {

    const statusList = {
      start : 'start',
      progress : 'progress',
      done : 'done'
    }

    let filterParam = this.state.bookData
      .find(el => el.id === bookId)
      .status;
    
    switch(filterParam) {
      case statusList.start : 
        filterParam = statusList.progress;
        break;
      case statusList.progress : 
        filterParam = statusList.done;
        break;
      case statusList.done : 
        filterParam = statusList.start;
        break;
      default:
        console.log('error');
    }

    const bookDataAfterFilter = this.state.bookData.map(el => {
      return el.id === bookId ? {...el, status : filterParam} : el
    })

    localStorage.setItem('bookData', JSON.stringify(bookDataAfterFilter));
    this.getLocalStorageData();
    
  }


  componentDidMount() {
    
    this.historyStateListener();
    window.addEventListener('popstate',this.historyStateListener);

    if (!localStorage.getItem('bookData')) {
      getBookData()
        .then(response => response.json())
        .then(data => {
          return data.items.map(el => ({...el, status: 'start' }));
        })
        .then(data => {
          localStorage.setItem('bookData', JSON.stringify(data));
          this.getLocalStorageData();
        })
        .catch(() => console.log('error'));
    } else {
      this.getLocalStorageData();
    }

  }

  render() {
    
    const statusList = [
      {
        filterName : 'To read',
        status : 'start'
      },
      {
        filterName : 'In progress',
        status : 'progress'
      },
      {
        filterName : 'Done',
        status : 'done'
      },
    ]
  
    const bookItemsAfterFilter = this.state.bookData
      .filter(item => {
        if ( this.state.tagsFilterData.size > 0 ) {
          const isActiveTag = item.tags.some(el => this.state.tagsFilterData.has(el));
          return isActiveTag ? item : null
        } return item; 
      })
      .filter(item => item.status === this.state.filterParam)
      .map(item => {
          return  (
            <BookItem
              key={item.id}
              bookContent={item}
              handlerForTag={this.updateTagsFilterData}
              handlerClick={() => this.changeBookStatus(item.id)}
              />
          )
        })

        const tagsFilterComponent = this.state.tagsFilterData.size > 0 ? 
          <TagsFilter
            handlerClick={() => this.clearTagsFilter()}  
            activeTags={[...this.state.tagsFilterData]}/> : null
  
    return (
      <div className='book-widget'>
          <div className='book-widget__filters'>
              { 
                statusList.map(item => {
                  return (
                    <FilterItem
                      key={item.status}
                      filterName={item.filterName}
                      isActive={this.state.filterParam === item.status}
                      bookCount={this.getBooksCount(item.status)}
                      handlerClick={() => this.handlerTabFilter(item.status)}
                    />
                  )
                })
              }
          </div>

          { tagsFilterComponent }

          <div className='book-widget__books-list'>
            { bookItemsAfterFilter.length > 0 
              ? bookItemsAfterFilter 
              : <div className='book-widget__empty-message'><p>List is empty...</p></div>
            }
          </div>
      </div>
    );
  }
}

