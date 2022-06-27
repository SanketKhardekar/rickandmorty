
export const fetchLocalFavroites=()=>{
    const favrouites= localStorage.getItem('favs');
    if(favrouites === null)
    {
        return [];
    }
    return(JSON.parse(favrouites));
}

export const addFavLocal=(data)=>{
    const favArray=fetchLocalFavroites();
    favArray.push(data);
    localStorage.setItem("favs",JSON.stringify(favArray));
}

export const removeFavLocal=(id)=>{
    const favArray=fetchLocalFavroites();
    const updatedData= favArray.filter(item => item.id !== id);
    localStorage.setItem("favs",JSON.stringify(updatedData));
}