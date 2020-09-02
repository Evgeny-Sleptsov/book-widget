function  getFilterParams(paramName) {
    const params = new URLSearchParams(document.location.search);
    return params.get(paramName) || '';
}


export {getFilterParams}