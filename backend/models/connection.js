const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://manon:Lacapsule123@cluster-shared.881lpbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-shared/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error));