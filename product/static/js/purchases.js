globalThis.buy = new class modulo_compras{
// GUARDAR JSON DE PRODUCTOS EN LA BASE DE DATOS
// REVISAR LOS CAMPOS QUE SE VAN A CERO CUADO SE AGREGA UNO NUEVO


    constructor(){
        //console.log('modulo de compras cargado')
        this.tbody= document.getElementById('product_selected')
        
        //this.producto=document.getElementById('id_product');
        //this.cantidad=document.getElementById('id_cant');
        //this.precio_compra=document.getElementById('id_price_purchase');
        //this.precio_venta=document.getElementById('id_price_sale');
        //this.subtotal_pc = document.getElementById('id_subtotal');

        this.todos_los_productos = Array();
        
        // Total productos y cantidades para guardar en la base de datos
        this.id_productos_seleccionados = Array();
        this.total_compra=document.querySelector('#id_total');
        this.total_prod=document.querySelector('#id_total_prod');

        this.proveedor_productos_total={
            'id_proveedor':0,
            'numero_factura':0,
            'fecha_factura':'',
            'total_compra':0,
            'total_productos':0,
            'productos':Array()
        }


        this.init();
    }
    
    init(){
        console.log('iniciando modulo de compras')
        // generear un json con todos los productos
        // hacer una perticion asincrona con fetch
//        fetch('/product/todos_products_compra')
//        .then( (response) => response.json())
//        .then( (data) => {
//            this.todos_los_productos = data;
//            //console.log('todos los productos', this.todos_los_productos)
//        })
//        .catch( (error) => {
//            //console.log('error al cargar los productos', error)
//        })


        
    }
    
    buscarproductos(){
        //console.log('buscar productos..')
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
            $this.todos_los_productos.forEach(element => {
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
                        <li onclick="buy.agregar_celda('${element.id}','${element.barcode}','${element.name}','${element.price_purchase}','${element.price_sale}');">
                            ${element.name} <b>Cod.</b> ${element.barcode} <b>P.Compra:</b> $${element.price_purchase} <b>P.Venta:</b> $${element.price_sale}
                        </li>
                        `;
                }
                if(resultado.innerHTML===''){
                   resultado.innerHTML+=`<li style=" list-style: none;">Producto no encontrado...</li>`;
                }
            });
        }


    }

    //capturar el valor de los campos del formulario
    agregar_celda(id,barcode,name,price_purchase,price_sale){

        console.log('agregar celda',id)
        // limpiar el campo de busqueda y el resultado
        document.getElementById('listado').value='';
        document.querySelector('#resultado').innerHTML='';
        let id_product=id
        //console.log('id_product##',id_product)
        let name_product=name
        //console.log('el producto es: ', name_product)
        let price_buy=price_purchase
        let price_sell=price_sale

            this.tbody.innerHTML+= `
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
            <tr id='rows${id_product}'>
                <td>
                  <!--<input type='hidden'  readonly name='id_del_prod${id_product}' value='${id_product}'>-->
                    <input type='text' readonly id="name_prod${id_product}"
                        name='name_prod${id_product}'
                        value='${name_product}' class='input_text'>
                </td>
                <td>
                    <input type='number' id="cant${id_product}"
                        oninput="buy.product_subtotal('${id_product}')" name='cant_prod${id_product}' class='input_text id_p'>
                </td>
                <td>
                    <input type='number'  id="pcom${id_product}"
                        oninput="buy.product_subtotal('${id_product}')" name='buy_prod${id_product}'
                        value='${price_buy}' class='input_text'>
                </td>
                <td>
                    <input type='number'  id="pventa${id_product}" oninput="buy.product_subtotal('${id_product}')"
                    name='sell_prod${id_product}' value='${price_sell}' class='input_text'>
                </td>
                <td>
                    <input type='number'  readonly id='sub${id_product}'name='subtotal_prod${id_product}' value='' class='input_text'>
                </td>
                <td>
                <button type="button" onclick="buy.delete_rows('rows${id_product}','sub${id_product}','cant${id_product}')" class="btn bg-gradient-danger btn-sm" title="Quitar">
                    <i class="fas fa-trash-alt"></i>
                </button>
                </td>
            </tr>`
            
            this.id_productos_seleccionados.push(id_product)
            //console.log('Agregar id_productos_seleccionados', this.id_productos_seleccionados)

            /* let prod={
                'id':id_product,
                'name':name_product,
                'price_buy':price_buy,
                'price_sell':price_sell,
                'cant':0,
                'subtotal':0
            }
            this.proveedor_productos_total.productos.push(prod)*/

    }
    
    delete_rows(id, id_subtotal, id_cant){
        // Actualizar el total a pagar descontar el subtotal de la celda borrada

        let value_subtotal=document.getElementById(id_subtotal).value;
        this.proveedor_productos_total.total_compra=this.proveedor_productos_total.total_compra - value_subtotal;

        // Campo total
        let final_pago = document.getElementById('id_total')
        final_pago.value =this.proveedor_productos_total.total_compra;

        // capturar el producto que se esta quitando
        console.log("viene",id_cant)
        console.log("Actualiz", document.getElementById(id_cant))
        let sub_pro = document.getElementById(id_cant).value;

        //renderizar
        this.proveedor_productos_total.total_productos = this.proveedor_productos_total.total_productos - sub_pro;
        document.getElementById('id_total_prod').value = this.proveedor_productos_total.total_productos;

        //Eliminar la fila de la tabla de compras
        let fila = document.getElementById(id);
        this.tbody.removeChild(fila)
        // Eliminar id del array de id_productos_seleccionados
        this.id_productos_seleccionados.splice(this.id_productos_seleccionados.indexOf(id),1)
    }


    new_provider(){
        //console.log('Agregar nuevo proveedor')
        let formulario= document.getElementById('nuevo_prov');

        let parametros= $(formulario).serializeArray();
        const TOKEN= globalThis.TOKEN
        let nombre= document.getElementById('id_name').value.trim(); 
        let rut= document.getElementById('id_rut').value.trim();

        if(nombre.length <=0 || rut.length <=0){
            Swal.fire({
                title:'Error',
                text:'El nombre y rut del proveedor no pueden estar vacios vale, tu eres loco ramon?',
                icon:'error',
            })
        }else{

            $.ajax({
                url:'/product/new_provider',
                type:'POST',
                dataType:'json',
                data:$(formulario).serialize(),
                headers:{"X-CSRFToken":TOKEN}
            }).done(function (data1){
                // agregar el proveedor al select
                if(data1.error){
                    //console.log('error.....',data1)
                    Swal.fire({
                        text:'Ya tienes un proveedor con este Rut 🙄',
                        icon:'warning',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }else{
                    //console.log('proveedor creado',data1)

                    let select_prov=document.getElementById('id_provider');
                    select_prov.innerHTML='';
                    
                    data1.forEach(element => {
                        select_prov.innerHTML+=`
                            <option value="${element.id}" selected>${element.name} ${element.rut}</option>
                        `
                    });
                    $('.close').click();
                }
            }).fail(function(data1){
                Swal.fire({
                    text:'Error al crear el proveedor, revise los datos ingresados',
                    icon:'error',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            })
        } 
    }    

    new_product(){
        let $this= this;
        let nombre= document.getElementById('id_name').value.trim();
        let barcode= document.getElementById('id_barcode').value.trim();
        let categoria= document.getElementById('id_category').value;
        let range_stock= document.getElementById('id_range_stock').value;
        let status= document.getElementById('id_status').value;
        let imagen= document.getElementById('id_photo').files[0];
        if(nombre.length <=0 || categoria.length <=0 || barcode.length <=0){
            Swal.fire({
                title:'info',
                text:'Es necesario como minimo el nombre, codigo y la categoria del producto ',
                icon:'error',
            })

        }else{
            let new_product= document.getElementById('form_producto');

            /*
                Es imperativo establecer la opción contentType en false ,
                lo que obliga a jQuery a no agregar un encabezado de tipo de contenido para usted;
                de lo contrario, faltará la cadena de límite. Además, 
                debe dejar el indicador processData establecido en false , de lo contrario,
                jQuery intentará convertir su FormData en una cadena, lo que fallará.
                Debido a que estamos enviando imágenes, el enctype debe ser 'multipart/form-data'  
                para que se codifique nuestro archivo de imagen.
            */
            
            // usar FormData para enviar formulario con imagen
            let form_data = new FormData();
            form_data.append('name',nombre);
            form_data.append('barcode',barcode);
            form_data.append('category',categoria);
            form_data.append('range_stock',range_stock);
            form_data.append('status',status);
            form_data.append('photo',imagen);

            const TOKEN= globalThis.TOKEN

            $.ajax({
                url:'/product/new_product',
                type:'POST',
                dataType:'json',
                data: form_data,//$(new_product).serialize(),
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data',
                headers:{"X-CSRFToken":TOKEN}
            }).done(function (data2){
                if(data2.error_dupli){
                    Swal.fire({
                        text:'Ya tienes un producto con este nombre o código de barras 🙄',
                        icon:'warning',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }else{
               
                    //console.log('todos los productos segunda parte',data2)
                    $this.todos_los_productos=[];
                    $this.todos_los_productos=data2;
                    $('.close').click();
                }
            }).fail(function(data2){
                Swal.fire({
                    text:'Error al crear el producto, revise los datos ingresados',
                    icon:'error',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            })
        }
    }

    guardar_compra(){
        let proveedor = document.getElementById('id_provider').value;
        console.log('proveedor',proveedor)
        let factura = document.getElementById('id_n_invoice').value;
        console.log('factura',factura)
        let fecha_factura = document.getElementById('id_date_invoice').value;
        console.log('fecha_factura',fecha_factura)
        let fecha_hoy = document.getElementById('id_date_register').value;
        console.log('fecha_hoy',fecha_hoy)

        // tomar valores de los productos seleccionados con el array de id_productos_seleccionados
        console.log("this.id_productos_seleccionados",this.id_productos_seleccionados)
        let recorrido = {
            'product_id':'',
            'product_name': '',
            'cant': '',
            'price_purchase': '',
            'price_sale': '',
            'subtotal_prod': '',
        };
        this.id_productos_seleccionados.forEach(element => {
            recorrido.product_id = element;
            recorrido.product_name = document.getElementById(`name_prod${element}`).value;
            recorrido.cant = document.getElementById(`cant${element}`).value;
            recorrido.price_purchase = document.getElementById(`pcom${element}`).value;
            recorrido.price_sale = document.getElementById(`pventa${element}`).value;
            recorrido.subtotal_prod = document.getElementById(`sub${element}`).value;

            this.proveedor_productos_total.productos.push(recorrido)

            recorrido = {}

        })

        console.log('Lo que se va a enviar',this.proveedor_productos_total)



        if(fecha_factura.length <=0){
            fecha_factura = fecha_hoy;
        }
        if (proveedor.length <=0 ){
            Swal.fire({
                title:'info',
                text:'Es necesario seleccionar un proveedor',
                icon:'error',
            })
        }else{
            this.proveedor_productos_total.fecha_factura = fecha_factura;
            this.proveedor_productos_total.id_proveedor = proveedor;
            this.proveedor_productos_total.numero_factura = factura;
            
            let datos_r= this.proveedor_productos_total;
            
            // aplicar JSON.stringify convierte el objeto en un string para poder ser enviado por ajax
            // let list_prod= JSON.stringify({"produc":this.proveedor_productos_total.productos});
            // tambien dentro del data creamos el objeto con la clave y el valor 'list_prod[]':list_prod para que el servidor lo reciba con ese nombre
            let list_prod= JSON.stringify({"produc":this.proveedor_productos_total.productos});

            let data={'datos_r':datos_r,
                        'list_prod[]':list_prod
                    }
            // Hacer ajax para enviar datos al servidor

            $.ajax({
                url:'/product/new_buy', 
                type:'POST',
                dataType:'json',
                headers:{"X-CSRFToken":globalThis.TOKEN},
                data: data,

                success: function(data){
                    Swal.fire({
                        //title:'',
                        text:'Compra registrada con éxito',
                        icon:'success',
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            window.location.href = '/product/buy/add/';
                            }
                        })
                },
                error: function(data){
                    Swal.fire({
                        title:'info',
                        text:'Error al registrar la compra',
                        icon:'error',
                    })
                }
                
            })
        }

    }


    product_subtotal(id_prod){
        // hacer el calculo y colcoarselo al subtotal
        let pcompra = document.getElementById(`pcom${id_prod}`).value;
        let cantidad = document.getElementById(`cant${id_prod}`).value;
        let input_sub = document.getElementById(`sub${id_prod}`)
        let precio_venta = document.getElementById(`pventa${id_prod}`).value;

        let sub_prod = pcompra * cantidad;
        input_sub.value=sub_prod;

        this.calculo_total_pagar()

    }


    calculo_total_pagar(){ // Y total productos
        this.proveedor_productos_total.total_compra = 0;
        this.proveedor_productos_total.total_productos = 0;
        // recorrer todos los subtotales, con el array global de ids
        console.log("array",this.id_productos_seleccionados)
        let valores=0;
        let total_compra= 0;

        let total_productos=0;
        let productos=0;

        this.id_productos_seleccionados.forEach(element => {
            // sumarlos
            let val= document.getElementById(`sub${element}`).value;

            valores = isNaN(val)? 0 : val;
            total_compra = parseInt(total_compra) + parseInt(valores);

            // Productos
            let prod= document.getElementById(`cant${element}`).value;
            productos = isNaN(prod)? 0 : prod;
            total_productos = parseInt(total_productos) + parseInt(productos);
        })

        // agregar monto al total
        this.proveedor_productos_total.total_compra = total_compra;
        // renderizar el total
        let final_pago = document.getElementById('id_total');
        final_pago.value = this.proveedor_productos_total.total_compra;

        // cantidad de productos seleccionados
        this.proveedor_productos_total.total_productos = total_productos;
        // renderizar el total
        let final_productos = document.getElementById('id_total_prod');
        final_productos.value = this.proveedor_productos_total.total_productos;


    }
}


