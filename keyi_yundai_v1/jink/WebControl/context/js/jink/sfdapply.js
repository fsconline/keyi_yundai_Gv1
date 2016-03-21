/**
 *提交资料
 */
function commitAction() {
	var dk_info = $ctx.getApp("dkInfo");

	var cus = $ctx.getApp("str_cust");

	//贷款信息校验
	if (!dk_info || "false" == dk_info) {
		alert("贷款信息不完整!");
		window.location = "daikuaninfo.html";
		return;
	}
	var con_info = $ctx.getApp("contInfo");
	if (!con_info) {
		alert("联系人信息不完整!");
		window.location = "contactinfo.html";
		return;
	}
	var cust = JSON.parse(cus);
	//json转换成对象
	var cont = $ctx.getApp("str_continfos");
	//缓存中读取数据（json字符串）
	var continfos = JSON.parse(cont);
	//个人信息和申请材料附件必输项校验
	var attachs = JSON.parse($ctx.getApp("attachs"));
	var attch1rs = $cache.read("attch1rs");
	var attch1bs = $cache.read("attch1bs");
	if ("1" == attch1rs) {
		if (!attachs || !attachs.attch1rs) {
			alert("身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	if ("1" == attch1bs) {
		if (!attachs || !attachs.attch1bs) {
			alert("身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	var attch2rs = $cache.read("attch2rs");
	var attch2bs = $cache.read("attch2bs");
	if ("1" == attch2rs) {
		if (!attachs || !attachs.attch2rs) {
			alert("配偶身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	if ("1" == attch2bs) {
		if (!attachs || !attachs.attch2bs) {
			alert("配偶身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	var attch21rs = $cache.read("attch21rs");
	var attch21bs = $cache.read("attch21bs");
	if ("1" == attch21rs) {
		if (!attachs || !attachs.attch21rs) {
			alert("共借人1身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	if ("1" == attch21bs) {
		if (!attachs || !attachs.attch21bs) {
			alert("共借人1身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	var attch22rs = $cache.read("attch22rs");
	var attch22bs = $cache.read("attch22bs");
	if ("1" == attch22rs) {
		if (!attachs || !attachs.attch22rs) {
			alert("共借人2身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	if ("1" == attch22bs) {
		if (!attachs || !attachs.attch22bs) {
			alert("共借人2身份证信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}

	var attch3 = $cache.read("attch3");
	if ("1" == attch3) {
		if (!attachs || !attachs.attch3) {
			alert("本人持证照信息不完整!");
			window.location = "psninfo.html";
			return;
		}
	}
	var attch4 = $cache.read("attch4");
	if ("1" == attch4) {
		if (!attachs || !attachs.attch4) {
			alert("还款账户信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}

	var attch51 = $cache.read("attch51");
	var attch52 = $cache.read("attch52");
	var attch53 = $cache.read("attch53");
	if ("1" == attch51 || "1" == attch52 || "1" == attch53) {
		if (!attachs || (!attachs.attch51 && !attachs.attch52 && !attachs.attch53)) {
			alert("工作证明/银行流水信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}

	var attch6 = $cache.read("attch6");
	if (attch6 != null && "1" == attch6) {
		if (!attachs || !attachs.attch6) {
			alert("婚姻资料信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}
	var attch71 = $cache.read("attch71");
	var attch72 = $cache.read("attch72");
	var attch73 = $cache.read("attch73");
	if ("1" == attch71 || "1" == attch72 || "1" == attch73) {
		if (!attachs || (!attachs.attch71 && !attachs.attch72 && !attachs.attch73)) {
			alert("户口薄信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}
	var attch81 = $cache.read("attch81");
	var attch82 = $cache.read("attch82");
	var attch83 = $cache.read("attch83");
	if ("1" == attch81 || "1" == attch82 || "1" == attch83) {
		if (!attachs || (!attachs.attch81 && !attachs.attch82 && !attachs.attch83)) {
			alert("房屋认购书信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}
	var attch9 = $cache.read("attch9");
	if (attch9 != null && "1" == attch9) {
		if (attachs) {
			if (!attachs.attch9) {
				alert("订金收据信息不完整!");
				window.location = "applyinfo.html";
				return;
			}
		}
	}
	var attch10 = $cache.read("attch10");
	if (attch10 != null && "1" == attch10) {
		if (attachs) {
			if (!attachs.attch10) {
				alert("房屋预算表信息不完整!");
				window.location = "applyinfo.html";
				return;
			}
		}
	}
	var attch11 = $cache.read("attch11");
	if (attch11 != null && "1" == attch11) {
		if (attachs) {
			if (!attachs.attch11) {
				alert("社保信息不完整!");
				window.location = "applyinfo.html";
				return;
			}
		}
	}
	var attch12 = $cache.read("attch12");
	if (attch12 != null && "1" == attch12) {
		if (attachs) {
			if (!attachs.attch12) {
				alert("社保人信息不完整!");
				window.location = "applyinfo.html";
				return;
			}
		}
	}
	var attch13 = $cache.read("attch13");
	if (attch13 != null && "1" == attch13) {
		if (attachs) {
			if (!attachs.attch13) {
				alert("征信报告信息不完整!");
				window.location = "applyinfo.html";
				return;
			}
		}
	}
	var attch141 = $cache.read("attch141");
	var attch142 = $cache.read("attch142");
	var attch143 = $cache.read("attch143");
	if ("1" == attch141 || "1" == attch142 || "1" == attch143) {
		if (!attachs || (!attachs.attch141 && !attachs.attch142 && !attachs.attch143)) {
			alert("其他资料信息不完整!");
			window.location = "applyinfo.html";
			return;
		}
	}
	//===
	var sfapp = {};
	sfapp.head = cust;
	sfapp.body1 = continfos;

	$js.showLoadingBar();
	var url = url_mgr + "api/addcustapply/" + $ctx.getApp("product");
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(JSON.stringify(sfapp)),
		"timeout" : 60,
		"callback" : "applyCallback()"
	}, true);
}

window.onload = function() {
	setTimeout(onAllload, 500);
}
function onAllload() {
	var username = $ctx.getApp("username");
	var product = $ctx.getApp("product");
	var id = $ctx.getApp("applyid");
	var datajson = '{"username":"' + username + '","product":"' + product + '","id":"' + id + '"}';
	var url = url_mgr + "api/qryAttach";
	$js.showLoadingBar();
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "loadApplyCallback5()"
	}, true);
}

function loadpercentage() {
	var percentage = 0;
	//贷款信息
	var cachemsg = $ctx.getApp("custinfo");
	if (cachemsg) {
		var params = cachemsg.split(",");
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split(":");
			if (param[0] == "amount") {
				percentage += 6.25;
			}
			if (param[0] == "developid") {
				percentage += 6.25;
			}
			if (param[0] == "houses") {
				percentage += 6.25;
			}
			if (param[0] == "repayment") {
				percentage += 6.25;
			}
		}
	} else {
		var attachs = JSON.parse($ctx.getApp("attachs"));
		if (attachs != null && attachs.head != null) {
			percentage += 25;
		}
	}

	//联系人
	var cachemsg = $ctx.getApp("contInfo");
	if (cachemsg) {
		var params = cachemsg.split(",");
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split(":");
			if ("linkname1" == param[0]) {
				percentage += 2.5;
			}
			if ("linktel1" == param[0]) {
				percentage += 2.5;
			}
			if ("linkname2" == param[0]) {
				percentage += 2.5;
			}
			if ("linktel2" == param[0]) {
				percentage += 2.5;
			}
			if ("linkname3" == param[0]) {
				percentage += 2.5;
			}
			if ("linktel3" == param[0]) {
				percentage += 2.5;
			}
			if ("linkname4" == param[0]) {
				percentage += 2.5;
			}
			if ("linktel4" == param[0]) {
				percentage += 2.5;
			}
			if ("linkname5" == param[0]) {
				percentage += 2.5;
			}
			if ("linktel5" == param[0]) {
				percentage += 2.5;
			}
		}
	} else {
		var attachs = JSON.parse($ctx.getApp("attachs"));
		if (attachs) {
			if (attachs.bodys) {
				var bodys = JSON.parse(attachs.bodys);
				if (bodys) {
					for (var i = 0; i < bodys.length; i++) {
						var body = bodys[i];
						if (body.linktype == "1" && body.linkname != null) {
							percentage += 2.5;
						}
						if (body.linktype == "1" && body.linktel != null) {
							percentage += 2.5;
						}
						if (body.linktype == "2" && body.linkname != null) {
							percentage += 2.5;
						}
						if (body.linktype == "2" && body.linktel != null) {
							percentage += 2.5;
						}
						if (body.linktype == "3" && body.linkname != null) {
							percentage += 2.5;
						}
						if (body.linktype == "3" && body.linktel != null) {
							percentage += 2.5;
						}
						if (body.linktype == "4" && body.linkname != null) {
							percentage += 2.5;
						}
						if (body.linktype == "4" && body.linktel != null) {
							percentage += 2.5;
						}
						if (body.linktype == "5" && body.linkname != null) {
							percentage += 2.5;
						}
						if (body.linktype == "5" && body.linktel != null) {
							percentage += 2.5;
						}

					}
				}
			}
		}
	}

	//个人信息
	var attachs = JSON.parse($ctx.getApp("attachs"));
	if (attachs) {
		var right1 = document.getElementById("attch1right");
		if (attachs.attch1rs && attachs.attch1bs) {
			percentage += 3.57;
		}
		var right2 = document.getElementById("attch2right");
		if (attachs.attch2rs && attachs.attch2bs) {
			percentage += 3.57;
		}
		var right21 = document.getElementById("attch21right");
		if (attachs.attch21rs && attachs.attch21bs) {
			percentage += 3.57;
		}
		var right22 = document.getElementById("attch22right");
		if (attachs.attch22rs && attachs.attch22bs) {
			percentage += 3.57;
		}
		var right3 = document.getElementById("attch3right");
		if (attachs.attch3) {
			percentage += 3.57;
		}
		var right4 = document.getElementById("attch4right");
		if (attachs.attch4) {
			percentage += 3.58;
		}
	}
	var address = $ctx.getApp("adress");
	if (address != null && address != "0")
		percentage += 3.57;

	//申请材料
	if (attachs) {
		var right5 = document.getElementById("attch5right");
		if (attachs.attch51 || attachs.attch52 || attachs.attach53) {
			percentage += 2.5;
		}
		var right6 = document.getElementById("attch6right");
		if (attachs.attch6) {
			percentage += 2.5;
		}
		var right7 = document.getElementById("attch7right");
		if (attachs.attch71 || attachs.attch72 || attachs.attch73) {
			percentage += 2.5;
		}
		var right8 = document.getElementById("attch8right");
		if (attachs.attch81 || attachs.attch82 || attachs.attch83) {
			percentage += 2.5;
		}
		var right9 = document.getElementById("attch9right");
		if (attachs.attch9) {
			percentage += 2.5;
		}
		var right10 = document.getElementById("attch10right");
		if (attachs.attch10) {
			percentage += 2.5;
		}
		var right11 = document.getElementById("attch11right");
		if (attachs.attch11) {
			percentage += 2.5;
		}
		var right12 = document.getElementById("attch12right");
		if (attachs.attch12) {
			percentage += 2.5;
		}
		var right13 = document.getElementById("attch13right");
		if (attachs.attch13) {
			percentage += 2.5;
		}
		var right14 = document.getElementById("attch14right");
		if (attachs.attch141 || attachs.attch142 || attachs.attch143) {
			percentage += 2.5;
		}
	}
	percentage = Math.ceil(percentage);
	$js.hideLoadingBar();
	$('#waterbubble1').waterbubble({
		radius : 100,
		lineWidth : 5,
		data : percentage / 100,
		waterColor : 'rgba(30,144,255, 1)',
		textColor : 'rgba(255,255,255, 1)',
		txt : percentage + '%',
		font : 'bold 50px "黑体"',
		wave : true,
		animation : true
	});
}
