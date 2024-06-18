const mongoose = require('mongoose');
const Data = require('./models/Data');

mongoose.connect('mongodb://localhost:27017/poverty_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updateCoordinates = async () => {
  await Data.updateMany(
    { diretoria: 'São Paulo' }, // Assumindo que o campo 'diretoria' identifica São Paulo
    {
      $set: {
        latitude: -23.55052,
        longitude: -46.633308,
      },
    }
  );

  console.log('Coordinates updated for São Paulo/SP');
  mongoose.connection.close();
};

updateCoordinates().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
