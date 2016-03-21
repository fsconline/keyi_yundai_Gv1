/**
 *联系人信息
 */

//配偶信息
var lxr1 = {};
//直系亲属信息
var lxr2 = {};
//同事信息
var lxr3 = {};
//其他联系人1
var lxr4 = {};
//其他联系人2
var lxr5 = {};
var continfos = new Array();

function contSaveAction() {
	contInfo1 = true;

	var cachejson = "";
	/**
	 *配偶信息
	 */
	//姓名
	var linkname1 = $("#linkname1").val().trim();
	if (linkname1) {
		cachejson += "linkname1:" + linkname1 + ",";
	} else {
		contInfo1 = false;
	}
	//联系电话
	var linktel1 = $("#linktel1").val().trim();
	if (linktel1) {
		cachejson += "linktel1:" + linktel1 + ","
	} else {
		contInfo1 = false;
	}

	if (contInfo1) {
		lxr1.linktel = linktel1;
		lxr1.linkname = linkname1;
		lxr1.linktype = "1";
	}
	contInfo2 = true;
	/**
	 *直系亲属信息
	 */

	index = 0;

	//姓名
	var linkname2 = $("#linkname2").val().trim();
	if (linkname2) {
		cachejson += "linkname2:" + linkname2 + ","

	} else {
		contInfo2 = false;
	}
	//联系电话
	var linktel2 = $("#linktel2").val().trim();
	if (linktel2) {
		cachejson += "linktel2:" + linktel2 + ","

	} else {
		contInfo2 = false;
	}

	if (contInfo2) {
		index++;
		lxr2.linktel = linktel2;
		lxr2.linkname = linkname2;
		lxr2.linktype = "2";
	}
	/**
	 *同事信息
	 */
	contInfo3 = true;
	//姓名
	var linkname3 = $("#linkname3").val().trim();
	if (linkname3) {
		cachejson += "linkname3:" + linkname3 + ","

	} else {
		contInfo3 = false;
	}
	//联系电话
	var linktel3 = $("#linktel3").val().trim();
	if (linktel3) {
		cachejson += "linktel3:" + linktel3 + ","

	} else {
		contInfo3 = false;
	}

	if (contInfo3) {
		index++;
		lxr3.linktel = linktel3;
		lxr3.linkname = linkname3;
		lxr3.linktype = "3";
	}

	/**
	 *其他联系人1
	 */
	contInfo4 = true;
	//姓名
	var linkname4 = $("#linkname4").val().trim();
	if (linkname4) {
		cachejson += "linkname4:" + linkname4 + ","

	} else {
		contInfo4 = false;
	}
	//联系电话
	var linktel4 = $("#linktel4").val().trim();
	if (linktel4) {
		cachejson += "linktel4:" + linktel4 + ","

	} else {
		contInfo4 = false;
	}

	if (contInfo4) {
		index++;
		lxr4.linktel = linktel4;
		lxr4.linkname = linkname4;
		lxr4.linktype = "4";
	}
	/**
	 *其他联系人2
	 */
	//姓名
	//姓名
	contInfo5 = true;
	var linkname5 = $("#linkname5").val().trim();
	if (linkname5) {
		cachejson += "linkname5:" + linkname5 + ","

	} else {
		contInfo5 = false;
	}
	//联系电话
	var linktel5 = $("#linktel5").val().trim();
	if (linktel5) {
		cachejson += "linktel5:" + linktel5 + ","

	} else {
		contInfo5 = false;
	}

	if (contInfo5) {
		index++;
		lxr5.linktel = linktel5;
		lxr5.linkname = linkname5;
		lxr5.linktype = "5";
	}

	flag = false;
	if (linkname1 && linktel1) {
		if (index >= 2) {
			flag = true;
		}
	} else {
		if (index >= 3) {
			flag = true;
		}
	}
	if (!flag) {
		alert("除配偶外剩余信息中必输其中三项，如有配偶，配偶信息必输。");
		return;
	}

	$ctx.setApp({
		"contInfo" : cachejson.substr(0, cachejson.length - 1)
	})

	continfos[0] = lxr1;
	continfos[1] = lxr2;
	continfos[2] = lxr3;
	continfos[3] = lxr4;
	continfos[4] = lxr5;
	str_continfos = JSON.stringify(continfos);

	//讲对象转换成json字符串
	$ctx.setApp({
		"str_continfos" : str_continfos
	})

	window.location = "sfdapply.html";
}

window.onload = function() {
	setTimeout(loadContractinfo, 500);
}
function loadContractinfo() {
	var cachemsg = $ctx.getApp("contInfo");
	if (cachemsg) {
		var params = cachemsg.split(",");
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split(":");
			$("#" + param[0]).val(param[1]);
		}
		telBack();
		return;
	}

	var username = $ctx.getApp("username");
	var product = $ctx.getApp("product");
	var id = $ctx.getApp("applyid");
	var datajson = '{"username":"' + username + '","product":"' + product + '","id":"' + id + '"}';

	var url = url_mgr + "api/qryAttach";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "loadApplyCallback4()"
	}, true);
}

function queryload4() {
	var attachs = JSON.parse($ctx.getApp("attachs"));
	if (attachs) {
		if (attachs.bodys) {
			var bodys = JSON.parse(attachs.bodys);
			if (bodys) {
				for (var i = 0; i < bodys.length; i++) {
					var body = bodys[i];
					$("#linkname" + body.linktype).val(body.linkname);
					$("#linktel" + body.linktype).val(body.linktel);
				}
			}
		}
	}
	telBack();
}

function telBack() {
	var data = $ctx.getApp("teldata");
	if (data) {
		var type = $ctx.getApp("teltype");
		var result = JSON.parse(data);
		document.getElementById("linkname" + type).value = result.name;
		document.getElementById("linktel" + type).value = result.phone;
	}
}
