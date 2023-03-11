// Modulo de ventas
globalThis.ventas = new class modulo_ventas{

    constructor(){
       //console.log("modulo ventas cargado");
       this.init();
       this.productos=Array();
       //guardar id de los productos en un array
       this.seleccionados=Array();
       this.cantidad=0;
    }

    init(){
        //traer todos los usuarios de la base de datos
//        $.ajax({
//            url: "/sale/listado_usuarios",
//            type: "GET",
//            success: function (data) {
//                console.log(data);
//                let opciones=$("#usuarios");
//
//                data.forEach(element => {
//                    opciones.append(`<option value='${element.internal_code}'>${element.first_name} </option>`);
//                });
//            },
//            error: function (data) {
//                console.log('Error:', data);
//            }
//        })

        //traer todos los productos de la base de datos
        //console.log("traer productos")
        let $this=this;
        $.ajax({
            url: "/sale/listado_productos",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $this.productos= data;
                //console.log("productos",$this.productos);
            },
            error: function (data) {
                //console.log('Error:', data);
            }
        })
    }


    buscarproductos(){
        let $this=this;
        let buscar= document.getElementById('listado').value;
        //console.log("buscar productos",buscar);
        //console.log("productos---->",$this.productos);
        const buscar_min= buscar.toLowerCase();
        const resultado= document.querySelector('#resultado');
        resultado.innerHTML='';
        if (buscar.length>=3){
            //console.log('mas de tres de largo')
            // recorrer el array de productos
            $this.productos.forEach(element => {
                const nombre_min=element.name.toLowerCase();
                const codigo=element.barcode;
                //console.log('nombre y codigo',nombre_min,codigo)
                if (nombre_min.indexOf(buscar_min)!== -1 || codigo.indexOf(buscar_min)!== -1){
                    //console.log("producto encontrado",element);
                    resultado.innerHTML+=`
                        <style>
                            #resultado{
                                padding: 3px;
                                border: 1px solid #ced4da;
                                border-radius: 0.25rem;
                            }

                            #resultado li{
                                list-style: none;
                                padding: 3px;
                                margin: 3px;
                                cursor: pointer;
                                border-radius: 5px;
                            }
                            #resultado li:hover{
                                background-color: #ccc;
                            }
                        </style>
                        <li onclick="ventas.agregar_a_listado('${element.id}','${element.barcode}','${element.name}','${element.price_sale}');">
                            ${element.name} <b>Cod.</b> ${element.barcode} <b>Precio</b> $${element.price_sale}
                        </li>
                        `;
                }
                if(resultado.innerHTML===''){
                   resultado.innerHTML+=`<li style=" list-style: none;">Producto no encontrado...</li>`;
                }
            });
        }


    }

    agregar_a_listado(id,codigo,nombre,precio){
        let $this=this;

        // guardar cantidad de productos en un array
        // guardar precio de los productos en un array
        //console.log("id seleccionado",id);



        // revisar si ya estaba seleccionado
        let ya_estaba=$this.seleccionados.indexOf(id);
        if  ($this.seleccionados.indexOf(id)!== -1 ){
            //console.log("ya estaba seleccionado")
            $this.cantidad=$this.cantidad+1;
            //console.log("cantidad",$this.cantidad)
            let meter_cantidad=document.getElementById(`cant${id}`);

            meter_cantidad.value= parseInt(meter_cantidad.value) + $this.cantidad;
            $this.cantidad=1;

            // meter elementos en el input
            return;
        }else{
            //console.log("no estaba seleccionado agregar a listado")
            $this.seleccionados.push(id);
            //console.log("seleccionado",$this.seleccionados)


            let contenido_carrito=document.getElementById('product_selected');
            contenido_carrito.innerHTML+=`
            <style>
                .input_text{
                width: 100%;
                float: left;
                border: none;
                border-radius: 5px;
                }
                .input_text:focus{
                border: 1px solid #e9ecef;
                outline: none;
            }
            </style>
                <tr id='rows${id}'>
                    <td>
                        <input type='hidden' readonly name='id_del_prod${id}' value='${id}'>
                        <input type='text' readonly name='cod_prod' value='${codigo}' class='input_text'>
                    </td>
                    <td>
                        <input type='text' readonly name='nombre_prod' value='${nombre}' class='input_text'>
                    </td>
                    <td>
                        <input type='text' id="cant${id}" name='cant_prod' value=${$this.cantidad} class='input_text' oninput="ventas.product_subtotal('${id}')">
                    </td>
                    <td>
                        <input type='text' id="pventa${id}" readonly name='precio_prod' value='${precio}' class='input_text' oninput="ventas.product_subtotal('${id}')">
                    </td>
                    <td>
                        <input type='text' id="sub${id}" readonly name='subtotal_prod' value='' class='input_text'>
                    </td>
                    <td>
                        <button type="button" onclick="ventas.delete_rows('rows${id}')" class="btn bg-gradient-danger btn-sm" title="Quitar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;

        this.id_productos_seleccionados.push(id)
        }


    }

    delete_rows(id){
        //Eliminar la fila de la tabla de compras
        //console.log('id de la fila',id)
        let fila = document.getElementById(id);
        console.log('fila', fila);
        this.tbody.removeChild(fila)

        // actualizar total de pago

        /*let all=  parseInt(document.getElementById('id_total').value);
        parseInt(all);
        let la_resta=  all - parseInt(subtotal) ;
        this.total_compra.value= la_resta;*/

        // Actualiza total de los productos

        /*let all_productos = parseInt(document.getElementById('id_total_prod').value);
        parseInt(all_productos);

        let la_resta_prod=  all_productos - parseInt(productos);

        this.total_prod.value = la_resta_prod;*/

        // Elimina productos del array de productos de la compra
        // Explora dentro del diccionario y hace los cambios directamente
        //let quitar = this.proveedor_productos_total.productos
        /*let index = quitar.findIndex( (item) => item.id_producto == id)
        quitar.splice(index,1)*/
        //console.log(this.proveedor_productos_total.productos)


    }

    product_subtotal(id_prod){
        // hacer el calculo y colocarselo al subtotal
//        let pcompra = document.getElementById(`pcom${id_prod}`).value;
        let cantidad = document.getElementById(`cant${id_prod}`).value;
        let precio_venta = document.getElementById(`pventa${id_prod}`).value;
        let input_sub = document.getElementById(`sub${id_prod}`)
//
        let sub_prod = precio_venta * cantidad;
        input_sub.value=sub_prod;
//        //console.log('ide del producto:',id_prod,'subtotal:',input_sub.value)
//
//        // hacer una funcion que recorra todos los subtotales y actualice el total de forma automatica
//        this.total_valor_compra();
    }




}

