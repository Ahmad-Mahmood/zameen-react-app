import { useState, useEffect } from "react"
import { fetchFlight } from "../../api"

const Detail = (props) => {

    const [flight, setFlight] = useState({})

    useEffect(() => {
        const { match: { params: { id } } } = props 
        fetchFlight(id)
        .then(data => {
            setFlight(data.data)
        })
    }, [])

    return(
        <div>
            {
                Object.keys(flight).length === 0 ?
                <div>Loading...</div> :
                <div>
                    <div>Id: {flight._id}</div>
                    <div>Name: {flight.name}</div>
                    <div>Total Trips: {flight.trips}</div>
                </div>
            }
        </div>
    )
}

export default Detail;