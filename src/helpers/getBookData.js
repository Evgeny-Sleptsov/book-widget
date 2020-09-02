function getBookData() {
    const url = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
    return fetch(url);
}


export {getBookData};