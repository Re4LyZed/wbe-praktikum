const {request} = require("https")

request({
    hostname: "wttr.in",
    path: "/" + process.argv[2] + "?format=j1",
    port: 443,
    method: "GET"
}, rs => {
    rs.on("data", chunk =>
        process.stdout.write(chunk.toString())
    );
}).end( )
