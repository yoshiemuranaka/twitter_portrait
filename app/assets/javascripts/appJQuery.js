window.onload = function() {

	$('button#updateUserInfo').on('click', function(){

		var fname = $("input[name='fname']").val()
		var lname = $("input[name='lname']").val()
		var handle = $("input[name='handle']").val()

		$.post('/users', body: {fname: fname, lname: lname, handle: handle})

	})

}