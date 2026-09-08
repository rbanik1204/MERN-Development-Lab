const http = require('http')
const server = http.createServer((req, res) => {
    console.log(`request Header(user-Agent):${req.headers['user-agent']}`);
    console.log(`request Header(X-Client-Header):${req.headers['x-client-header']}`)
    if (req.method === "OPTIONS" && req.url === "/") {
        res.writeHead(200, {
            'cache-control': "no-cache,no-store,must-revalidate",
            'Access-Control-Allow-Origin': "http://127.0.0.1:3000",
            'access-control-allow-credentials': true,
            'access-control-allow-headers': 'X-Client-Header',
            // 'Access-Control-Expose-Headers': 'X-Server-Header,Set-Cookie,last-modified,expires,cache-control'
        })
        res.end();
    }
    else if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            'Content-Type': 'application/json',

            'Content-Length': Buffer.byteLength(
                JSON.stringify({ message: "Hello from Server!" })
            ),

            'Cache-Control': 'no-cache,no-store,must-revalidate',

            'Last-Modified': new Date().toISOString(),

            'Expires': new Date(Date.now() + 60000).toISOString(),

            'X-Server-Header': 'HelloFromServer',
            'set-cookie': [
                'sessionID=abc123; SameSite=Lax',
                'username=ratul; SameSite=Lax'
            ],

            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',

            'Access-Control-Allow-Credentials': 'true',

            'Access-Control-Expose-Headers':
                'Content-Length,Last-Modified,Expires,Cache-Control,X-Server-Header,Set-Cookie'
        })

        res.end(JSON.stringify({
            message: "Hello from Server!"
        }))
    }

})
const PORT = 3000
server.listen(PORT, 'localhost', () => {
    console.log('Server running at http://localhost:3000')
})