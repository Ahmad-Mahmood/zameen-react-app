import { useState, useEffect } from "react"
import { fetchList } from "../../api"

const List = ({ list, setList, pageNumber, setPageNumber }) => {

    useEffect(() => {
        window.addEventListener("scroll", onScroll, false);
        setPageNumber(0)
        // getData(pageNumber, 7).then(response => {
        //     const { data: { data: flightResponse = [] } = {} } = response
        //     let _page = pageNumber + 1
        //     setPageNumber(_page)
        //     setList(flightResponse)
        // })

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [])

    const getData = async (page, size) => {
        const data = await fetchList(page, size)
        return data
    }

    const onScroll = () => {
        if (onEndReached()) {
            console.log("iin plus page num", pageNumber)
            setPageNumber(pageNumber + 1)
        }
    };

    const onEndReached = () => {
        const el = document.querySelector('.App');
        if(el !== undefined){
            const atBottom = Math.ceil(window.innerHeight + window.scrollY) >= el.scrollHeight
            return atBottom
        }
        return false
    }

    useEffect(() => {
        console.log("======> hey was updated", pageNumber)
        getData(pageNumber, 7).then(response => {
            const { data: { data: flightResponse = [] } = {} } = response
            let listCopy = [...list]
            console.log("in api", pageNumber)
            setList([...listCopy, ...flightResponse])
        })
    }, [pageNumber])

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


    return(
        <>
            {
                list.length === 0 ? 
                <div>Loading...</div> : 
                <RenderList />
            }
        </>
    )
}

export default List