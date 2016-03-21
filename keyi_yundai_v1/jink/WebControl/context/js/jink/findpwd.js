/**
 *验证信息
 */
function validInfo() {
	var tel = $("#tel").val().trim();
	$ctx.setApp({
		"tel" : tel
	})
	verifyTelCode($("#code").val(), "chgpwd");
}

function telChangePwd(tel) {
	telflag = false;
	if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))) {
		showWarnMsg("手机号不合法");
	} else {
		var url = url_mgr + "api/verifyTel";

		var datajson = '{"tel":"' + $("#tel").val() + '"}';

		$service.call("UMService.post", {
			"url" : url,
			"data" : JSON.parse(datajson),
			"callback" : "telChangePwdCallback()"
		}, true);

	}
}

function telChangePwdBack() {
	var data = $ctx.get("data");
	if (data == "true") {
		//telflag = true;
		//$("#sendcode").removeAttr("disabled");
		//$("#sendcode").removeClass();
		//$("#sendcode").addClass("smsbut");
		alert("手机号不存在，请重新输入");
		$("#tel").val("");
		return false;
	}
}

function verifyTelCodePwdBack() {
	//修改密码div显示
	///document.getElementById('findpwd1').style.display = "none";
	//var findpwd1 = document.getElementById('findpwd1').style.display;
	//alert(findpwd1);
	//document.getElementById('findpwd2').style.display = "";
	//var findpwd2 = document.getElementById('findpwd2').style.display = "";
	//alert(findpwd2);
	$js.hideLoadingBar();
	$('.findpwd2').click();
}

function complete() {

	var pwd = $("#pwd").val().trim();

	if (!pwd) {
		$("#pwd").val("");
		return false;
	}
	var compwd = $("#compwd").val().trim();

	if (compwd) {
		//两次密码必须一致
		if (pwd != compwd) {
			showWarnMsg("两次输入密码不一致");
			return false;
		}
	} else {
		$("#compwd").val("");
		return false;
	}
	var url = url_mgr + "api/changepwd";
	var cust = {};
	cust.tel = $ctx.getApp("tel");
	cust.password = pwd;
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(JSON.stringify(cust)),
		"callback" : "changePwdCallback()"
	}, true);
}

