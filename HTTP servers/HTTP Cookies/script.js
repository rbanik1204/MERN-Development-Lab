const FetchData = async (src)=>{
    return fetch (src,{
        method:'GET',
        credentials:'include',
        headers:{
            'user-agent':'CustomValue',
            'X-Client-Header':'ratul'
        }
    })
    .then(async (res)=>{
        console.log("Response Header (Content-Type):", res.headers.get("content-type"));
        console.log("Response Header(X-Server-Header):",res.headers.get('X-Server-Header'));
        // Printing all response headers
        for (let [key,value] of res.headers.entries()){
            console.log(key,":",value);
        }
        console.log('The cookies sent from the HTTP server:\n'+document.cookie);
        const data = await res.json();
        return data;
    })
}
async function main(src){
    const data = await FetchData(src)
       if (data) {
        console.log("This is the response received from Server:", data.message);
    } else {
        console.log("Failed to fetch or parse response.");
    }
}

main('http://localhost:3000/Home');