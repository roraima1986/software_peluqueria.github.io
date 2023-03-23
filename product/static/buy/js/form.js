let tblProducts;

let buys = {
    items: {
        date_register: '',
        provider: '',
        n_invoice: '',
        date_invoice: '',
        total: 0,
        total_prod: 0,
        shopping_products: []
    },
    // Calcular valores
    calculate_buy: function(){
        let subtotal_prod = 0;
        let cant_p = 0;
        $.each(this.items.shopping_products, function(pos, dict){
            dict.subtotal_prod = dict.cant * parseInt(dict.price_purchase);
            subtotal_prod += dict.subtotal_prod;
            cant_p += parseInt(dict.cant);
            dict.price_sale = parseInt(dict.price_sale); // Agregar precio de venta
        });
        this.items.total = subtotal_prod;
        $("input[name='total']").val(this.items.total);
        this.items.total_prod = cant_p;
        $("input[name='total_prod']").val(this.items.total_prod);
    },
    // Agregar a la lista de productos
    add: function(item){
        this.items.shopping_products.push(item);
        this.list();
    },
    // Lista de productos
    list: function(){
        this.calculate_buy();
        tblProducts = $('#tblProducts').DataTable({
            dom: '',
            responsive: true,
            sortable: false,
            order: false,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            data: this.items.shopping_products,
            columns: [
                {"data": "name"},
                {"data": "cant"},
                {"data": "price_purchase"},
                {"data": "price_sale"},
                {"data": "subtotal_prod"},
                {"data": "id"}
            ],
            columnDefs: [
                {
                    targets: [1],
                    orderable: false,
                    render: function(data, type, row){
                        return `<input type='number' id='cant_p' class='form-control form-control-sm' autocomplete='off' min=1 value=${row.cant}>`;
                    }
                },
                {
                    targets: [2],
                    orderable: false,
                    render: function(data, type, row){
                        return `
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                </div>
                                <input type='number' id='price_purchase_p' class='form-control form-control-sm' autocomplete='off' min=0 value=${row.price_purchase}>
                            </div>
                        `;
                    }
                },
                {
                    targets: [3],
                    orderable: false,
                    render: function(data, type, row){
                        return `
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                </div>
                                <input type='number' id='price_sale_p' name='price_sale' class='form-control form-control-sm' autocomplete='off' min=0 value=${row.price_sale}>
                            </div>
                        `;
                    }
                },
                {
                    targets: [4],
                    orderable: false,
                    render: function(data, type, row){
                        return '$'+row.subtotal_prod;
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
            ui.item.subtotal_prod = 0;
            buys.add(ui.item);
            $(this).val('');
        }
    });

    // Evento cantidad
    $("#tblProducts").on('change keyup', '#cant_p', function(){
        let cant_p = parseInt($(this).val());
        let tr = tblProducts.cell($(this).closest('td, li')).index();
        let data = tblProducts.row(tr.row).node();
        buys.items.shopping_products[tr.row].cant = cant_p;
        buys.calculate_buy();
        $('td:eq(4)', tblProducts.row(tr.row).node()).html('$'+buys.items.shopping_products[tr.row].subtotal_prod);
    });

    // Evento Precio Compra
    $("#tblProducts").on('change keyup', '#price_purchase_p', function(){
        let price_purchase_p = parseInt($(this).val());
        let tr = tblProducts.cell($(this).closest('td, li')).index();
        let data = tblProducts.row(tr.row).node();
        buys.items.shopping_products[tr.row].price_purchase = price_purchase_p;
        buys.calculate_buy();
        $('td:eq(4)', tblProducts.row(tr.row).node()).html('$'+buys.items.shopping_products[tr.row].subtotal_prod);
    });

    // Evento Precio de Venta
    $("#tblProducts").on('change keyup', '#price_sale_p', function(){
        let price_sale_p = parseInt($(this).val());
        let tr = tblProducts.cell($(this).closest('td, li')).index();
        let data = tblProducts.row(tr.row).node();
        buys.items.shopping_products[tr.row].price_sale = price_sale_p;
        buys.calculate_buy();
        $('td:eq(4)', tblProducts.row(tr.row).node()).html('$'+buys.items.shopping_products[tr.row].subtotal_prod);
    });

    // Remover elementos de la tabla
    $('#tblProducts').on('click', 'a[rel="remove"]', function(){
        let tr = tblProducts.cell($(this).closest('td, li')).index();
        buys.items.shopping_products.splice(tr.row, 1);
        buys.list();
    })

    // Evento submit (Guardar Compra)
    $('#form-general').on('submit', function(e){
        e.preventDefault();
        buys.items.date_register = $('input[name="date_register"]').val();
        buys.items.provider = $('select[name="provider"]').val();
        buys.items.n_invoice = $('input[name="n_invoice"]').val();
        buys.items.date_invoice = $('input[name="date_invoice"]').val();

        let parameters = new FormData();
        parameters.append('action', $('input[name="action"]').val());
        parameters.append('buys', JSON.stringify(buys.items));
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
                    icon: 'success',
                    title: 'Compra guardada exitosamente',
                    showConfirmButton: false,
                });
                setTimeout(function() {
                    location.href= '/product/buy/list';
                }, 500);
                return false;
            };
            message_error(data.error);
        }).fail(function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus}: ${errorThrown} `)
        }).always(function(data){

        });
    });

    // Abrir modal de agregar un nuevo producto
    $("#btn_new_product").click(function(){
        $("#myModalProduct").modal('show');
    });

    // Evento submit de guardar productos desde modal
    $('#formProduct').on('submit', function(e){
        e.preventDefault();
        let parameters = new FormData(this);
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
                    icon: 'success',
                    title: 'Producto guardado exitosamente',
                    showConfirmButton: false,
                    timer: 500
                });
                setTimeout(function() {
                    $("#myModalProduct").modal('hide');
                }, 500);
                return false;
            };
            message_error(data.error);
        }).fail(function(jqXHR, textStatus, errorThrown){
            alert(`${textStatus}: ${errorThrown}`)
        }).always(function(data){

        });

    });

    // Abrir modal de agregar un nuevo producto
    $("#btn_new_provider").click(function(){
        $("#myModalProvider").modal('show');
    });

    // Evento submit de guardar productos desde modal
    $('#formProvider').on('submit', function(e){
            e.preventDefault();
            let parameters = new FormData(this);
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
                        icon: 'success',
                        title: 'Proveedor guardado exitosamente',
                        showConfirmButton: false,
                        timer: 500
                    });
                    setTimeout(function() {
                        $("#myModalProvider").modal('hide');
                    }, 500);
                    return false;
                };
                message_error(data.error);
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert(`${textStatus}: ${errorThrown}`)
            }).always(function(data){

            });

        });
});