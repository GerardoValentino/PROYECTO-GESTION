

//  ================================ DATA TABLE
let dataTable;
let isDataTable = false;

const dataTableOptions = {
    scrollX: "1300px",
    pageLength: 3,
    destroy: true,
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { orderable: false, targets: 10 },
        { searchable: false, targets: 1 },
        { width: "30%", targets: 10 },
    ],
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningun carro encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún carro encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
}

const listItems = async () => {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/cars");
        const data = await response.json();
        //console.log(data);

        let content = ``;
        data.forEach((car, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${car.make}</td>
                    <td>${car.model}</td>
                    <td>${car.oilFilter}</td>
                    <td>${car.airFilter}</td>
                    <td>${car.fuelFilter}</td>
                    <td>${car.sparkPlug}</td>
                    <td>${car.sparkPlugWires}</td>
                    <td>${car.battery}</td>
                    <td>${car.oil}</td>
                    <td>
                        <i class="fa-solid fa-trash" style="color: red"></i>
                        <i class="fa-solid fa-pen-to-square"></i>
                    </td>
                </tr>
            `;
        });
        tableBody_cars.innerHTML = content;

    } catch(error) {
        alert(error);
    }
}

const initDatatable = async () => {
    if(isDataTable) dataTable.destroy();

    await listItems();

    dataTable = $("#datatable_cars").DataTable(dataTableOptions);
    isDataTable = true;
}

window.addEventListener("load", async () => {
    await initDatatable();
});













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

