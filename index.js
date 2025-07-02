const express = require('express');


const app = express();


app.listen(2000, () => {
    console.log("The server is running on http://locahost:2000");
});