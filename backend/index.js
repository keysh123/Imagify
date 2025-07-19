const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Correct way to load environment variables

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.send('API checking');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
