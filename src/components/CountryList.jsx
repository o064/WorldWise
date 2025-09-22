/* eslint-disable react/prop-types */
import Spinner from "./Spinner"
import styles from './CountryList.module.css'
import CounrtyItem from "./CountryItem"
import Message from "./Message"
import { useCity } from "../contexts/CityContext"
function CountryList() {
    const {isLoading ,cities} = useCity();
    if(isLoading) return  <Spinner />
    if(!cities.length) return <Message message={"Add your First City By Ciliking On The Map"} />
    const countries = cities.reduce((arr,city) => {
        if(!arr.map(ele => ele.country).includes(city.country))
            return [...arr, {country : city.country , emoji : city.emoji}]
        return arr
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CounrtyItem country={country} key={country.country}/>)}
        </ul>
    )
}

export default CountryList
