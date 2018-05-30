(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
///////////////////CREAR///////////////////////////////////

var table = $('#myTable').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	scrollX: true,
	paging: false,
	language: {
		zeroRecords: "No se encontraron coincidencias",
		search: "Buscar:",
		infoFiltered: "(filtrado de _MAX_ competidores)",
		infoEmpty: "Mostrando 0 competidores",
		info: "Mostrando _TOTAL_ competidores",
	}
});

function countRow() {
	var counts = table.rows('.selected').data().length + ' Competidores Seleccionados';
	inputsCompetidores();
	buttonSave(table.rows('.selected').data().length);
	return counts;
}

function buttonSave(counts){
	if(counts<2){
		$(".btn-save").prop('disabled', true);
	}else{
		$(".btn-save").prop('disabled', false);
	}	
}

function inputsCompetidores(){
	$('#inputs').html('');
	arrayid = [];
	arraynum = [];
	$('.selected').children('.idCompetidor').each(function(i,element){
		arrayid.push($(element).text());
	});

	$('.selected td').children('.numCompetidor').each(function(i,element){
		arraynum.push($(element).val());
	});

	

	$.each(arrayid, function(i, item) {
		$('#inputs').append('<input type="hidden" name="id_atleta" value='+arrayid[i]+'>')
		$('#inputs').append('<input type="hidden" name="num_atleta" value='+arraynum[i]+'>')
		
	});

}

$('#myTable_wrapper .row:eq(0) .col-md-6:eq(0)').html('<a id="select-all" class="btn btn-info">Seleccionar Todos</a><a id="deselect-all" class="btn btn-info">Deseleccionar Todos</a>');

$('#myTable_wrapper .row:eq(2) .col-md-7').html('<div class="selected-count"></div>');

$('.selected-count').text(countRow());

$('#myTable tbody').on('click', 'tr', function () {
	$(this).toggleClass('selected');
	$(this).children('#idCompetidor').attr("value", "<%= datosCompetidores[i]['id'] %>");
	$('.selected-count').text(countRow());
});

$("#select-all").click(function () {
	$("#myTable tbody tr").addClass('selected');
	$('.selected-count').text(countRow());
});

$("#deselect-all").click(function () {
	$("#myTable tbody tr").removeClass('selected');
	$('.selected-count').text(countRow());
});

////////////////////////MODIFICAR-COMETENCIA

var tableCompe = $('#myTableCompe').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	scrollX: true,
	paging: false,
	searching: true,
	info: false,
	language: {
		zeroRecords: "No se encontraron coincidencias",
		search: "Buscar:",
		infoFiltered: "(filtrado de _MAX_ resultados)",
		infoEmpty: "Mostrando 0 resultados",
		info: "Mostrando _TOTAL_ resultados",
	}
});


},{}],2:[function(require,module,exports){
//////////GestionarTable

var tableGestion = $('#myTableGestion').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	scrollX: true,
	paging: false,
	searching: true,
	info: false,
	language: {
		zeroRecords: "No se encontraron coincidencias",
		search: "Buscar:",
		infoFiltered: "(filtrado de _MAX_ resultados)",
		infoEmpty: "Mostrando 0 resultados",
		info: "Mostrando _TOTAL_ resultados",
	}
});

//hitorial

var tableHistorial1 = $('#myTableHistoria').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	scrollX: true,
	paging: false,
	info: false,
	"order": [[ 0, "desc" ]],
	language: {
		zeroRecords: "No se encontraron coincidencias",
		search: "Buscar:",
		infoFiltered: "(filtrado de _MAX_ competidores)",
		infoEmpty: "Mostrando 0 competidores",
		info: "Mostrando _TOTAL_ competidores",
	}
});

var tableHistorial = $('#myTableHistoriaDetalle').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	scrollX: true,
	paging: false,
	info: false,
	"order": [[ 2, "asc" ]],
	language: {
		zeroRecords: "No se encontraron coincidencias",
		search: "Buscar:",
		infoFiltered: "(filtrado de _MAX_ resultados)",
		infoEmpty: "Mostrando 0 resultados",
		info: "Mostrando _TOTAL_ resultados",
	}
});



//////////////////////////////Atleta

var table = $('#myTable1').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	paging: false,
	

	"language": 
	{
		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {

			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		},
	},


});

