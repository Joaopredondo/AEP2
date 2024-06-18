const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const Data = require('./models/Data');

// Substitua 'mongodb://localhost:27017/poverty_dashboard' pela string de conexão do seu MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/poverty_dashboard';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

fs.createReadStream('../escola.csv')
  .pipe(csv())
  .on('data', (row) => {
    const data = new Data(row);
    data.save();
  })
  .on('end', () => {
    console.log('CSV file successfully processed and data imported.');
  });
