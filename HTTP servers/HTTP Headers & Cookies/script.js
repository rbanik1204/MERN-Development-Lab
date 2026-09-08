const fetchData = async (src)=>{
    return fetch(src,{
        method: "GET",
        credentials: "include",
        headers:{
            'user-agent':'CustomValue',
            'X-client-header':'ratul'
        }
    })
    .then(async (res)=>{
        console.log("Response Header (Content-Type): ",res.headers.get('Content-Type'))
        console.log("Response Header (X-Server-Header): ",res.headers.get('X-Server-Header'))
        console.log("Response Header: (cache-control) "+res.headers.get("cache-control"))
        console.log("Response header :(Expires)",res.headers.get("expires"))
        console.log("Response header :(last-modified)",res.headers.get("last-modified"))
        for(let [key, value] of res.headers.entries()){
            console.log(key,":",value)
        }
        console.log("Cookies received from HTTP Server:\n"+document.cookie)
        const data = await res.json();
        return data;
    })
}
async function main(src){
    const data = await fetchData(src);
    if(data) {
        console.log("Data received from server: "+data.message);
    }
    else {
        console.log("failed to fetch or Parse Response")
    }
}
main("http://[::1]:3000")