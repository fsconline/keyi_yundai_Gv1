function cameraOpenr(imgid, type) {

	$ctx.put("imgid", imgid);
	$ctx.setApp({
		"type" : type
	});
	$camera.open({
		bindfield : "imagefilename",
		callback : "cameraCallbackr1()"
	});
}

function cameraOpenb(imgid, type) {

	$ctx.put("imgid", imgid);
	$ctx.setApp({
		"type" : type
	});
	$camera.open({
		bindfield : "imagefilename",
		callback : "cameraCallbackb1()"
	});
}

function cameraBackr1() {

	var img = $ctx.getString("imagefilename");
	var temimgid = $ctx.getString("imgid");
	if (temimgid && img) {
		$cache.write(temimgid + "img", img);
		$("#" + temimgid).attr("src", img);
		document.getElementById(temimgid).style.width = "300px";
		document.getElementById(temimgid).style.height = "auto";
		var url = url_sendmsg + "cardrecon";
		$js.showLoadingBar();
		$file.upload({
			"url" : url,
			"filename" : img,
			"bindfield" : "res",
			"compressionRatio" : "0.3",
			"callback" : "uploadImageCallback1()"
		});
	}

};

function cameraBackb1() {

	var img = $ctx.getString("imagefilename");
	var temimgid = $ctx.getString("imgid");
	if (temimgid && img) {
		$cache.write(temimgid + "img", img);
		$("#" + temimgid).attr("src", img);
		document.getElementById(temimgid).style.width = "300px";
		document.getElementById(temimgid).style.height = "auto";
		var url = url_sendmsg + "cardbrecon";
		$js.showLoadingBar();
		$file.upload({
			"url" : url,
			"filename" : img,
			"bindfield" : "res",
			"compressionRatio" : "0.3",
			"callback" : "uploadImageBCallback1()"
		});
	}

};

function uploadImageBack1() {
	var res = JSON.parse($ctx.getApp("res"));
	if (res.error == 0) {
		var info = JSON.parse(res.info);
		if (info.reason == "success") {
			var ret = info.result;
			$("#name").val(ret.姓名);
			$("#sex").val(ret.性别);
			$("#nation").val(ret.民族);
			$("#birthday").val(ret.出生);
			$("#address").val(ret.住址);
			$("#idcard").val(ret.公民身份号码);
			//重新初始化缓存
			loadIdCardCache();
		}
	} else {
		alert(res.message);
	}
}

function uploadImageBBack1() {
	var res = JSON.parse($ctx.getApp("res"));
	if (res.error == 0) {
		var info = JSON.parse(res.info);
		if (info.reason == "success") {
			var ret = info.result;
			$("#issue").val(ret.签发机关);
			$("#useful").val(ret.有效期限);
			//重新初始化缓存
			loadIdCardBCache();
		}
	} else {
		alert(res.message);
	}
}

function saverInfo(imgid, attchid, type) {
	var imgs = imgid.split("_");
	var imgsrc = $("#" + imgs[1]).attr("src");
	var imgcache = $cache.read(imgs[1] + "img");
	if (!imgcache || !imgsrc || imgsrc.indexOf("/file/down") != -1) {
		alert("没有选择图片或没有做图片的更改，不需要再次上传");
		return;
	}
	$ctx.setApp({
		"type" : type
	});
	//判断读取的身份证信息是否有值
	if (!($("#sex").val()) || !($("#address").val()) || !($("#birthday").val()) || !($("#idcard").val()) || !($("#name").val()) || !($("#nation").val())) {
		alert("身份证信息不完整，请重新拍摄");
		return;
	}
	var idcard = $("#idcard").val().trim();
	var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	if (!reg.test(idcard)) {
		alert("身份证号格式不正确");
		return;
	}

	var sex = $("#sex").val().trim();
	if (sex != "男" && sex != "女") {
		alert("性别不正确");
		return;
	}

	var birthday = $("#birthday").val().trim();
	reg = /^\d{4}-\d{2}-\d{2}$/;
	if (!reg.test(birthday)) {
		alert("出生日期格式不正确");
		return;
	}

	$js.showLoadingBar();

	var custinfo = {};
	custinfo.sex = $("#sex").val();
	custinfo.address = $("#address").val();
	custinfo.birthday = $("#birthday").val();
	custinfo.idcard = $("#idcard").val();
	custinfo.name = $("#name").val();
	custinfo.nation = $("#nation").val();
	custinfo.id = $("#custid").val();
	custinfo.productId = $ctx.getApp("product");
	custinfo.custId = $ctx.getApp("username");
	custinfo.relatype = type;

	//重新初始化缓存
	loadIdCardCache();

	var url = url_mgr + "api/addCustInfo";
	$ctx.setApp({
		"imgid" : imgid,
		"attchid" : attchid
	})
	alert("保存信息");
	//保存客户信息
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(JSON.stringify(custinfo)),
		"callback" : "saveInfoCallback()"
	}, true);
}

