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


const modalTitle = document.getElementById('staticBackdropLabel');
let isEditing = false;
let currentCarId = null;

document.querySelector('button[data-bs-target="#staticBackdrop"]').addEventListener('click', () => {
    modalTitle.textContent = 'Agregar Registro';
    document.getElementById('carForm').reset();
    isEditing = false;
    currentCarId = null;
});

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
                        <i class="fa-solid fa-pen-to-square btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${car.id}"></i>
                    </td>
                </tr>
            `;
        });
        tableBody_cars.innerHTML = content;

        // Aplicamos delegación de eventos OSIOSI :D
        tableBody_cars.addEventListener('click', async (e) => {
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
                        setTimeout(function() {
                            location.reload();
                        }, 1500);
                    }
                })
            }
            if (e.target.classList.contains('btn-edit')) {
                const carId = e.target.getAttribute('data-id');
                currentCarId = carId;
                isEditing = true;
                modalTitle.textContent = 'Editar Registro';

                // NOTE: Falta validar que no se introduzca un modelo que ya existe en la db
                try {
                    const response = await fetch(`http://127.0.0.1:3000/api/cars/${carId}`);
                
                    if(response.ok) {
                        const car = await response.json();
                        document.getElementById('make').value = car.make;
                        document.getElementById('model').value = car.model;
                        document.querySelector('input[name="oilFilter"]').value = car.oilFilter;
                        document.querySelector('input[name="airFilter"]').value = car.airFilter;
                        document.querySelector('input[name="fuelFilter"]').value = car.fuelFilter;
                        document.querySelector('input[name="sparkPlug"]').value = car.sparkPlug;
                        document.querySelector('input[name="sparkPlugWires"]').value = car.sparkPlugWires;
                        document.querySelector('input[name="battery"]').value = car.battery;
                        document.querySelector('input[name="oil"]').value = car.oil;
                    } else {
                        console.log('No se pudo obtener los detalles del carro (boton editar)');
                    }
                } catch(error) {
                    console.log(error);
                }
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

    container.appendChild(inputGroup);
}

// Agregar un nuevo registro o editar un registro
document.getElementById('carForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const form = e.target;
    const formData = new FormData(this);
    const carData = {};

    if(!formData.get("make") || !formData.get("model")) {
        e.preventDefault();
    }

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
    
    try {
        if(isEditing) {
            const response = await fetch(`http://127.0.0.1:3000/api/cars/${currentCarId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            });

            if(response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "El registro ha sido actualizado correctamente!",
                    showConfirmButton: false,
                    timer: 1500
                });

                form.reset();
                setTimeout(() => location.reload(), 1500);
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Hubo un problema al actualizar el registro!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            const responseSearch = await fetch(`http://127.0.0.1:3000/api/cars?model=${encodeURIComponent(carData.model.trim())}`);
            if (responseSearch.ok) {
                const cars = await responseSearch.json();
    
                if (cars.length > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Este modelo ya ha sido registrado!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
            } else {
                console.log('No se encontraron carros que coincidan con los criterios de búsqueda');
            }
    
            const response = await fetch('http://127.0.0.1:3000/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            });
    
            if (response.ok) {            
                const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                modal.hide();
    
                Swal.fire('Éxito', 'El carro ha sido agregado correctamente', 'success');
                await listItems();
    
                form.reset();
                setTimeout(function() {
                    location.reload();
                    
                }, 2000);
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se pudo agregar el carro...",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
});
