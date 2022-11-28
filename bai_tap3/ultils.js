const getListFromStorage = (list) => {
   return JSON.parse(localStorage.getItem(list));
}


const setListToStorage = (list) => {
   localStorage.setItem('noteList', JSON.stringify(list));
}