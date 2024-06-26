//lista de tareas

const CLAVE_LOCALSTORAGE = "lista_tareas";

document.addEventListener("DOMContentLoaded", () => {

    let tareas = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE)) || [];


    const $contenedorTareas = document.querySelector("#contenedorTareas"),
        $btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
        $inputNuevaTarea = document.querySelector("#inputNuevaTarea");


    const guardarTareasEnAlmacenamiento = () => {
        localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
    };

    
    const refrescarListaDeTareas = () => {
        $contenedorTareas.innerHTML = tareas.map((tarea, indice) => `
            <li>
                <input type="checkbox" ${tarea.terminada ? 'checked' : ''} 
                        onchange="toggleTarea(${indice})">
                <span class="${tarea.terminada ? 'tachado' : ''}">${tarea.tarea}</span>
                <a href="#" class="enlace-eliminar" onclick="eliminarTarea(${indice})">&times;</a>
            </li>
        `).join('');
    };

    // función para agregar una nueva tarea
    $btnGuardarTarea.onclick = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Elemento guardado :)",
            showConfirmButton: false,
            timer: 1500
        });
        const tarea = $inputNuevaTarea.value.trim();
        if (tarea) {
            tareas.push({ tarea, terminada: false });
            $inputNuevaTarea.value = '';
            guardarTareasEnAlmacenamiento();
            refrescarListaDeTareas();
        }
    };

    // funciones para manipular tareas
    window.eliminarTarea = (indice) => {
        //if (confirm("¿Eliminar tarea?")) {
        tareas.splice(indice, 1);
        guardarTareasEnAlmacenamiento();
        refrescarListaDeTareas();
    }
});

window.toggleTarea = (indice) => {
    tareas[indice].terminada = !tareas[indice].terminada;
    guardarTareasEnAlmacenamiento();
    refrescarListaDeTareas();
};


refrescarListaDeTareas();
;