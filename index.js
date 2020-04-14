const express = require('express');
const path = require('path');
const app = express();

console.log(__dirname);
app.use(express.static(path.join(__dirname,'/build')));

app.listen(process.env.PORT || 3000);