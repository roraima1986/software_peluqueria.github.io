// Modal Filtro Fecha
let modal = document.getElementById('myModalFilterDate');

let html;

html = `
<form method="get" action="/product/report_excel_product_filter/" class="form-validate">
<div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title text-break">
                <i class="fas fa-search"></i>
                Excel Detalles
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="alert bg-gradient-info">
                <i class="fas fa-exclamation-circle"></i>
                Llenar sólo los campos que necesita.
            </div>
            <div>
                <div class="form-group">
                    <label>Nombre de Producto</label>
                    <input type="text" name="product_name" class="form-control group-filter" autocomplete="off">
                    <small>Puede escribir parcialmente el nombre del producto</small>
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <select class="form-control group-filter" name="cbo_category" id="cbo-category"></select>
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <select class="form-control group-filter" name="cbo_stock" id="cbo-stock">
                        <option value="" selected>-------</option>
                        <option value="1">Stock Positivo</option>
                        <option value="2" class="text-warning">Stock Por Agotarse</option>
                        <option value="3" class="text-danger">Sin Stock</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado</label>
                    <select class="form-control group-filter" name="cbo_status" id="cbo-status">
                        <option value="" selected>-------</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INHABILITADO">INHABILITADO</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-end">
                <button class="btn bg-gradient-secondary mr-2" data-dismiss="modal">
                    <i class="fas fa-times"></i> Cancelar
                </button>
                <button type="reset" class="btn bg-gradient-danger mr-2">
                    <i class="fas fa-sync-alt"></i> Limpiar
                </button>
                <button type="submit" class="btn bg-gradient-success">
                    <i class="fas fa-file-excel"></i>
                    Procesar
                </button>
            </div>
        </div>
    </div>
    <!-- /.modal-content -->
</div>
</form>
`;

modal.innerHTML = html;



// LLenar select de categorías
const listarCategorias = async () => {
    try{
        const response = await fetch("/product/get_categories/");
        const data = await response.json();

        if(data.message === 'Success'){
            let opciones = `<option value="">----------</option>`;
            let cbo_category = document.getElementById('cbo-category');

            data.categories.forEach((category) => {
                opciones += `<option value="${category.id}">${category.name}</option>`
            });
            cbo_category.innerHTML = opciones;
        }else{
            console.log('Categorías no encontradas');
        }
    }catch(error){
        console.log(error);
    }
}

const cargaInicial = async () => {
    await listarCategorias();
};

window.addEventListener("DOMContentLoaded", async () => {
    await cargaInicial();
});











