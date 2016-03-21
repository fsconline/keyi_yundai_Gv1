/**
 *注册
 */
function regSubmit() {

	var tel = $("#tel").val().trim();

	if (tel) {
		if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))) {
			showWarnMsg("手机号不合法");
			return false;
		}
	} else {
		$("#tel").val("");
		return false;
	}

	var code = $("#code").val().trim();

	if (code) {
		//校验验证码

	} else {
		$("#code").val("");
		//showWarnMsg("验证码不能为空");
		return false;
	}

	var pwd = $("#pwd").val().trim();

	if (pwd) {
		//密码规范

	} else {
		$("#pwd").val("");
		//showWarnMsg("密码不能为空");
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
		//showWarnMsg("确认密码不能为空");
		return false;
	}

	var obj = document.getElementsByName('fruit');
	if (!obj[0].checked) {
		showWarnMsg("请阅读用户协议并接受！");
		return false;
	}

	$ctx.setApp({
		"tel" : tel,
		"pwd" : pwd
	})
	
	verifyTelCode($("#code").val(),"register");

}
