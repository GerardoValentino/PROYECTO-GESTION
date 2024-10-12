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
                        <i class="fa-solid fa-pen-to-square btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${car.id}"></i>
                    </td>
                </tr>
            `;
        });
        tableBody_cars.innerHTML = content;

        // Aplicamos delegación de eventos OSIOSI :D
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
                        setTimeout(function() {
                            location.reload();
                            
                        }, 2000);
                    }
                })
            }
            if (e.target.classList.contains('btn-edit')) {
                console.log(e.target);
                //alert("Diste click en editar");
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

    const form = e.target;
    // Capturar los valores del formulario
    const formData = new FormData(this);
    const carData = {};

    if(!formData.get("make") || !formData.get("model")) {
        e.preventDefault();
    }

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
    
    try {
        const responseSearch = await fetch(`http://127.0.0.1:3000/api/cars?model=${encodeURIComponent(carData.model.trim())}`);
        if (responseSearch.ok) {
            const cars = await responseSearch.json();
            console.log(cars);

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
    } catch (error) {
        console.log(error);
    }
});
