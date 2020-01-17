const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(`http request received: url=${url}, method=${method}`);

    if(url === '/'){
        res.write(`
        <html>
        <head><title>MemoApp</title></head>
        <body>
            <form action="add-note" method="POST">
                <input type="text" name="note">
                <button type="submit">Add note</button>
            </form>
        </body>
        </html>
        `);
        res.statusCode = 200; //ok
        res.end();
    }

    else if(url === '/add-note'){
        console.log('/add-note');
        const chunks = []; //tehdään lista chunks
        req.on('data', (chunk) => { //tehdään kuuntelija joka ottaa datapalan talteen 
            chunks.push(chunk); //pukkaa sen paikkaan Chunks
        });

        req.on('end', ()=>{
            const body = Buffer.concat(chunks); //yhdistää datapalat ketjuksi
            console.log(body);
            res.statusCode = 303; //redirect
            res.setHeader('Location', '/');
        });
        return;
    }

    console.log(`${url} not found`);
    res.write(`
    <html>
        <head><title>MemoApp - 404</title></head>
        <body>
            <h1> 404 FILE NOT FOUND</h1>
            </form>
        </body>
        </html>
    
    `);
    res.statusCode = 404;
    res.end();

});
server.listen(8080);