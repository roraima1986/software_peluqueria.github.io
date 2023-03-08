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
                    'action':'searchdata'
                },
                dataSrc: ""
        },
        columns: [
            {"data": "id"},
            {"data": "user"},
            {"data": "date_creation"},
            {"data": "total_prod"},
            {"data": "total_sale"},
            {"data": "is_canceled"},
            {"data": "id"},
        ],
        columnDefs: [
            {
                targets: [-2],
                orderable: false,
                render: function(data, type, row){
                    let html = '';
                    if(row.is_canceled === true){
                        html += `<big><big><span class="text-danger"><i class="fas fa-ban"></i></span></big></big>`;
                    }
                    return html;
                }
            },
            {
                targets: [-1],
                orderable: false,
                render: function(data, type, row){
                    let buttons = `
                        <div class="d-flex justify-content-around">
                            <button  type="button" onclick="detail('${row.id}', '${row.date_creation}', '${row.user}', '${row.type_sale}', '${row.observation}', '${row.total_prod}', '${row.total_sale}')"
                                class="btn btn-sm bg-gradient-info" data-toggle="modal" data-target="#myModalSale">
                                <i class="fas fa-eye"></i> Detalle
                            </butto>
                            <button class="btn btn-sm bg-gradient-danger">
                                <i class="fas fa-ban"></i> Anular
                            </button>
                        </div>
                        <div class="modal fade" id="myModalSale" data-backdrop="static"></div>
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

function detail(id, date_creation, user, type_sale, observation, total_prod, total_sale){
//detalle.detalle_de_compra(id);

let modal = document.getElementById('myModalSale');
let html;

html = `
<div class="modal-dialog modal-dialog-scrollable modal-xl">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title text-break">Venta N° ${id}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="p-3 mb-3">
                <!-- info row -->
                <div class="row">
                    <div class="col-12 table-responsive">
                        <table class="table table-bordered">
                            <thead class="bg-light">
                                <tr>
                                    <th>Fecha/Hora</th>
                                    <th>Usuario</th>
                                    <th>Tipo de Salida</th>
                                    <th>Observación</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>${date_creation}</td>
                                    <td>${user}</td>
                                    <td>${type_sale}</td>
                                    <td class="text-break">${observation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.row -->

                <!-- Table row -->
                <div class="row">
                    <div class="col-12 table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="bg-light text-center">
                            <tr>
                                <th>Código</th>
                                <th width="40%">Producto</th>
                                <th>Cant</th>
                                <th>P/Venta</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody id="this_detail">
                            <!-- <tr>
                                <td class="text-break"></td>
                                <td class="text-center"></td>
                                <td class="text-right">$ </td>
                                <td class="text-right">$ </td>
                                <td class="text-right">$ </td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->

                <div class="row">
                    <div class="col-md-8"></div>
                    <!-- /.col -->
                    <div class="col-md-4">

                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th width="60%">Total:</th>
                                    <td class="text-right">$ ${total_sale}</td>
                                </tr>
                                <tr>
                                    <th>Total cantidad de Productos:</th>
                                    <td class="text-right">${total_prod}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>

            <!-- <table class="table table-bordered">
                <tbody>
                <tr>
                    <th>Fecha Registro</th>
                    <td>

                    </td>
                    <th>Fecha Edicion</th>
                    <td>
                    </td>
                </tr>
                </tbody>
            </table> -->
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