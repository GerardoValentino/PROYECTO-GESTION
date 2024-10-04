import { cars } from './db/cars';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json());

// =============== Métodos (CRUD) ===============
app.get('/', (req, res) => {
    res.send('Node js API');
});


app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id));

    if(!car) {
        res.status(404).send('Carro no encontrado');
    } else {
        res.send(car);
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

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));