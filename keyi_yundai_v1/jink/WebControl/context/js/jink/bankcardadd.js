var ckr;
var kh;
var ssyh;
var tel;
var sf;
var cs;
var zhmc;
var custbank = {};
//校验持卡人和卡号
function checkcard() {

	ssyh = $("#ssyh").val().trim();
	sf = $("#sf").val().trim();
	cs = $("#cs").val().trim();
	zhmc = $("#zhmc").val().trim();
	if (!ssyh || !sf || !cs) {
		alert("请输入开户行、省份及城市信息！");
		return;
	}

	var next1 = document.getElementById('next1');
	next1.href = '#bankcardadd2';
	next1.setAttribute("onclick", '');
	next1.click("return false");
}

function checktel() {

	ckr = $("#ckr").val().trim();
	kh = $("#kh").val().trim();
	tel = $("#tel").val().trim();
	if (!ckr || !kh || !tel) {
		alert("请输入持卡人、卡号及电话号码！");
		return;
	}
	if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel))) {
		showWarnMsg("手机号不合法");
		return;
	}
	var bankacc = $ctx.getApp(kh);
	if ("1" == bankacc) {
		alert("此卡已绑定！");
		return;
	}

	var obj = document.getElementsByName('fruit');
	if (obj[0].checked) {
		var next2 = document.getElementById('next2');
		next2.href = '#bankcardadd3';
		next2.setAttribute("onclick", '');
		next2.click("return false");
		td = document.getElementById("talltel");
		var div = document.getElementById("tishi");
		if (div == null) {
			div = document.createElement("h4");
		}
		div.style.width = "600pX";
		div.setAttribute("id", "tishi");
		div.style.fontSize = 5;
		var end = tel.substr(tel.length - 4);
		var start = tel.substr(0, 3);
		var a = div.innerText;
		div.innerText = '请输入手机' + start + '****' + end + '收到的短信验证码';
		td.appendChild(div);
	} else {
		alert("请阅读扣款协议并接受！");
		var next2 = document.getElementById('next2');
		next2.href = '#bankcardadd2';
		next2.setAttribute("onclick", '');
		next2.click("return false");
		return;
	}
}

function addcard() {
	var code = $("#code").val().trim();
	verifyTelCode(code, "addCard");
}

function addcardinfo() {
	//校验验证码，验证成功后保存信息
	$js.hideLoadingBar();
	var username = $ctx.getApp("username");
	custbank.username = username;
	custbank.bankname = ckr;
	custbank.bankacc = kh;
	custbank.bankdoc = ssyh;
	custbank.tel = tel;
	custbank.subbank = zhmc;
	custbank.prov = sf;
	custbank.city = cs;
	var data = JSON.stringify(custbank);
	var url = url_mgr + "api/savebank";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(data),
		"callback" : "addcardCallback()"
	}, true);
}

function addCardCallBack1() {
	var next3 = document.getElementById('next3');
	next3.href = '#bankcardadd1';
	next3.setAttribute("onclick", '');
	next3.click("return false");
}
