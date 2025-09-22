/* eslint-disable react/prop-types */
import Spinner from "./Spinner"
import styles from './CityList.module.css'
import CityItem from "./CityItem"
import Message from "./Message"
import { useCity } from "../contexts/CityContext"
function CityList() {
    const {isLoading ,cities} = useCity();
    if(isLoading) return (
        <Spinner />
    )
    if(!cities.length)
        return <Message message={"Add your First City By Ciliking On The Map"} />

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id}/>)}
        </ul>
    )
}

export default CityList
