const cars = require('../db/cars');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json());

// =============== Métodos (CRUD) ===============
app.get('/', (req, res) => {
    res.send('Node js API');
});

// Busqueda por ID
app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    if(!car) {
        res.status(404).send('Carro no encontrado');
    } else {
        res.send(car);
    }
});

// Busqueda por varios criterios
app.get('/api/cars', (req, res) => {
    const { make, model } = req.query;

    console.log(model);

    let filteredCars = cars;

    if (make) {
        filteredCars = filteredCars.filter(c => c.make.toLowerCase().includes(make.toLowerCase()));
    }

    if (model) {
        filteredCars = filteredCars.filter(c => c.model.toLowerCase().includes(model.toLowerCase()));
    }

    if (filteredCars.length === 0) {
        res.status(404).send('No se encontraron carros que coincidan con los criterios de búsqueda');
    } else {
        res.send(filteredCars);
    }
});


app.get('/api/cars', (req, res) => {
    res.send(cars);
});

app.post('/api/cars', (req, res) => {
    const car = {
        id: cars.length + 1,
        make: req.body.make,
        model: req.body.model,
        oilFilter: req.body.oilFilter,
        airFilter: req.body.airFilter,
        fuelFilter: req.body.fuelFilter,
        sparkPlug: req.body.sparkPlug,
        sparkPlugWires: req.body.sparkPlugWires,
        battery: req.body.battery,
        oil: req.body.oil,
    };

    cars.push(car);
    res.send(car);
});

app.delete('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    if(!car) return res.status(404).send('Carro no encontrado');

    const index = cars.indexOf(car);
    cars.splice(index, 1);
    res.send(car);
});

// Actualizar registro
app.put('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === carId);

    if (carIndex === -1) {
        return res.status(404).send('Carro no encontrado');
    }

    const updatedCar = {
        id: carId, 
        make: req.body.make || cars[carIndex].make, 
        model: req.body.model || cars[carIndex].model,
        oilFilter: req.body.oilFilter || cars[carIndex].oilFilter, 
        airFilter: req.body.airFilter || cars[carIndex].airFilter, 
        fuelFilter: req.body.fuelFilter || cars[carIndex].fuelFilter, 
        sparkPlug: req.body.sparkPlug || cars[carIndex].sparkPlug, 
        sparkPlugWires: req.body.sparkPlugWires || cars[carIndex].sparkPlugWires, 
        battery: req.body.battery || cars[carIndex].battery, 
        oil: req.body.oil || cars[carIndex].oil 
    };

    // Actualizar el registro en la base de datos (aquí sería un array en memoria, pero en una BD real sería una operación de actualización)
    cars[carIndex] = updatedCar;
    res.send(updatedCar);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));