/**
 *点击产品申购校验缓存中是否有用户，没有用户提示让其登录
 */
function purchaseSubmit() {
	var name = $ctx.getApp("username");
	if (!name) {
		window.location = "login.html";
	} else {
		$js.showLoadingBar();
		//判断是否做过身份认证
		var datajson = '{"username":"' + name + '"}';
		var url = url_mgr + "api/idInfo";
		$service.call("UMService.post", {
			"url" : url,
			"data" : JSON.parse(datajson),
			"callback" : "loadIdInfoCallback()"
		}, true);
	}
}

function loadIdInfoBack() {
	var data = JSON.parse($ctx.getApp("data"));
	if ("Y" == data.isverify) {
		setfilestatus();
	} else {
		window.location = "idbind.html";
	}
}

function setfilestatus() {
	$ctx.setApp({
		"product" : "1001ZZ10000000005WZB"
	})
	var productid = $ctx.getApp("product");
	var datajson = '{"proid":"' + productid + '"}';
	var url = url_mgr + "api/querystatus";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "filestatusCallback()"
	}, true);

}

function callTel(){
	var tel = $("#telphone").val();
	$tel.call(tel);
}

