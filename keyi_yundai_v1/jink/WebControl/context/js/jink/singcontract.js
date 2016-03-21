$(function() {
	setTimeout(loadContract, 500);
})
function loadContract() {
	var datajson;

	var applyId = $ctx.getApp("apply_id");
	datajson = '{"applyId":"' + applyId + '"}';
	$js.showLoadingBar();
	var url = url_mgr + "api/qryConInfo";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "addcontCallback()"
	}, true);
}

function signContLoginBack() {
	//cfca字符串获取
	$js.showLoadingBar();
	$service.call("CFCAService.generateP10", {
		callback : "generateP10Callback()"
	}, false)
}

function addcontBack() {
	var data = $ctx.getApp("data");
	data = JSON.parse(data);
	$("#contid").val(data.id);
	$("#coninfo").html(data.continfo);
	$ctx.put("show_data", data.show_data);
}

//弹出模态框
function showModal() {
	$("#myModal").modal('show');
}

/**
 * 1,重新登录
 * 2,获取p10
 * 3,获取证书
 * 4,导入证书
 * 5,签名数据
 * 6,上传签名数据
 */
function signContract() {
	//cfca 认证等一系列的的操作
	$('#myModal').modal('hide');
	//获取模态框密码值
	var username = $ctx.getApp("username");
	var password = $("#password").val().trim();
	if (password) {
		password = password + "_encrypted";
	} else {
		$("#password").val("");
		alert("密码不能为空");
		return;
	}
	$js.showLoadingBar();

	//重新登录
	var datajson = '{"username":"' + username + '","password":"' + password + '"}';
	$ctx.put("pwd", password);
	var loginfo = JSON.parse(datajson);
	var url = url_mgr + "api/login";
	$service.call("UMService.post", {
		"url" : url,
		"data" : loginfo,
		"callback" : "signContLoginCallback()"
	}, true);

	//cfca===========end

	//var contId = $("#contid").val();
	//var datajson = '{"contId":"' + contId + '"}';
	//alert("datajson" + datajson);

	//var url = url_mgr + "api/signContract";

	//$service.call("UMService.post", {
	//	"url" : url,
	//	"data" : JSON.parse(datajson),
	//	"callback" : "signcontCallback()"
	//}, true);
}

function generateP10Back() {
	var p10Data = $ctx.get("p10Data");

	var username = $ctx.getApp("username");
	var verifyid = $("#contid").val();

	var jsondata = '{"applyCode":"' + encodeURIComponent(p10Data) + '","username":"' + username + '","verifyid":"' + verifyid + '"}';

	var url = url_mgr + "RAPublicKey";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(jsondata),
		"callback" : "RAPublicKeyCallback()"
	}, true);
}
