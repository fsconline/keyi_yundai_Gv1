/**
 * 登录
 */
function loginSubmit() {
	//手机号
	var username = $("#username").val().trim();
	if (!username) {
		$("#username").val("");
		return;
	}
	//密码
	var plainPassword = $("#password").val().trim();
	if (!plainPassword) {
		$("#password").val("");
		return;
	}

	var datajson;

	if (plainPassword.indexOf("_encrypted") < 0) {
		plainPassword = plainPassword + "_encrypted";
		$("#password").val(plainPassword);
	}
	datajson = '{"username":"' + username + '","password":"' + plainPassword + '"}';
	var loginfo = JSON.parse(datajson);

	$ctx.put("username", username);
	var url = url_mgr + "api/login";

	$js.showLoadingBar();

	$service.call("UMService.post", {
		"url" : url,
		"data" : loginfo,
		"callback" : "loginCallback()"
	}, true);
}

function register() {
	window.location = "register.html";
}
