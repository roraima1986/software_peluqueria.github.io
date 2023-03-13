$(function(){
    $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "Todo"] ],
        deferRender: true,
        ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action':'searchdata',
                },
                dataSrc: ""
        },
        columns: [
            {"data": "name"},
            {"data": "photo"},
            {"data": "cant"},
            {"data": "price_purchase"},
            {"data": "price_sale"},
            {"data": "ganancy"},
            {"data": "status"},
            {"data": "barcode"},
            {"data": "name"},
        ],
        columnDefs: [
            // Nombre del producto
            {
                targets: [0],
                orderable: false,
                render: function(data, type, row){
                    let product_name = `
                        ${row.name}<br>
                        <em class="small">Categoría: ${row.category}</em>
                    `;

                    return product_name;
                }
            },
            // Foto
            {
                targets: [1],
                orderable: false,
                render: function(data, type, row){
                    if(row.photo === '') return `<img src="/static/core/img/logo_estetica.jpeg" style="width:30px; height:30px;" id="photo_product">`;
                    return `<img src="/media/${row.photo}" style="width:30px; height:30px;" id="photo_product">`;
                }
            },
            // Cantidad
            {
                targets: [2],
                orderable: false,
                render: function(data, type, row){
                    let cant = row.cant;
                    let range_stock = row.range_stock
                    if(cant === 0){
                        return `<div class="circle circle-danger">${cant}</div>`;
                    }else if(cant <= range_stock){
                        return `<div class="circle circle-warning">${cant}</div>`;
                    }else{
                        return `<div class="circle circle-success">${cant}</div>`;
                    }
                }
            },
            {
                targets: [3, 4, 5],
                orderable: false,
                render: function(data, type, row){
                    return '$'+data;
                }
            },
            // Estado
            {
                targets: [-3],
                orderable: false,
                render: function(data, type, row){
                    let status = row.status;
                    if(status === 'ACTIVO'){
                        return `<span class="badge bg-gradient-success">${status}</span>`;
                    }else{
                        return `<span class="badge bg-gradient-danger">${status}</span>`;
                    }
                }
            },
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function(data, type, row){
                    let buttons = `
                        <div class="d-flex justify-content-around">
                            <!--<a href="#" class="btn btn-sm bg-gradient-success mr-2">
                                <i class="fas fa-shopping-cart"></i> Agregar
                            </a>-->
                            <button onclick="detail('${row.name}', '${row.barcode}', '${row.category}', '${row.range_stock}', '${row.cant}', '${row.price_purchase}', '${row.price_sale}', '${row.status}', '${row.photo}')"
                                class="btn btn-sm bg-gradient-info mr-2" data-toggle="modal" data-target="#myModalProduct">
                                <i class="fas fa-eye"></i> Detalle
                            </button>
                            <a href="/product/product/edit/${row.id}/" class="btn btn-sm bg-gradient-warning">
                                <i class="fas fa-edit"></i> Editar
                            </a>
                        </div>
                        <div class="modal fade" id="myModalProduct" data-backdrop="static"></div>
                    `;
                    return buttons;
                }
            },
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ],
        initComplete: function(settings, json){
            //alert('Tabla cargada');
        },
        "language": {
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_ ",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Búsqueda Rápida:",
            "infoThousands": ",",
            "loadingRecords": "Cargando...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "<span>&raquo;</span>",
                "previous": "<span>&laquo;</span>"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad",
                "collection": "Colección",
                "colvisRestore": "Restaurar visibilidad",
                "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                "copySuccess": {
                    "1": "Copiada 1 fila al portapapeles",
                    "_": "Copiadas %ds fila al portapapeles"
                },
                "copyTitle": "Copiar al portapapeles",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Mostrar todas las filas",
                    "_": "Mostrar %d filas"
                },
                "pdf": "PDF",
                "print": "Imprimir",
                "renameState": "Cambiar nombre",
                "updateState": "Actualizar",
                "createState": "Crear Estado",
                "removeAllStates": "Remover Estados",
                "removeState": "Remover",
                "savedStates": "Estados Guardados",
                "stateRestore": "Estado %d"
            },
            "autoFill": {
                "cancel": "Cancelar",
                "fill": "Rellene todas las celdas con <i>%d<\/i>",
                "fillHorizontal": "Rellenar celdas horizontalmente",
                "fillVertical": "Rellenar celdas verticalmentemente"
            },
            "decimal": ",",
            "searchBuilder": {
                "add": "Añadir condición",
                "button": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "clearAll": "Borrar todo",
                "condition": "Condición",
                "conditions": {
                    "date": {
                        "after": "Despues",
                        "before": "Antes",
                        "between": "Entre",
                        "empty": "Vacío",
                        "equals": "Igual a",
                        "notBetween": "No entre",
                        "notEmpty": "No Vacio",
                        "not": "Diferente de"
                    },
                    "number": {
                        "between": "Entre",
                        "empty": "Vacio",
                        "equals": "Igual a",
                        "gt": "Mayor a",
                        "gte": "Mayor o igual a",
                        "lt": "Menor que",
                        "lte": "Menor o igual que",
                        "notBetween": "No entre",
                        "notEmpty": "No vacío",
                        "not": "Diferente de"
                    },
                    "string": {
                        "contains": "Contiene",
                        "empty": "Vacío",
                        "endsWith": "Termina en",
                        "equals": "Igual a",
                        "notEmpty": "No Vacio",
                        "startsWith": "Empieza con",
                        "not": "Diferente de",
                        "notContains": "No Contiene",
                        "notStarts": "No empieza con",
                        "notEnds": "No termina con"
                    },
                    "array": {
                        "not": "Diferente de",
                        "equals": "Igual",
                        "empty": "Vacío",
                        "contains": "Contiene",
                        "notEmpty": "No Vacío",
                        "without": "Sin"
                    }
                },
                "data": "Data",
                "deleteTitle": "Eliminar regla de filtrado",
                "leftTitle": "Criterios anulados",
                "logicAnd": "Y",
                "logicOr": "O",
                "rightTitle": "Criterios de sangría",
                "title": {
                    "0": "Constructor de búsqueda",
                    "_": "Constructor de búsqueda (%d)"
                },
                "value": "Valor"
            },
            "searchPanes": {
                "clearMessage": "Borrar todo",
                "collapse": {
                    "0": "Paneles de búsqueda",
                    "_": "Paneles de búsqueda (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Sin paneles de búsqueda",
                "loadMessage": "Cargando paneles de búsqueda",
                "title": "Filtros Activos - %d",
                "showMessage": "Mostrar Todo",
                "collapseMessage": "Colapsar Todo"
            },
            "select": {
                "cells": {
                    "1": "1 celda seleccionada",
                    "_": "%d celdas seleccionadas"
                },
                "columns": {
                    "1": "1 columna seleccionada",
                    "_": "%d columnas seleccionadas"
                },
                "rows": {
                    "1": "1 fila seleccionada",
                    "_": "%d filas seleccionadas"
                }
            },
            "thousands": ".",
            "datetime": {
                "previous": "Anterior",
                "next": "Proximo",
                "hours": "Horas",
                "minutes": "Minutos",
                "seconds": "Segundos",
                "unknown": "-",
                "amPm": [
                    "AM",
                    "PM"
                ],
                "months": {
                    "0": "Enero",
                    "1": "Febrero",
                    "10": "Noviembre",
                    "11": "Diciembre",
                    "2": "Marzo",
                    "3": "Abril",
                    "4": "Mayo",
                    "5": "Junio",
                    "6": "Julio",
                    "7": "Agosto",
                    "8": "Septiembre",
                    "9": "Octubre"
                },
                "weekdays": [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mie",
                    "Jue",
                    "Vie",
                    "Sab"
                ]
            },
            "editor": {
                "close": "Cerrar",
                "create": {
                    "button": "Nuevo",
                    "title": "Crear Nuevo Registro",
                    "submit": "Crear"
                },
                "edit": {
                    "button": "Editar",
                    "title": "Editar Registro",
                    "submit": "Actualizar"
                },
                "remove": {
                    "button": "Eliminar",
                    "title": "Eliminar Registro",
                    "submit": "Eliminar",
                    "confirm": {
                        "_": "¿Está seguro que desea eliminar %d filas?",
                        "1": "¿Está seguro que desea eliminar 1 fila?"
                    }
                },
                "error": {
                    "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                },
                "multi": {
                    "title": "Múltiples Valores",
                    "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                    "restore": "Deshacer Cambios",
                    "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                }
            },
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "stateRestore": {
                "creationModal": {
                    "button": "Crear",
                    "name": "Nombre:",
                    "order": "Clasificación",
                    "paging": "Paginación",
                    "search": "Busqueda",
                    "select": "Seleccionar",
                    "columns": {
                        "search": "Búsqueda de Columna",
                        "visible": "Visibilidad de Columna"
                    },
                    "title": "Crear Nuevo Estado",
                    "toggleLabel": "Incluir:"
                },
                "emptyError": "El nombre no puede estar vacio",
                "removeConfirm": "¿Seguro que quiere eliminar este %s?",
                "removeError": "Error al eliminar el registro",
                "removeJoiner": "y",
                "removeSubmit": "Eliminar",
                "renameButton": "Cambiar Nombre",
                "renameLabel": "Nuevo nombre para %s",
                "duplicateError": "Ya existe un Estado con este nombre.",
                "emptyStates": "No hay Estados guardados",
                "removeTitle": "Remover Estado",
                "renameTitle": "Cambiar Nombre Estado"
            }
        }
    });

});

