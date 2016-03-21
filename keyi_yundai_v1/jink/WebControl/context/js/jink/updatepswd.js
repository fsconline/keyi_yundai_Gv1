/**
 * 修改密码
 */
function updatePswdSubmit() {
	//原密码
	var oldpassword = $("#oldpassword").val().trim();
	if (!oldpassword) {
		$("#oldpassword").val("");
		return;
	}
	//新密码
	var newpassword1 = $("#newpassword1").val().trim();
	if (!newpassword1) {
		$("#newpassword1").val("");
		return;
	}

	//确认密码
	var newpassword2 = $("#newpassword2").val().trim();
	if (!newpassword2) {
		$("#newpassword2").val("");
		return;
	}
	var datajson;
	//对密码进行加密处理
	if (oldpassword.indexOf("_encrypted") < 0) {
		var username = $ctx.getApp("username");
		//var key = RSAUtils.getKeyPair(exponent, '', modulus);
		//var encryptedPwd = RSAUtils.encryptedString(key, plainPassword);
		$("#oldpassword").val(oldpassword + "_encrypted");
		$("#newpassword1").val(newpassword1 + "_encrypted");
		$("#newpassword2").val(newpassword2 + "_encrypted");
		datajson = '{"username":"' + username + '","oldpassword":"' + oldpassword + '_encrypted","newpassword1":"' + newpassword1 + '_encrypted","newpassword2":"' + newpassword2 + '_encrypted"}';
	}
	var url = url_mgr + "api/updatepswd";
	//处理发送请求

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "updpwdCallback()"
	}, true);
}