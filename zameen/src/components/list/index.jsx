import { useState, useEffect, useRef } from "react"
import { fetchList } from "../../api"
import "./index.css"

const List = () => {

    const [list, setList] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const app = useRef(null)

    useEffect(() => {
        getData(pageNumber, 7).then(response => {
            const { data: { data: flightResponse = [] } = {} } = response
            setList(flightResponse)
            setPageNumber(pageNumber + 1)
        })
    }, [])

    const handleScroll = (e) => {
        const bottom = (Math.ceil(app.current.clientHeight + app.current.scrollTop) === app.current.scrollHeight)
        if (bottom) { 
            getData(pageNumber, 7).then(response => {
                const { data: { data: flightResponse = [] } = {} } = response
                setList([...list, ...flightResponse])
                setPageNumber(pageNumber + 1)
            })
        }
     }

    const getData = async (page, size) => {
        const data = await fetchList(page, size)
        return data
    }

    const RenderList = () => {
        return(
            <div className="flight-list">
                {
                    list.map((flight, index) => {
                        const { name } = flight
                        const airline = flight.airline[0]
                        const { logo = "", country = "", id = 0 } = airline

                        return(
                            <div key={index} className={`flight ${index % 6 === 0 && index !== 0 ? 'flight-single' : 'flight-dual'}`}>
                                <div>
                                    <img className="airline-logo" src={logo} alt="airline-logo"/>
                                </div>
                                <div>{country}</div>
                                <div className="flight-id">id: {id}</div>
                                <div className="name">{name}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="container" onScroll={(e) => handleScroll(e)} ref={app}>
            {
                list.length === 0 ? 
                <div>Loading...</div> : 
                <RenderList />
            }
        </div>
    )
}

export default List