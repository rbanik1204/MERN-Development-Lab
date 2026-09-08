const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end(204);
        return;
    }
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

        console.log("Raw body:", body);

        const data = JSON.parse(body);

        const username = data.username;
        const password = data.password;

        console.log("Username:", username);
        console.log("Password:", password);

        res.writeHead(200, {
            "Content-Type": "text/plain",
            "content-length":Buffer.byteLength(body),
            'Cache-Control': 'no-cache,no-store,must-revalidate',
            "access-control-allow-origin":"http://127.0.0.1:3000"
        });

        res.end("Login request received!");
    });
});
const PORT = 3000;
server.listen(PORT, "localhost", () => {
    console.log(`Server running on port ${PORT}`);
});