var idCompe;
$('#myTable1 tbody').on('click', 'tr', function () {

     $(this).toggleClass('selected');
     idCompe= $('.selected').children('.idAtleta').text();
     
});

$('#btn-mod').click(function(){
	$('#modificarAtle').attr("action", "/gestionar/atleta/modificar/"+idCompe);
	$("#myTable1 tbody tr").removeClass('selected');
});
$('#btn-can').click(function(){
	$("#myTable1 tbody tr").removeClass('selected');
});
$('#btn-can1').click(function(){
	$("#myTable1 tbody tr").removeClass('selected');
});

$('#editarS').click(function(){
 
	$('#modificarAtle1').attr("action", "/gestionar/atleta/modificar/"+idCompe);
});


},{}],3:[function(require,module,exports){

$(document).ready(function() {
    $('#loginModal').modal('show');
   
});
},{}],4:[function(require,module,exports){


//----------COMEPTENCIA_ATLETA-------------//

//POST ADD COMEPTENCIA _ ATLETA//
function inputsCompetidores(){
    $('#inputs').html('');
    arrayid = [];
    arraynum = [];
    $('.selected').children('.idCompetidor').each(function(i,element){
        arrayid.push($(element).text());
    });

    $('.selected td').children('.numCompetidor').each(function(i,element){
        arraynum.push($(element).val());
    });



    $.each(arrayid, function(i, item) {
        $('#inputs').append('<input type="hidden" name="id_atleta" value='+arrayid[i]+'>')
        $('#inputs').append('<input type="hidden" name="num_atleta" value='+arraynum[i]+'>')

    });

    var hash = {};
    array = arraynum.filter(function(current) {
        var exists = !hash[current] || false;
        hash[current] = true;
        return exists;
    });

    if(arraynum.length==array.length){
        return 1;
    }else{
        return 0;
    }
}

// Attach a submit handler to the form
$("#crearCompe").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('crearCompe Click');

    var numEquals=inputsCompetidores();

    if(numEquals==0){
        alert("Los atletas no pueden tener números iguales")
    }else{

        // Get some values from elements on the page:
        var i,flag=0;
        var $form = $(this),
            datos = {}
        datos.nombre = $form.find("input[name='nombre']").val(),
            datos.fecha = $form.find("input[name='fecha']").val(),
            datos.hora = $form.find("input[name='hora']").val(),
            datos.lugar = $form.find("input[name='lugar']").val(),
            datos.id_atleta = [],
            datos.num_atleta = [],
            urlpost = $form.attr("action");

        $form.find("input[name='id_atleta']").each(function (i, element) {
            datos['id_atleta'][i] = $(element).val();
        });

        $form.find("input[name='num_atleta']").each(function (i, element) {
            datos['num_atleta'][i] = $(element).val();
            if($(element).val()==''){
                flag=1;
            }
        });

        if(flag==1){
            alert("Todos los atletas seleccionados deben tener un número asociado");
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify(datos),
                contentType: 'application/json',
                url: urlpost,
                success: function (msg) {
                    if (msg.mensaje == 'acept') {
                         swal({ 
                            title: "Buen trabajo!", 
                            text: "Competencia " + datos.nombre + " Creada", 
                            type: "success" 
                        }).then(function() { window.location = "/competencia/iniciar"; });
                    } else {
                        alert("Error Conectarse con la Base de Datos");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr.responseJSON.mensaje)
                }

            });
        }
    }
});

//POST EDIT COMEPTENCIA_ATLETA//

