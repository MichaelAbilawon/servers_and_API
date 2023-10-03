const http = require("http");
const fs = require("fs");

const port = 8001;
const students = [];

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/students" && req.method === "POST") {
    const data = [];

    req.on("data", (chunk) => {
      console.log({ chunk });
      data.push(chunk);
    });

    req.on("end", () => {
      const bufferBody = Buffer.concat(data).toString();
      console.log({ bufferBody });
      const bodyOfRequest = JSON.parse(bufferBody);
      console.log({ bodyOfRequest });

      students.push({
        ...bodyOfRequest,
        id: Math.floor(Math.random() * 50).toString(),
      });
      console.log({ students });
    });
  }
});
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
