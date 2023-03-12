let tblProducts;
let vents = {
    items: {
        user: '',
        type_sale: '',
        observation: '',
        total_sale: 0,
        total_prod: 0,
        output_products: []
    },
    // Calcular los valores de la factura
    calculate_invoice: function(){
        let subtotal = 0;
        let cant_p = 0;
        $.each(this.items.output_products, function(pos, dict){
            dict.subtotal = dict.cant * parseInt(dict.price_sale);
            subtotal += dict.subtotal;
            cant_p += parseInt(dict.cant);
        });
        this.items.total_sale = subtotal;
        $("input[name='total_sale']").val(this.items.total_sale);
        this.items.total_prod = cant_p;
        $("input[name='total_prod']").val(this.items.total_prod);
    },
    // Añadir a la lista de productos
    add: function(item){
        this.items.output_products.push(item);
        this.list();
    },
    // Listar los productos en la tabla
    list: function(){
        this.calculate_invoice();
        tblProducts = $('#tblProducts').DataTable({
            dom: '',
            responsive: true,
            sortable: false,
            order: false,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            data: this.items.output_products,
            columns: [
                {"data": "barcode"},
                {"data": "name"},
                {"data": "cant"},
                {"data": "price_sale"},
                {"data": "subtotal"},
                {"data": "id"},
            ],
            columnDefs: [
                {
                    targets: [2],
                    orderable: false,
                    render: function(data, type, row){
                        return `<input type='number' id='cant_p' class='form-control form-control-sm' autocomplete='off' min=1 value=${row.cant}>`;
                    }
                },
                {
                    targets: [-3],
                    orderable: false,
                    render: function(data, type, row){
                        return '$'+parseInt(row.price_sale);
                    }
                },
                {
                    targets: [-2],
                    orderable: false,
                    render: function(data, type, row){
                        return '$'+row.subtotal;
                    }
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row){
                        let buttons = `
                            <a rel='remove' class="btn btn-sm bg-gradient-danger">
                                <i class="fas fa-ban"></i>
                            </a>
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
    }
};

$(function(){
    // Busqueda de productos
    $("#id-products-autocomplete").autocomplete({
        source: function(request, response){
            $.ajax({
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'search_products',
                    'term': request.term
                },
                dataType: 'json',
            }).done(function(data){
                response(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert(`${textStatus}: ${errorThrown}`)
            }).always(function(data){

            });
        },
        minLength:3,
        select: function(event, ui){
            event.preventDefault();
            ui.item.cant = 1;
            ui.item.subtotal = 0;
            vents.add(ui.item);
            vents.list();
            $(this).val('');
        }
    });


    $('#tblProducts')
        // Remover elementos de la table
        .on('click', 'a[rel="remove"]', function(){
            let tr = tblProducts.cell($(this).closest('td, li')).index();
            vents.items.output_products.splice(tr.row, 1);
            vents.list();
        })
        // Evento de cantidad
        .on('change keyup', '#cant_p', function(){
            let = cant_p = parseInt($(this).val());
            let tr = tblProducts.cell($(this).closest('td, li')).index();
            let data = tblProducts.row(tr.row).node();
            vents.items.output_products[tr.row].cant = cant_p;
            vents.calculate_invoice();
            $('td:eq(4)', tblProducts.row(tr.row).node()).html('$'+vents.items.output_products[tr.row].subtotal);
        }
    );

    const form = $('form');
    delete vents.items.form;

    // Evento submit (Boton Guardar o Procesar)
    form.on('submit', function(e){
        e.preventDefault();
        vents.items.user = $('select[name="user"]').val();
        vents.items.type_sale = $('select[name="type_sale"]').val();
        vents.items.observation = $('input[name="observation"]').val();

        let parameters = new FormData();
        parameters.append('action', $('input[name="action"]').val());
        parameters.append('vents', JSON.stringify(vents.items));
        $.ajax({
            url: window.location.pathname,
            type: "POST",
            data: parameters,
            dataType: "json",
            processData: false,
            contentType: false
        }).done(function(data){
            if(!data.hasOwnProperty('error')){
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Venta guardada exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                location.reload();
                return false;
            };
            message_error(data.error);
        }).fail(function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus}: ${errorThrown}`)
        }).always(function(data){

        });
    });

    // Fecha
    let date_sale = document.getElementById('date-sale');
    date_sale.innerHTML = new Date().toLocaleDateString();

    // Hora
    let time_sale = document.getElementById('time-sale');

    function displayTime(){
        time_sale.innerHTML = new Date().toLocaleTimeString();
    }

    setInterval(displayTime, 1000);
});