// Attach a submit handler to the form
$("#editCompe").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('editCompe Click');

    var numEquals=inputsCompetidores();

    if(numEquals==0){
        alert("Los atletas no pueden tener números iguales")
    }else{
        // Get some values from elements on the page:
        var i,flag=0;
        var $form = $(this),
            datos = {}
        datos.id = $form.find("input[name='id']").val(),
            datos.nombre = $form.find("input[name='nombre']").val(),
            datos.fecha = $form.find("input[name='fecha']").val(),
            datos.hora = $form.find("input[name='hora']").val(),
            datos.lugar = $form.find("input[name='lugar']").val(),
            datos.id_atleta = [],
            datos.num_atleta = [],
            urlpost = $form.attr("action");

        $form.find("input[name='id_atleta']").each(function (i, element) {
            datos['id_atleta'][i] = $(element).val();
        });


        $form.find("input[name='num_atleta']").each(function (i, element) {
            datos['num_atleta'][i] = $(element).val();
            if($(element).val()==''){
                flag=1;
            }
        });

        if(flag==1){
            alert("Todos los atletas seleccionados deben tener un número asociado");
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify(datos),
                contentType: 'application/json',
                url: urlpost,
                success: function (msg) {
                    if (msg.mensaje == 'acept') {
                         swal({ 
                            title: "Buen trabajo!", 
                            text: "Competencia " + datos.nombre + " Modificada", 
                            type: "success" 
                        }).then(function() { window.location = "/competencia/modificar"; });
                    } else {
                        alert("Error Conectarse con la Base de Datos");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr.responseJSON.mensaje)
                }


            });
        }
    }
});


//----------CLUB-------------//

//POST ADD CLUB//

// Attach a submit handler to the form
$("#crearClub").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('crearClub Click');

    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
    datos.nombre = $form.find("input[name='nombre']").val(),
        datos.descripcion = $form.find("input[name='descripcion']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (msg) {
            if (msg.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Club " + datos.nombre + " Creado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/club"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }

    });

});

//POST EDIT CLUB//
//MODAL CLUB//

$(".modiClub").submit(function (event) {

    console.log("editClub Click Modal")
    event.preventDefault();

    var $form = $(this),
        datos = {}
    datos.club_id = $form.find("input[name='club_id']").val(),

        urlpost = $form.attr("action");


    $('#editClub').attr("action", "/gestionar/club/modificar/"+datos.club_id);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.code==200) {
                $('#editNombreClub').attr("value", data.data.nombre);
                $('#editDescripcionClub').attr("value", data.data.descripcion);
            }else{
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }
    });

});


//EDIT CLUB//

// Attach a submit handler to the form
$("#editClub").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('editClub Click');

    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
    datos.nombre = $form.find("input[name='nombre']").val(),
        datos.descripcion = $form.find("input[name='descripcion']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (msg) {
            if (msg.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Club " + datos.nombre + " Modificado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/club"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }

    });

});

//POST DELETE CLUB//

$(".deleteClub").submit(function (event) {

    event.preventDefault();
    console.log('deleteClub Click');


    var $form = $(this),
        urlpost = $form.attr("action");

    console.log(urlpost);
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Club Eliminado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/club"; });
                
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }
    });

});


//----------CATEGORIA-------------//

//POST ADD CATEGORIA//

// Attach a submit handler to the form
$("#crearCat").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('crearCat Click');

    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
    datos.nombre = $form.find("input[name='nombre']").val(),
        datos.descripcion = $form.find("input[name='descripcion']").val(),
        datos.edad_min = $form.find("input[name='edad_min']").val(),
        datos.edad_max = $form.find("input[name='edad_max']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (msg) {
            if (msg.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Categoria " + datos.nombre + " Creada", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/categoria"; });
               
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }

    });

});


//POST EDIT CATEGORIA//
//MODAL CATEGORIA//

$(".modiCat").submit(function (event) {

    console.log("editCat Click Modal")
    event.preventDefault();

    var $form = $(this),
        datos = {}
    datos.cat_nombre = $form.find("input[name='categoria_nombre']").val(),

        urlpost = $form.attr("action");

    $('#editCat').attr("action", "/gestionar/categoria/modificar/"+datos.cat_nombre);

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            console.log(data);
            if (data.code==200) {
                $('#editNombreCat').attr("value", data.data.nombre);
                $('#editDescripcionCat').attr("value", data.data.descripcion);
                $('#editEdadMinCat').attr("value", data.data.edad_min);
                $('#editEdadMaxCat').attr("value", data.data.edad_max);
            }else{
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }
    });

});


//EDIT CATEGORIA//

// Attach a submit handler to the form
$("#editCat").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    console.log('editCat Click');

    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
    datos.nombre = $form.find("input[name='nombre']").val(),
        datos.descripcion = $form.find("input[name='descripcion']").val(),
        datos.edad_min = $form.find("input[name='edad_min']").val(),
        datos.edad_max = $form.find("input[name='edad_max']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (msg) {
            if (msg.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Categoria " + datos.nombre + " Modificado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/categoria"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }

    });

});

