const http = require('http');

http.createServer(function(req, res) {
	res.write(`<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
`);
	res.end();
}
).listen(3000);

console.log('server started on port 3000')
