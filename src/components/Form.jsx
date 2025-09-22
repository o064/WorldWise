// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackBotton from "./BackBotton";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL  ="https://api.bigdatacloud.net/data/reverse-geocode-client";
const initialState = {
  cityName: "",
  country : "",
  date : new Date() ,
  notes : "",
  isLoadingGeolocation : false,
  emoji : "",
  geoCodingError : "",
}
function reducer(state , action){
  switch(action.type){
    case "geoCodingError" :
      return {
        ...state ,
        geoCodingError : action.payload,
      }
    case "loadingGeoLocation":
      return {
        ...state,
        isLoadingGeolocation : true
      }
    case "finishLoadingGeoLocation":
      return {
        ...state,
        isLoadingGeolocation : false
      }
    case "CityDetails":
      return {
        ...state ,
        cityName : action.payload.cityName , 
        country : action.payload.country , 
        emoji : action.payload.emoji , 
        
      }
    case "cityName":
      return {
        ...state ,
        cityName : action.payload , 
      }
    case "date":
      return {
        ...state ,
        date : action.payload , 
        
      }
    case "note":
      return {
        ...state ,
        notes : action.payload
      }
    default :
      throw new Error ("action is unknown");
  }
}

function Form() {
  const [{cityName,country,date,notes,isLoadingGeolocation,geoCodingError, emoji } , dispatch] =useReducer(reducer , initialState);
  const [lat,lng] = useURLPosition();
  const navigate = useNavigate();
  const {createCity,isLoading} = useCity();
  // const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [notes, setNotes] = useState("");
  // const [isLoadingGeolocation , setISLoadingGeoloacation] = useState(false);
  // const [geoCodingError , setGeocodingError] = useState("");
  // const [emoji,setEmoji] = useState("");
  useEffect(()=>{
    if(!lat && !lng ) return; 
    async function fetchCityDetails(){
      try {
        dispatch({type : "loadingGeoLocation"})
        dispatch({type : "geoCodingError" , payload : ""});
        // setISLoadingGeoloacation(true);
        // setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        if(!data.countryCode)
          throw new Error("this doesn't seem to be a country select somewhere else");
        dispatch({type : "CityDetails" , payload : {
          cityName : data.city || data.locality || "",
          country : data.countryName,
          emoji : convertToEmoji(data.countryCode)
        }});
        
        // setCityName(data.city || data.locality || "");
        // setCountry(data.countryName);
        // setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        dispatch({type : "geoCodingError" , payload : error.message});
        // setGeocodingError(error.message)
      }finally{
        dispatch({type : "finishLoadingGeoLocation" })
        // setISLoadingGeoloacation(false);

      }
    }
    fetchCityDetails();
  },[lat,lng]);
  async function handleSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return ;
    const newCity ={
      cityName,
      country,
      date : date.toISOString(),
      emoji,
      notes,
      position:{lng,lat},
    }
    await createCity(newCity);
    navigate("/app/cities");
  }
  if(!lat && !lng) return <Message message="Start by clicking on the map" />
  if(geoCodingError) return <Message message={geoCodingError}/>;
  if(isLoadingGeolocation ) return <Spinner />;
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""} `} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({type : "cityName" , payload : e.target.value})}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker 
        id="date"
        selected={date} onChange={(date) => dispatch({type : "date" , payload : date})} 
          dateFormat="dd/MM/yyyy"/>
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({type : "note" , payload : e.target.value})}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackBotton />
      </div>
    </form>
  );
}

export default Form;
