var ContactoCliente = function() {
  var main = this;
  var contactoUri = "http://localhost:3000/api/contacto";
  main.contactos = ko.observableArray([]);
  main.contactoNuevo = {
        
        nombre: ko.observable(), 
        apellido: ko.observable(),
        direccion: ko.observable(),
        telefono: ko.observable(),
        correo: ko.observable(),
        idCategoria: ko.observable()
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

main.agregar = function () {
        var contacto = {
            nombre: main.contactoNuevo.nombre(),
            apellido: main.contactoNuevo.apellido(),
            
            direccion: main.contactoNuevo.direccion(),
            telefono: main.contactoNuevo.telefono(),
            correo: main.contactoNuevo.correo(),
            idCategoria: main.contactoNuevo.idCategoria()

        }
        ajaxHelper(contactoUri, 'POST', contacto).done(function (data) {
            main.getAllContactos();
            $("#modalAgregarContacto").modal('hide');
        });
    }


main.getAllContactos = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data) {
      main.contactos(data);
    });
  }

main.eliminar = function(item){
    var ContactoId = item.idContacto;
    console.log(JSON.stringify(item));
    ajaxHelper(contactoUri +"/"+ ContactoId, 'DELETE').done(function(data){
      main.getAllContactos();
    })
  }

  main.getAllContactos();
}

$(document).ready(function() {
  var contacto = new ContactoCliente();
  ko.applyBindings(contacto);
});
