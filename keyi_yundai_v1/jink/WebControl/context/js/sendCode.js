var second = 60;
var timeID = "";
var telflag = false;
var flag = false;
var codeflag = false;
function telChange(tel) {
	telflag = false;
	if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))) {
		showWarnMsg("手机号不合法");
	}
	/**else {
	 var url = url_mgr + "api/verifyTel";

	 var datajson = '{"tel":"' + $("#tel").val() + '"}';

	 $service.call("UMService.post", {
	 "url" : url,
	 "data" : JSON.parse(datajson),
	 "callback" : "telChangeCallback()"
	 }, true);

	 }*/
}

function telChangeBack() {
	var data = $ctx.get("data");
	if (data == "true") {
		telflag = true;
		$("#sendcode").removeAttr("disabled");
		$("#sendcode").removeClass();
		$("#sendcode").addClass("smsbut");
	} else {
		alert("手机号已经被注册");
		$("#tel").val("");
	}
}

/**
 * 发送验证码
 */
function sendTelCode() {
	var send_url = url_mgr + "api/sendTelCode";
	codeflag = false;
	second = 60;
	var datajson = '{"tel":"' + $("#tel").val() + '"}';

	$('#sendcode').attr('disabled', true);
	$("#sendcode").removeClass();
	$("#sendcode").addClass("disable");
	timeID = setInterval("showTime()", 1000);

	$service.call("UMService.post", {
		"url" : send_url,
		"data" : JSON.parse(datajson),
		"callback" : "sendTelCodeCallback()"
	}, true);
}

function sendTelCodeBack() {
	clearInterval(timeID);
	$("#sendcode").removeAttr("disabled");
	$("#sendcode").removeClass();
	$("#sendcode").val("验证码");
	$("#sendcode").addClass("smsbut");
}

function sendTelSuccessBack() {
	codeflag = true;
	$ctx.setApp({
		"codeflag" : true
	});

}

function showTime() {
	$("#sendcode").val(second + "秒");
	second--;
	if (second == 0) {
		$("#sendcode").val("验证码");
		$("#sendcode").removeAttr("disabled");
		$("#sendcode").removeClass();
		$("#sendcode").addClass("smsbut");
		clearInterval(timeID);
	}
}

/**
 * 手机验证码校验
 */
function verifyTelCode(code, type) {
	var url = url_mgr + "api/verifyTelCode/" + $("#tel").val() + "/" + type;
	flag = false;
	if (code && code.length == 4) {
		var cahcodeflag = $ctx.getApp("codeflag");
		if (cahcodeflag && cahcodeflag == "true") {
			$js.showLoadingBar();
			var datajson = '{"code":"' + code + '"}';
			$service.call("UMService.post", {
				"url" : url,
				"data" : JSON.parse(datajson),
				"callback" : "verifyTelCodeCallback()"
			}, true);
		} else {
			$js.hideLoadingBar();
			alert("请检查验证码是否发送成功");
		}
	} else {
		$js.hideLoadingBar();
		alert("请输入正确的验证码");
	}
}

function verifyTelCodeBack() {

	//全部校验通过后，调用url注册用户
	var cust = {};
	cust.tel = $ctx.getApp("tel");
	cust.password = $ctx.getApp("pwd");

	var url = url_mgr + "api/addcust";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(JSON.stringify(cust)),
		"callback" : "registerCallback()"
	}, true);
}

