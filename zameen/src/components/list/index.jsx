import { useState, useEffect } from "react"
import  { fetchList }  from "../../api"
import { Link } from "react-router-dom";
import "./index.css"

const List = ({ atBottom }) => {

    const [list, setList] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        getData(pageNumber, 8).then(response => {
            const { data: { data: flightResponse = [] } = {} } = response
            setList(flightResponse)
            setPageNumber(pageNumber + 1)
        })
    }, [])

    useEffect(() => {
        if(atBottom){
            getData(pageNumber, 7).then(response => {
                const { data: { data: flightResponse = [] } = {} } = response
                setList([...list, ...flightResponse])
                setPageNumber(pageNumber + 1)
            })
        }
    }, [atBottom])

    const getData = async (page, size) => {
        const data = await fetchList(page, size)
        return data
    }

    const RenderList = () => {
        return(
            <div className="flight-list">
                {
                    list.map((flight, index) => {
                        const { name, _id } = flight
                        const airline = flight.airline[0]
                        const { logo = "", country = "", id = 0 } = airline

                        return(
                            <div key={index} className={`flight ${(index + 1) % 7 === 0 && index !== 0 ? 'flight-single' : 'flight-dual'}`}>
                                <Link to={`/${_id}`}>
                                    <div>
                                        <img className="airline-logo" src={logo} alt="airline-logo"/>
                                    </div>
                                    <div>{country}</div>
                                    <div className="flight-id">id: {id}</div>
                                    <div className="name">{name}</div>
                                </Link>
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="container">
            {
                list.length === 0 ? 
                <div>Loading...</div> : 
                <RenderList />
            }
        </div>
    )
}

export default List