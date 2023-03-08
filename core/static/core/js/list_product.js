function add_stock(name, cant_previous){
    let modal2 = document.getElementById('modal-default');
    let add_c;

    add_c = `
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title text-break">Agregar Stock ${name}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="form-validate">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>Stock Actual</th>
                                <th>Agregar Stock</th>
                                <th>Resultado</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="form-group">
                                        <input type="number" id="stock_actual" oninput="cal_stock()" class="form-control" min="0" value="${cant_previous}" readonly>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <input type="number" id="append_stock" oninput="cal_stock()" class="form-control" min="1">
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <input type="number" id="result_stock" oninput="cal_stock()" class="form-control" min="0" readonly>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">
                        <i class="fas fa-plus-circle"></i>
                        Agregar
                    </button>

                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
    `;

    modal2.innerHTML = add_c;
}

function cal_stock(){
    let stock_actual = document.getElementById("stock_actual");
    stock_actual = parseInt(stock_actual.value);

    let append_stock = document.getElementById("append_stock");
    append_stock = parseInt(append_stock.value);

    let result_stock = document.getElementById("result_stock").value = stock_actual + append_stock;
}

function detail(nombre, barcode, categoria, rango_stock, cant, precio_compra, precio_venta, estado, foto, creado, editado){
    let modal = document.getElementById('modal-detail');
    let html;

    html = `
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title text-break">${nombre}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td rowspan="9" class="text-center align-middle" width="40%">
                            <img src="${foto}" class="img-fluid img-thumbnail">
                        </td>
                        <th>Código de Barra</th>
                        <td>
                            ${barcode}
                        </td>
                    </tr>
                    <tr>
                        <th>Categoría</th>
                        <td>
                            ${categoria}
                        </td>
                    </tr>
                    <tr>
                        <th>Stock Mínimo</th>
                        <td>
                            ${rango_stock}
                        </td>
                    </tr>
                    <tr>
                        <th>Stock</th>
                        <td>
                            ${cant}
                        </td>
                    </tr>
                    <tr>
                        <th>Precio Compra</th>
                        <td>
                            $ ${precio_compra}
                        </td>
                    </tr>
                    <tr>
                        <th>Precio Venta</th>
                        <td>
                            $ ${precio_venta}
                        </td>
                    </tr>
                    <tr>
                        <th>Estado</th>
                        <td>
                            ${estado}
                        </td>
                    </tr>
                    <tr>
                        <th>Fecha Registro</th>
                        <td>
                            ${creado}
                        </td>
                    </tr>
                     <tr>
                        <th>Fecha Edicion</th>
                        <td>
                            ${editado}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
    `;

    modal.innerHTML = html;
}

