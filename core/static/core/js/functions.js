function message_error(obj){
     let html = '';

    if(typeof(obj) === 'object'){
        $.each(obj, function(key, value){
            html += `${key}: ${value}<br/>`;
        });
    }else{
        html = `${obj}`;
    }

    Swal.fire({
         title: 'Error!',
         html: html,
         icon: 'error'
    });
}

