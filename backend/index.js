const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/mongodb.js')
const userRoutes = require('./routes/userRoute.js')
require('dotenv').config(); // Correct way to load environment variables

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
connectToDB()
app.get('/', (req, res) => {
    return res.send('API checking');
});
app.use('/api/user' , userRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