//POST CATECLUB//

$(".deleteCat").submit(function (event) {

    event.preventDefault();
    console.log('deleteCat Click');


    var $form = $(this),
        urlpost = $form.attr("action");

    console.log(urlpost);
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.mensaje == 'acept') {
                swal({ 
                    title: "Buen trabajo!", 
                    text: "Categoria Eliminada", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/categoria"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }
    });

});


//----------ATLETA-------------//

//POST ADD ATLETA//

// Attach a submit handler to the form
$("#crearAtleta").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
    datos.primer_nombre = $form.find("input[name='primer_nombre']").val(),
        datos.segundo_nombre = $form.find("input[name='segundo_nombre']").val(),
        datos.primer_apellido = $form.find("input[name='primer_apellido']").val(),
        datos.segundo_apellido = $form.find("input[name='segundo_apellido']").val(),
        datos.cedula = $form.find("input[name='cedula']").val(),
        datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
        datos.id_club = $form.find("select[name='id_club']").val(),
        datos.sexo = $form.find("select[name='sexo']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.mensaje == 'acept') {
                swal({ 
                    title: "Buen trabajo!", 
                    text: "El Atleta " + datos.primer_nombre + " Creado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/atleta"; });     
              
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }

    });

});

//POST editAtle ATLETA//

$("#modificarAtle").submit(function (event) {

    event.preventDefault();
    console.log('editAtle Click');

    var $form = $(this),
        datos = {}
    datos.primer_nombre = $form.find("input[name='primer_nombre']").val(),
        datos.segundo_nombre = $form.find("input[name='segundo_nombre']").val(),
        datos.primer_apellido = $form.find("input[name='primer_apellido']").val(),
        datos.segundo_apellido = $form.find("input[name='segundo_apellido']").val(),
        datos.cedula = $form.find("input[name='cedula']").val(),
        datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
        datos.id_club = $form.find("select[name='id_club']").val(),
        datos.sexo = $form.find("select[name='sexo']").val(),
        urlpost = $form.attr("action");


    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Atleta " + datos.primer_nombre + " Modificado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/atleta"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }
    });

});



$(".modiAtle").submit(function (event) {

	event.preventDefault();

	var $form = $(this),
		datos = {}
	    datos.atleta_id = $form.find("input[name='atleta_id']").val(),
		urlpost = $form.attr("action");

	$.ajax({
		type: 'POST',
		data: JSON.stringify(datos),
		contentType: 'application/json',
		url: urlpost,
		success: function (data) {
			if (data.code==200) {
				$('#Pnombre').attr("value", data.data.primer_nombre);
				$('#Snombre').attr("value", data.data.segundo_nombre);
				$('#Papellido').attr("value", data.data.primer_apellido);
				$('#Sapellido').attr("value", data.data.segundo_apellido);
				$('#Cedu').attr("value", data.data.cedula);
				$('#fecha1').attr("value", data.data.fecha);
				var selectRol = $("select#inputCategoria1");
				var selectRol1 = $("select#inputClub1");
				selectRol.val(data.data.sexo).attr('selected', 'selected');
				selectRol1.val(data.data.id).attr('selected', 'selected');
			}else{
			     alert("Error Conectarse con la Base de Datos");
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			alert(xhr.responseJSON.mensaje)
		}
	});

});

//eliminar atleta

$(".eliminarAtle").submit(function (event) {

    event.preventDefault();
    var $form = $(this),
        datos = {}
    datos.atleta_cedula = $form.find("input[name='atleta_cedula']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.mensaje == 'acept') {

                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Atleta Eliminado", 
                    type: "success" 
                }).then(function() { window.location = "/gestionar/atleta"; }); 
                
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }
    });

});




//----------USUARIOS-------------//

//POST ADD USUARIOS//

// Attach a submit handler to the form
$("#crearUsuario").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
        datos.nombre = $form.find("input[name='nombre']").val(),
        datos.apellido = $form.find("input[name='apellido']").val(),
        datos.email = $form.find("input[name='Email']").val(),
        datos.sexo = $form.find("select[name='sexo']").val(),
        datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
        datos.usuario = $form.find("input[name='Usuario']").val(),
        datos.clave= $form.find("input[name='password']").val(),
        datos.confirmPassword= $form.find("input[name='confirmPassword']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.mensaje == 'acept') {
                swal({ 
                    title: "Buen trabajo!", 
                    text: "El Usuario " + datos.nombre + " Creado", 
                    type: "success" 
                }).then(function() { window.location = "/Usuarios"; });     
              
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }

    });

});

