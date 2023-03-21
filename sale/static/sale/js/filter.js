// Modal Filtro
let modal = document.getElementById('myModalFilterDate');

let html;

html = `
<form method="get" action="/sale/report_excel_sale_filter/" class="form-validate">
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
                <label>Rango de Fecha</label>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Desde:</label>
                            <div class="form-group col-sm-10">
                                <input type="date" name="start_date" id="start_date" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Hasta:</label>
                            <div class="form-group col-sm-10">
                                <input type="date" name="finish_date" id="finish_date" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Personal</label>
                    <select class="form-control select2bs4" name="cbo_user" id="cbo-user"></select>
                </div>
                <div class="form-group">
                    <label>Tipo de Salida</label>
                    <select class="form-control" name="cbo_type_sale" id="cbo-type-sale">
                        <option value="">--------</option>
                        <option value="Venta">Venta</option>
                        <option value="Merma">Merma</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" name="chk_anulada">
                    <label>Ventas Anuladas</label>
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



// LLenar select de proveedores
const listarUsers = async () => {
    try{
        const response = await fetch("/sale/get_users/");
        const data = await response.json();

        if(data.message === 'Success'){
            let opciones = `<option value="">----------</option>`;
            let cbo_user = document.getElementById('cbo-user');

            data.users.forEach((user) => {
                opciones += `<option value="${user.id}">${user.username}</option>`
            });
            cbo_user.innerHTML = opciones;
        }else{
            console.log('Usuarios no encontrados');
        }
    }catch(error){
        console.log(error);
    }
}

const cargaInicial = async () => {
    await listarUsers();
};

window.addEventListener("DOMContentLoaded", async () => {
    await cargaInicial();
});