function detail(name, barcode, category, range_stock, cant, price_purchase, price_sale, status, photo){
    let modal = document.getElementById('myModalProduct');
    let photoProduct;

    if(photo === ""){
        photoProduct = `<img src="/static/core/img/logo_estetica.jpeg" class="img-fluid">`;
    }else{
        photoProduct = `<img src="/media/${photo}" class="img-fluid">`;
    }

    let html = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Detalle de Productos</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <tbody>
                            <tr>
                                <td rowspan="9" style="width:40%" class="align-middle">
                                    ${photoProduct}
                                </td>
                            </tr>
                            <tr>
                                <th>Nombre/Descripción</th>
                                <td class="text-break">${name}</td>
                            </tr><tr>
                                <th>Código de Barra</th>
                                <td>${barcode}</td>
                            </tr>
                            <tr>
                                <th>Categoría</th>
                                <td>${category}</td>
                            </tr>
                            <tr>
                                <th>Stock Mínimo</th>
                                <td>${range_stock}</td>
                            </tr>
                            <tr>
                                <th>Cantidad</th>
                                <td>${cant}</td>
                            </tr>
                            <tr>
                                <th>Precio Compra</th>
                                <td>$ ${price_purchase}</td>
                            </tr>
                            <tr>
                                <th>Precio Venta</th>
                                <td>$ ${price_sale}</td>
                            </tr>
                            <tr>
                                <th>Estado</th>
                                <td>${status}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    `;

    modal.innerHTML = html;
}

