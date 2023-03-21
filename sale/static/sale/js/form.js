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
                {"data": "id"}
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
                                <i class="fas fa-trash-alt"></i>
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
        minLength:2,
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
                    position: 'center',
                    icon: 'info',
                    title: 'Venta Guardada Exitosamente',
                    html: `<p>Compra N°</p>`
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
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

    /*$('#id_user').select2({
        theme: 'bootstrap4'
     });*/
});
