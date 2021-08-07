export const fetchList = async (page, size) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_KEY}?page=${page}&size=${size}`)
        .then(response => response.json())
        .then(data => {
            resolve({
                data,
                success: true
            })
        })
        .catch((error) => {
            reject({
                success: false,
                error
            })
        })
    })
}
