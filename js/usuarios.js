
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