function loadIdCardCache() {
	//重新初始化缓存数据
	var type = $ctx.getApp("type");
	var idcardinfo = $cache.read("idcardinfo" + type);
	var custinfo;
	if (idcardinfo) {
		custinfo = JSON.parse(idcardinfo);
	} else {
		custinfo = {};
	}
	custinfo.sex = $("#sex").val();
	custinfo.address = $("#address").val();
	custinfo.birthday = $("#birthday").val();
	custinfo.idcard = $("#idcard").val();
	custinfo.name = $("#name").val();
	custinfo.nation = $("#nation").val();
	$cache.write("idcardinfo" + type, JSON.stringify(custinfo));
}

function loadIdCardBCache() {
	//重新初始化缓存数据
	var type = $ctx.getApp("type");
	var idcardinfo = $cache.read("idcardinfo" + type);
	var custinfo;
	if (idcardinfo) {
		custinfo = JSON.parse(idcardinfo);
	} else {
		custinfo = {};
	}
	custinfo.issue = $("#issue").val();
	custinfo.useful = $("#useful").val();
	$cache.write("idcardinfo" + type, JSON.stringify(custinfo));
}

function savebInfo(imgid, attchid, type) {
	var imgs = imgid.split("_");
	var imgsrc = $("#" + imgs[1]).attr("src");
	var imgcache = $cache.read(imgs[1] + "img");
	if (!imgcache || !imgsrc || imgsrc.indexOf("/file/down") != -1) {
		alert("没有选择图片或没有做图片的更改，不需要再次上传");
		return;
	}
	$ctx.setApp({
		"type" : type
	});
	//判断读取的身份证信息是否有值
	if (!($("#issue").val()) || !($("#useful").val())) {
		alert("信息不全");
		return;
	}

	$js.showLoadingBar();

	var custinfo = {};
	custinfo.issue = $("#issue").val();
	custinfo.useful = $("#useful").val();
	custinfo.id = $("#custid").val();
	custinfo.productId = $ctx.getApp("product");
	custinfo.custId = $ctx.getApp("username");
	custinfo.relatype = type;

	//重新初始化缓存数据
	loadIdCardBCache();

	var url = url_mgr + "api/addCustInfo";
	$ctx.setApp({
		"imgid" : imgid,
		"attchid" : attchid
	})
	//保存客户信息
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(JSON.stringify(custinfo)),
		"callback" : "saveInfoCallback()"
	}, true);
}

function saveInfoBack() {
	$js.showLoadingBar();
	var imgid = $ctx.getApp("imgid");
	var attchid = $ctx.getApp("attchid");
	var type = $ctx.getApp("type");
	//重新初始化缓存数据
	var idcardinfo = $cache.read("idcardinfo" + type);
	var custinfo;
	if (idcardinfo) {
		custinfo = JSON.parse(idcardinfo);
	} else {
		custinfo = {};
	}
	var data = JSON.parse($ctx.getApp("data"));
	custinfo.custid = data.id;
	$cache.write("idcardinfo" + type, JSON.stringify(custinfo));
	//上传附件
	uploadImg(imgid, attchid);
}

function loadRCacheInfo(cachename) {
	var idcardinfo = $cache.read(cachename);
	if (idcardinfo) {
		idcardinfo = JSON.parse(idcardinfo);
		$("#name").val(idcardinfo.name);
		$("#sex").val(idcardinfo.sex);
		$("#nation").val(idcardinfo.nation);
		$("#birthday").val(idcardinfo.birthday);
		$("#address").val(idcardinfo.address);
		$("#idcard").val(idcardinfo.idcard);
		if (idcardinfo.custid) {
			$("#custid").val(idcardinfo.custid);
		}
	}
}

function loadBCacheInfo(cachename) {
	var idcardinfo = $cache.read(cachename);
	if (idcardinfo) {
		idcardinfo = JSON.parse(idcardinfo);
		$("#issue").val(idcardinfo.issue);
		$("#useful").val(idcardinfo.useful);
		if (idcardinfo.custid) {
			$("#custid").val(idcardinfo.custid);
		}
	}
}
