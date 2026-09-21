const http = require('http');
const server = http.createServer((req, res) => {
    console.log(`request Header(user-Agent):${req.headers['user-agent']}`);
    console.log(`request Header(X-Client-Header):${req.headers['x-client-header']}`)
    if (req.method === "OPTIONS" && req.url === '/Home') {
        res.writeHead(200, {
            'cache-control': 'no-cache,no-store,must-revalidate',
            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            'Access-Control-Allow-Headers': 'Content-Type,user-agent,X-Client-Header',
            'Access-Control-Allow-Credentials': 'true'
        })
        res.end()
    }
    else if (req.method === "GET" && req.url === "/Home") {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Server-Header', 'Hello-From-Server')
        res.setHeader('X-Powered-By', 'Node.js')
        res.setHeader('Set-Cookie', [
            'sessionId=abc123; SameSite=None;Secure;',
            'username=abc123; SameSite=None;Secure;',
            'name=abc123; SameSite=None;Secure;',
            'sessionId=abc123; SameSite=Lax',
            'username=ratul; SameSite=Lax',
            'name=Ratul; SameSite=Lax'
        ]);
        res.writeHead(200, {
            'cache-control': 'no-cache,no-store,must-revalidate',
            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
            //'set-cookie': 'sessionId=abc123;username=ratul;name=Ratul;sameSite=None;',/// Giving null But why????
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            // 'Access-Control-Allow-Headers': 'Content-Type,user-agent,x-client-header',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Expose-Headers': 'X-Server-Header,Set-Cookie'
        })
        res.end(JSON.stringify({ message: 'Server Running!' }))
    }
    else if (req.url === '/') {
        {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    }
    else {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not Found' }))
    }
})
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/Home");
})

// Response Header (Content-Type): application/json
// script.js:12 Response Header(X-Server-Header): null   ----> This is the problem 
// script.js:15 cache-control : no-cache,no-store,must-revalidate
// script.js:15 content-type : application/json
// script.js:17 The cookies sent from the HTTP server:

// script.js:25 This is the response received from Server: Server Running!