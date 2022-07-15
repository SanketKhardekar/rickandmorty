export const fetchLocalAuth=()=>{
    const userData=localStorage.getItem("userData");
    if(userData ===null)
    {
        return {isLoggedIn:false, token:null,id:null};
    }
    const data=JSON.parse(userData);
    return {...data,isLoggedIn:true}
}