//POST MODIFICAR USUSARIO//

$("#modificarUser").submit(function (event) {

    event.preventDefault();
    console.log('editAtle Click');

    var $form = $(this),
        datos = {}
        datos.nombre = $form.find("input[name='nombre']").val(),
        datos.apellido = $form.find("input[name='apellido']").val(),
        datos.email = $form.find("input[name='Email']").val(),
        datos.sexo = $form.find("select[name='sexo']").val(),
        datos.fecha_nacimiento = $form.find("input[name='fecha_nacimiento']").val(),
        datos.usuario = $form.find("input[name='Usuario']").val(),
        datos.clave= $form.find("input[name='password']").val(),
        urlpost = $form.attr("action");


    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.mensaje == 'acept') {
                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Usuario " + datos.nombre + " Modificado", 
                    type: "success" 
                }).then(function() { window.location = "/Usuarios"; });
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }
    });

});

// MOSTAR DATOS DE USUARIO A MODIFICAR

$(".modiUser").submit(function (event) {

    event.preventDefault();

    var $form = $(this),
        datos = {}
        datos.usuario_id = $form.find("input[name='usuario_id']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.code==200) {
                $('#Nombre').attr("value", data.data.nombre);
                $('#Apellido').attr("value", data.data.apellido);
                $('#Email').attr("value", data.data.email);
                var selectsexo = $("select#inputSexo");
                selectsexo.val(data.data.sexo).attr('selected', 'selected');
                $('#Fecha').attr("value", data.data.fecha_nacimiento);
                $('#User').attr("value", data.data.nombre_usuario);
                $('#Contra').attr("value", data.data.clave);
            }else{
                 alert("Error Conectarse con la Base de Datos");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr.responseJSON.mensaje)
        }
    });

});

//eliminar USUARIO

$(".eliminarUser").submit(function (event) {

    event.preventDefault();
    var $form = $(this),
        datos = {}
        datos.usuario_id = $form.find("input[name='usuario_id']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
            if (data.mensaje == 'acept') {

                 swal({ 
                    title: "Buen trabajo!", 
                    text: "Usuario Eliminado", 
                    type: "success" 
                }).then(function() { window.location = "/Usuarios"; }); 
                
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }
    });

});



//--------LOGIN-------------//

//POST LOGIN//

// Attach a submit handler to the form
$("#Login").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();
    // Get some values from elements on the page:
    var $form = $(this),
        datos = {}
        datos.nombre_usuario = $form.find("input[name='nombre_usuario']").val(),
        datos.clave = $form.find("input[name='clave']").val(),
        urlpost = $form.attr("action");

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        url: urlpost,
        success: function (data) {
        console.log(JSON.stringify(data));
            if (data.code == 400) { console.log('no existe')}
            if (data.mensaje == 'acept') {

                if (data.dataUser.permisologia == 1) {
                    
                    $(document).ready(function() {
                     $("#loginModal").modal('toggle');
                    });

                
                }
                else {
                     $(document).ready(function() {
                     $("#loginModal").modal('toggle');
                     $("#User1").hide();
   
                    });
                    
                }

              
            } else {
                alert("Error Conectarse con la Base de Datos");
            }
        }

    });

});


},{}],5:[function(require,module,exports){

var table = $('#myTableUser').DataTable({
	scrollY: "372px",
	scrollCollapse: true,
	paging: false,
	

	"language": 
	{
		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {

			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		},
	},


});

var idUser;
$('#myTableUser tbody').on('click', 'tr', function () {

     $(this).toggleClass('selected');
     idUser= $('.selected').children('.idUsuario').text();
     
});

$('#btn-modU').click(function(){
	$('#modificarUser').attr("action", "/Usuarios/modificar/"+idUser);
	$("#myTableUser tbody tr").removeClass('selected');
});
$('#btn-canU').click(function(){
	$("#myTableUser tbody tr").removeClass('selected');
});
$('#btn-canU1').click(function(){
	$("#myTableUser tbody tr").removeClass('selected');
});


},{}]},{},[1,2,4,3,5]);
