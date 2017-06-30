var CategoriaCliente = function() {
  var main = this;
  var categoriaUri = "http://localhost:3000/api/categoria";
  main.categorias = ko.observableArray([]);
  main.categoriaNuevo = {
        nombreCategoria: ko.observable()
    }

  function ajaxHelper(uri, method, data) {
    return $.ajax({
      url : uri,
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    })
  }

    main.agregar = function(){
    var categoria = {
      nombreCategoria : main.categoriaNuevo.nombreCategoria()
    }
    ajaxHelper(categoriaUri, 'POST', categoria).done(function(data){
      main.getAllCategorias();
      $("#modalAgregarCategoria").modal('hide');
    })
  }

  main.getAllCategorias = function() {
    ajaxHelper(categoriaUri, 'GET').done(function(data) {
      main.categorias(data);
    });
  }

  main.getAllCategorias();
}

$(document).ready(function() {
  var categoria = new CategoriaCliente();
  ko.applyBindings(categoria);
});
