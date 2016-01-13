(function() {
	$("tr.open").click(function() {
        window.location.href = $(this).attr("id");
	});
}());