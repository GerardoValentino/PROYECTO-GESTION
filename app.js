//  ================================ DATA TABLE
let dataTable;
let isDataTable = false;

const dataTableOptions = {
    scrollX: "1300px",
    pageLength: 5,
    destroy: true,
    lengthMenu: [5, 10, 15, 20, 50, 100, 300, 500],
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

const deleteItem = async (e) => {
    const carId = e.target.getAttribute('data-id');
    const response = await fetch(`http://127.0.0.1:3000/api/cars/${carId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        e.target.closest('tr').remove();
        Swal.fire(
            'Eliminado!',
            'Tu archivo ha sido eliminado.',
            'success'
        )
    } else {
        Swal.fire('Error', 'No se pudo eliminar el carro.', 'error');
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
                        <i class="fa-solid fa-trash btn-delete" style="color: red" data-id="${car.id}"></i>
                        <i class="fa-solid fa-pen-to-square btn-edit" data-id="${car.id}"></i>
                    </td>
                </tr>
            `;
        });
        tableBody_cars.innerHTML = content;

        // Aplicamos delegación de eventos OSIOSI
        tableBody_cars.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "No podrás revertir esta acción",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteItem(e);
                    }
                })
            }
            if (e.target.classList.contains('btn-edit')) {
                console.log(e.target);
                alert("Diste click en editar");
            }
        });

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


function addField(containerId, fieldName) {
    const container = document.getElementById(containerId);

    // Div contenedor para el campo y el botón de eliminar
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group', 'mb-2');

    // Campo de entrada
    const input = document.createElement('input');
    input.type = 'text';
    input.name = fieldName;
    input.classList.add('form-control');

    // Botón de eliminar
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-danger');
    button.innerText = 'Eliminar';
    button.addEventListener('click', () => {
        container.removeChild(inputGroup);
    });

    // Agregar el campo y el botón al grupo de inputs
    inputGroup.appendChild(input);
    inputGroup.appendChild(button);

    // Agregar el grupo de inputs al contenedor principal
    container.appendChild(inputGroup);
}

// Funcion para capturar el formulario y enviar los datos a la API
document.getElementById('carForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    // Capturar los valores del formulario
    const formData = new FormData(this);
    const carData = {};

    // Convertir FormData en un objeto JSON
    formData.forEach((value, key) => {
        if (!carData[key]) {
            carData[key] = value.toUpperCase();
        } else {
            if (!Array.isArray(carData[key])) {
                carData[key] = [carData[key].toUpperCase()];
            }
            carData[key].push(value.toUpperCase());
        }
    });

    //console.log(carData);

    
    try {

        // NOTE: Validar si ya existe el registro o no
        const validateRegister = await fetch(`http://127.0.0.1:3000/api/cars?model=${encodeURIComponent(carData.model.trim())}`);
        if (validateRegister.ok) {
            const cars = await validateRegister.json();
            console.log(cars); 

            if (cars.length > 0) {
                // Mostrar detalles de los carros encontrados
                let result = cars.map(car => `Marca: ${car.make}, Modelo: ${car.model}`).join('\n');
                Swal.fire('Carros Encontrados', result, 'success');
            }
        } else {
            Swal.fire('Error', 'No se encontraron carros que coincidan con los criterios de búsqueda', 'error');
        }
        

        const response = await fetch('http://127.0.0.1:3000/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });

        if (response.ok) {
            // Cerrar el modal si el envío es exitoso
            const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
            modal.hide();

            Swal.fire('Éxito', 'El carro ha sido agregado correctamente', 'success');

            // Recargar o actualizar la tabla con el nuevo registro
            await listItems();
        } else {
            Swal.fire('Error', 'No se pudo agregar el carro', 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el carro', 'error');
    }
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

