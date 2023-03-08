$(function () {
    // jquery validation
    // Validar Rut
    jQuery.validator.addMethod("rutRules", function(value, element) {
      return this.optional( element ) || /^[0-9]+-[0-9kK]{1}$/.test( value );
    }, 'Rut incorrecto');

    // Validar Correo
    jQuery.validator.addMethod("emailRules", function(value, element) {
      return this.optional( element ) || /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test( value );
    }, 'Por favor, escribe una dirección de correo válida');

    // Validacion de fecha
    $.validator.addMethod("fechaMenorOIgualA", function(value, element, params) {
      return Date.parse(value) <= Date.parse($(params).val());
    }, "La fecha de inicio no puede ser mayor que la fecha de fin.");

    $(".form-validate").validate({
        rules: {
          correo: {
            email: true,
            emailRules: true
          },
          password: {
            required: true
          },
          rut: {
            rutRules: true,
            minlength: 9
          },
          start_date: {
            required: true,
            fechaMenorOIgualA: "#finish_date"
          },
          finish_date: {
            required: true
          },
          product_name: {
            require_from_group: [1, ".group-filter"]
          },
          cbo_category: {
            require_from_group: [1, ".group-filter"]
          },
          cbo_stock: {
            require_from_group: [1, ".group-filter"]
          },
          cbo_status: {
            require_from_group: [1, ".group-filter"]
          }
        },
        messages: {
          username: {
            required: "Por favor, proporcione un usuario",
          },
          password: {
            required: "Por favor, proporcione una contraseña",
          }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        },
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

})













