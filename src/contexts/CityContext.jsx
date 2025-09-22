import {  createContext, useCallback, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000"
const CityContext = createContext();


const initialState = {
    cities : [],
    isLoading: false,
    currentCity: {},
    error : ""
};
function reducer(state , action){
    switch(action.type){
        case "loading":
            return {
                ...state,
                isLoading:true,
                error : ""
            }
        case "cities/loaded":
            return{
                ...state,
                isLoading  : false,
                cities : action.payload
            }
        case "city/loaded":
            return {
                ...state ,
                currentCity : action.payload,
                isLoading : false,
            }
        case "city/created":
            return{
                ...state,
                isLoading  : false ,
                cities : [...state.cities , action.payload],
                currentCity : action.payload
            }
        case "city/deleted":
            return{
                ...state,
                isLoading  : false,
                cities : state.cities.filter(city => city.id !== action.payload),
                currentCity : {}
            }
        case "rejected":
            return {
                ...state ,
                error : action.payload,
                isLoading : false
            }
        default:
            throw new Error("unknown action")
    }

}
function  CityProvider({children}){
    const [{cities,isLoading,error,currentCity}, dispatch] = useReducer(reducer ,initialState);


    useEffect(()=>{
    async function fetchCities(){
        dispatch({type : "loading"});
        try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data  = await res.json();
        dispatch({type : "cities/loaded" , payload: data});
        // setCities(data);
        } catch (err) {
        dispatch({type : "rejected", payload : "there is some error while fetching"})
        }
    }
    fetchCities()
    },[]);
    const getCity = useCallback(
        async function (id){
        if(Number(id) === currentCity.id) return;
        dispatch({type : "loading"});
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data  = await res.json();
            dispatch({type : "city/loaded" ,payload :data});
        } catch (err) {
        dispatch({type : "rejected", payload : "there is some error while fetching"})
        }
    }
    ,[currentCity.id]);

    async function createCity(newCity){
        dispatch({type : "loading"});
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method:"POST",
                body : JSON.stringify(newCity),
                headers:{
                    "Content-Type": "application/json",
                }
            });
            const data  = await res.json();
            console.log(data);
            dispatch({type : "city/created" , payload: data});
            } catch (err) {
            dispatch({type : "rejected", payload : "there is some error while creating city "})
            }
    }
    async function deleteCity(id){
        dispatch({type : "loading"});
        try {
            await fetch(`${BASE_URL}/cities/${id}` , {
                method : "DELETE",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' 
                    },
            });
            dispatch({type : "city/deleted" , payload: id});
        } catch (err) {
            dispatch({type : "rejected", payload : "there is some error while deleting city "})
        }
    }
    return <CityContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity
    }}>
        {children}
    </CityContext.Provider>
}
function useCity(){
    const context = useContext(CityContext);
    if(context === undefined) 
        throw new Error("Citycontext is used outside his provider");
    return context;
}
export {
    CityProvider,
    useCity
}
