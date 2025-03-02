import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
    const url = req.url === '/' ? '/examples/browser.html' : req.url;
    
    // 只允许访问 examples/browser.html 和 dist/typestrip.mjs
    if (url !== '/examples/browser.html' && url !== '/dist/typestrip.mjs') {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }

    const filePath = path.join(projectRoot, url);
    const contentType = path.extname(filePath) === '.html' ? 'text/html' : 'application/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});