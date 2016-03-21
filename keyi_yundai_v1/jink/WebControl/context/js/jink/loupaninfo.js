window.onload = function() {
	setTimeout(loaddata, 500);
}
function loaddata() {
	var loupanid = $ctx.getApp("loupanid");
	$js.showLoadingBar();
	var datajson = '{"loupanid":"' + loupanid + '"}';
	var url = url_mgr + "api/loadproinfo";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "getQueryProInfo()"
	}, true);
}

function backqueryproInfo() {
	var proinfodata = $ctx.get("proinfodata");
	var data = JSON.parse(proinfodata);
	if (data != null) {
		var list = new Array();
		id = data.id;
		name = data.projectname;
		developerid = data.developerid;
		developername = data.developername;
		if (data.rollpage1) {
			var img = {};
			img.content = url_mgr + "file_down?filePath=" + data.rollpage1;
			list[0] = img;
		}
		if (data.rollpage2) {
			var img = {};
			img.content = url_mgr + "file_down?filePath=" + data.rollpage2;
			list[1] = img;
		}
		if (data.rollpage3) {
			var img = {};
			img.content = url_mgr + "file_down?filePath=" + data.rollpage3;
			list[2] = img;
		}
		if (data.rollpage4) {
			var img = {};
			img.content = url_mgr + "file_down?filePath=" + data.rollpage4;
			list[3] = img;
		}
		var islider = new iSlider({
			type : 'pic',
			data : list,
			dom : document.getElementById("iSlider-wrapper"),
			isLooping : true,
			animateType : 'default',
			isAutoplay : true,
			animateTime : 800
		});
		islider.addDot();

		var a = document.getElementById("junjia");
		a.innerHTML = "均价" + data.amount + "/m²";

		var a = document.getElementById("fanwei");
		a.innerHTML = data.houserange;
		$("#filepath").html(data.filepath);
		$js.hideLoadingBar();
	}

}

var id;
var name;
var developerid;
var developername;
function sfdapply() {
	$ctx.setApp({
		"daikloupan" : "1"
	})
	var custinfo = "houses:" + id + ",";
	custinfo += "housename:" + name + ",";
	if (developerid != null) {
		custinfo += "developid:" + developerid + ",";
		custinfo += "developname:" + developername + ",";
	}
	$ctx.setApp({
		"custinfo" : custinfo.substr(0, custinfo.length - 1)
	});
	$ctx.setApp({
		"product" : "1001ZZ10000000005WZB"
	});
	var username = $ctx.getApp("username");
	if (!username) {
		window.location = "login.html";
		return;
	}
	idInfo();
}

function idInfo() {
	$js.showLoadingBar();
	//判断是否做过身份认证
	var username = $ctx.getApp("username");
	var datajson = '{"username":"' + username + '"}';
	var url = url_mgr + "api/idInfo";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "loadIdInfoCallback2()"
	}, true);
}

function loadIdInfoBack2() {
	var data = JSON.parse($ctx.getApp("data"));
	if ("Y" == data.isverify) {
		setfilestatus();
	} else {
		window.location = "idbind.html";
	}
}

function setfilestatus() {
	var productid = $ctx.getApp("product");
	var datajson = '{"proid":"' + productid + '"}';
	var url = url_mgr + "api/querystatus";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "filestatusCallback2()"
	}, true);

}
