import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


// Datos del nuevo carro que deseas agregar
/*
const newCar = {
    make: 'Toyota',
    model: 'Corolla 2020',
    oilFilter: ['TOY-1234'],
    airFilter: ['TOY-5678'],
    fuelFilter: ['TOY-9012'],
    sparkPlug: ['TOY-3456'],
    sparkPlugWires: ['TOY-7890'],
    battery: ['TOY-123'],
    oil: ['5w/30'],
}; */



// Función para agregar un nuevo carro
async function addCar(car) {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido
            },
            body: JSON.stringify(car), // Datos del carro en formato JSON
        });

        if (response.ok) {
            const addedCar = await response.json();
            console.log('Carro agregado:', addedCar);
        } else {
            alert('Error al agregar el carro');
            console.error('Error al agregar el carro:', response.statusText);
        }
    } catch (error) {
        console.error('Error 💀💀:', error);
    }
}

// Funcion para eliminar un carro
const deleteCar = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/cars/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al eliminar el carro 😟:', response.statusText, errorText);
            return;
        }

        const deletedCar = await response.json();
        console.log('Carro eliminado:', deletedCar);
    } catch (error) {
        console.error('Error:', error);
    }
};

//addCar(newCar);
//deleteCar(12);
