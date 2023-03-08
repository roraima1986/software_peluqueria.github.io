globalThis.detalle = new class modulo_detalle_compra{
    constructor(){
        console.log('Detalle de la compra')
    }

    detalle_de_compra(id){
        $.ajax({
            url: '/product/detail_buy',
            type: 'GET',
            data: {'id_detalle': id},
            
            
        }).done(function(data){
            if (data.error){
                Swal.fire({
                    text:'Agunos datos no se cargaron correctamente',
                    icon:'error',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }else{
                let tabla= document.getElementById('this_detail')
                data.forEach(element => {
                tabla.innerHTML += ` 
                    <tr>
                        <!--<td>${element.product_id}</td> -->
                        <td><b>${element.product_name}</b></td>
                        <td>${element.cant}</td>
                        <td>$ ${element.price_purchase}</td>
                        <td>$ ${element.price_sale}</td>
                        <td>$ ${element.subtotal_prod}</td>
                    </tr>
                    `
                });
                
            }
        }).fail(function(data){
            Swal.fire({
                text:'Agunos datos no se cargaron correctamente',
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