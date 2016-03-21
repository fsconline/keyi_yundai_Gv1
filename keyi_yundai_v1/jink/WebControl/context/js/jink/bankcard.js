function start() {
	var list = getBankData();
}

function setDiv() {
	var data = JSON.parse($ctx.getApp("bankdata"));
	if (data != null) {
		var list = data;
		td = document.getElementById("main");
		for (var i = 0; i < list.length; i++) {
			var bankdata = list[i];
			var key = bankdata.bankacc;
			$ctx.setApp({
				key : "1"
			})
			var part = document.createElement("h3");
			part.setAttribute("id", "partdiv" + i);
			var backgd = getBackGround(i);
			part.style.background = "#FFFFFF";
			var partli = document.createElement("li" + i);

			//加载图片
			var imgdiv = document.createElement("h3");
			imgdiv.style.width = "45pX";
			imgdiv.style.fontSize = 20;
			imgdiv.style.float = "left";
			imgdiv.setAttribute("id", "img" + i);
			var li = document.createElement("img" + i);
			var img = document.createElement("img");
			img.setAttribute("id", "newImg");
			img.src = "img/portal.jpg";
			img.style.width = "40pX";
			li.appendChild(img);
			imgdiv.appendChild(li);
			partli.appendChild(imgdiv);

			var bankdiv = document.createElement("h4");
			bankdiv.style.width = "200pX";
			bankdiv.style.float = "left";
			bankdiv.setAttribute("id", "bankname" + i);
			bankdiv.style.fontSize = "18pX";
			var bankdoc = bankdata.bankdoc;
			bankdiv.innerText = bankdoc;
			partli.appendChild(bankdiv);

			var div4 = document.createElement("div");
			var label_var = document.createElement("label");
			var input1 = document.createElement('input');
			input1.setAttribute('type', 'radio');
			input1.setAttribute('name', 'um-radio');
			input1.setAttribute("id", "input" + i);
			input1.setAttribute("value", bankdata.bankacc);
			input1.style.float = "left";
			if ("1" == bankdata.ismr) {
				input1.setAttribute("checked", true);
			}
			input1.onclick = function() {
				onsetcard(i);
			}
			var span = document.createElement('span');
			span.innerText = "默认银行卡";
			span.style.fontSize = "15pX";
			span.setAttribute("class", "um-black");
			label_var.appendChild(input1);
			label_var.appendChild(span);
			var bankacc = document.createElement("h4");
			bankacc.style.width = "240pX";
			bankacc.setAttribute("id", "bankacc" + i);
			bankacc.style.fontSize = "20pX";
			var bankaccnum = bankdata.bankacc;
			var str_bankacc = bankaccnum.substr(bankaccnum.length - 4);
			bankacc.innerText = '*** **** **** ' + str_bankacc;
			partli.appendChild(bankacc);

			div4.appendChild(label_var);
			partli.appendChild(div4);
			part.appendChild(partli);

			//增加href
			var prePage = document.createElement("a");
			prePage.href = "bankedit.html?bankdoc=" + bankdata.bankdoc + "&bankacc=" + bankdata.bankacc + "&sf=" + bankdata.prov + "&cs=" + bankdata.city + "&khzh=" + bankdata.subbank;
			prePage.setAttribute("id", "page" + i);
			prePage.value = this.prePage;
			prePage.appendChild(part);
			td.appendChild(prePage);
		}
	}
}

function onsetcard(i) {
	var obj = document.getElementsByTagName("input");
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].checked) {
			var username = $ctx.getApp("username");
			var bankacc = obj[i].value;
			var custbank = {};
			custbank.username = username;
			custbank.bankacc = bankacc;
			var data = JSON.stringify(custbank);
			var url = url_mgr + "api/updatebankmr";

			$service.call("UMService.post", {
				"url" : url,
				"data" : JSON.parse(data),
				"callback" : "setCardCallback()"
			}, true);
		}
	}
}

function setCardCallback1() {
	alert("设置默认银行卡错误！");
	var obj2 = document.getElementsByTagName("input");
	for (var j = 0; j < obj2.length; j++) {
		if (obj[j].checked) {
			obj[j].checked = false;
		}
	}
}

function getBankData() {
	var datajson;
	//对密码进行加密处理
	//var username = "18613590363";
	var username = $ctx.getApp("username");
	if (username == null) {
		alert("请先登录!");
		return;
	}
	datajson = '{"username":"' + username + '"}';
	var url = url_mgr + "api/querybank";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "getBankDataCallback()"
	}, true);

}

function getBackGround(i) {
	if (i == 0) {
		return "#C12E2A";
		//红
	} else if (i == 1) {
		return "#000066";
		//蓝
	} else if (i == 2) {
		return "#006600";
		//绿
	} else if (i == 3) {
		return "#440044";
		//紫
	} else
		return "#999999";
}

function onlineBank() {
	var banknames = new Array("中国工商银行", "中国建设银行", "中国银行", "交通银行", "中国农业银行", "招商银行", "中国邮政储蓄银行", "中国光大银行", "中国民生银行", "平安银行", "浦发银行", "中信银行", "兴业银行", "华夏银行", "广发银行", "北京银行", "徽商银行", "天津银行", "重庆银行", "上海银行", "南京银行", "浙商银行", "广州银行", "江苏银行", "北京农商银行", "渤海银行", "重庆农村商业银行");
}

