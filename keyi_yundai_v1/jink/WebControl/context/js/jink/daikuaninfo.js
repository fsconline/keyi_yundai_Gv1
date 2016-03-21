/**
 *贷款信息
 */

function saveAction() {
	dkInfo = true;
	var jine = false;
	var fangyuanname = false;
	var fangyuancode = false;
	var developcode = false;
	var developname = false;
	var repaycode = false;
	var cust = {};
	var custinfo = "";
	//贷款金额
	var amounta = $("#amount").val().trim();
	if (amounta) {
		custinfo += "amount:" + amounta + ",";
		jine = true;
	} else {
		dkInfo = false;
	}

	//贷款期限

	var peroida = $("#peroid").val();
	custinfo += "peroid:" + peroida + ",";

	//开发商名称
	var develop = $("#developid").val().trim();
	var devename = $("#developname").val().trim();
	if (develop) {
		custinfo += "developid:" + develop + ",";
		developcode = true;
	} else {
		dkInfo = false;
	}
	if (devename) {
		custinfo += "developname:" + devename + ",";
		developname = true;
	} else {
		dkInfo = false;
	}
	//楼盘名称

	var housesa = $("#houses").val().trim();
	var housename = $("#housename").val().trim();
	if (housesa) {
		custinfo += "houses:" + housesa + ",";
		fangyuancode = true;
	} else {
		dkInfo = false;
	}
	if (housename) {
		custinfo += "housename:" + housename + ",";
		fangyuanname = true;
	} else {
		dkInfo = false;
	}
	//房屋类型
	var housetypea = $("#housetype").val();
	custinfo += "housetype:" + housetypea + ",";
	//var housetypea = $("#housetype").val().trim();
	// alert(housetypea);
	//if (housetypea) {
	//	custinfo += "housetype:" + housetypea + ",";
	//} else {
	//	dkInfo = false;
	//}

	//还款方式
	var repayment = $("#repayment").val().trim();
	var repayname = $("#repayname").val().trim();
	if (repayment) {
		custinfo += "repayment:" + repayment + ",";
		repaycode = true;
	} else {
		dkInfo = false;
	}
	if (repayname) {
		custinfo += "repayname:" + repayname + ",";
		repaycode = true;
	} else {
		dkInfo = false;
	}

	if (custinfo.length > 0) {
		$ctx.setApp({
			"custinfo" : custinfo.substr(0, custinfo.length - 1)
		})
	}
	if (jine && fangyuanname && fangyuancode && developname && developcode && repaycode) {
		dkInfo = true;
	} else {
		dkInfo = false;
	}
	$ctx.setApp({
		"dkInfo" : dkInfo
	})
	if (dkInfo) {
		var usernamea = $ctx.getApp("username");
		cust.cust = usernamea;
		cust.amount = amounta;
		cust.peroid = peroida;
		cust.develop = develop;
		cust.houses = housesa;
		cust.housetype = housetypea;
		cust.repayment = repayment;
		str_cust = JSON.stringify(cust);
		//讲对象转换成json字符串
		$ctx.setApp({
			"str_cust" : str_cust
		})
	}

	window.location = "sfdapply.html";
}

//window.onload = function() {
//setTimeout(queryload1, 0);
//}
//function loadDaikuaninfo1() {
//	var username = $ctx.getApp("username");
////	var product = $ctx.getApp("product");
//	var id = $ctx.getApp("applyid");
//	var datajson = '{"username":"' + username + '","product":"' + product + '","id":"' + id + '"}';

//	var url = url_mgr + "api/qryAttach";
//	$service.call("UMService.post", {
//		"url" : url,
//		"data" : JSON.parse(datajson),
//		"callback" : "loadApplyCallback1()"
//	}, true);
//}

//function queryload1() {
//var flag = false;
////var attachs = JSON.parse($ctx.getApp("attachs"));
//if (attachs) {
//	if (attachs.head) {
//		var head = attachs.head;
//		if (head) {
//			var params = head.split(",");
//			for (var i = 0; i < params.length; i++) {
//				var param = params[i].split(":");
//				$("#" + param[0]).val(param[1]);
//			}
//		}
//		flag = true;
//	}
//}

//if (!flag) {
//	alert("flag" + flag);
//	var cachemsg = $ctx.getApp("custinfo");
//	alert("cachemsg----" + cachemsg);
//	//if (cachemsg) {
//	var params = cachemsg.split(",");
//	alert("params" + params);
//		for (var i = 0; i < params.length; i++) {
//			var param = params[i].split(":");
//			if (param[0] == "housename") {
//			$("#index").find("a[href='#listview']").find(".um-red")[0].innerHTML = param[1];
//		}
//		$("#" + param[0]).val(param[1]);
//	}
//	}
//}

//}

