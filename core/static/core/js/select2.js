$(function(){
     $('.select2').select2();

     $('.select2bs4').select2({
        theme: 'bootstrap4',
        sorter: function(data) {
        return data.sort(function(a, b) {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
      }
     });
})