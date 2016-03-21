function bindCard() {
	
	var idcard = $("#idcard").val().trim();

	if (!idcard) {
		$("#idcard").val("");
		$alert("身份证号不能为空");
		return;
	}

	var name = $("#name").val().trim();
	if (!name) {
		$("#name").val("");
		$alert("真实姓名不能为空");
		return;
	}

	$js.showLoadingBar();
	var username = $ctx.getApp("username");

	var datajson = '{"username":"' + username + '","idcard":"' + idcard + '","name":"' + name + '"}';

	var url = url_mgr + "api/idBind";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "bindCardCallback()"
	}, true);
}
