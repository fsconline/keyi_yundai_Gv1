window.onload = function() {
	setTimeout(loadPsnInfo, 500);
}
function loadPsnInfo() {
	var attch1rs = $cache.read("attch1rs");
	var attch1bs = $cache.read("attch1bs");
	if ("1" == attch1rs || "1" == attch1bs) {
		dt1 = document.getElementById("attch1");
		dt1.innerText = "*";
	}

	var attch2rs = $cache.read("attch2rs");
	var attch2bs = $cache.read("attch2bs");
	if ("1" == attch2rs || "1" == attch2bs) {
		dt2 = document.getElementById("attch2");
		dt2.innerText = "*";
	}

	var attch21rs = $cache.read("attch21rs");
	var attch21bs = $cache.read("attch21bs");
	if ("1" == attch21rs || "1" == attch21bs) {
		dt21 = document.getElementById("attch21");
		dt21.innerText = "*";
	}

	var attch22rs = $cache.read("attch22rs");
	var attch22bs = $cache.read("attch22bs");
	if ("1" == attch22rs || "1" == attch22bs) {
		dt22 = document.getElementById("attch22");
		dt22.innerText = "*";
	}

	var attch3 = $cache.read("attch3");
	if (attch3 != null && "1" == attch3) {
		dt3 = document.getElementById("attch3");
		dt3.innerText = "*";
	}

	var attch4 = $cache.read("attch4");
	if (attch4 != null && "1" == attch4) {
		dt4 = document.getElementById("attch4");
		dt4.innerText = "*";
	}

	var address = $ctx.getApp("adress");
	if (address != "0")
		$("#address").val(address);

	onAllload();

}

function queryload2() {
	var attachs = JSON.parse($ctx.getApp("attachs"));
	if (attachs) {
		var right1 = document.getElementById("attch1right");
		if (attachs.attch1rs && attachs.attch1bs) {
			right1.setAttribute("class", "ti-check");
		} else {
			right1.setAttribute("class", "ti-angle-right");
		}
		var right2 = document.getElementById("attch2right");
		if (attachs.attch2rs && attachs.attch2bs) {
			right2.setAttribute("class", "ti-check");
		} else {
			right2.setAttribute("class", "ti-angle-right");
		}
		var right21 = document.getElementById("attch21right");
		if (attachs.attch21rs && attachs.attch21bs) {
			right21.setAttribute("class", "ti-check");
		} else {
			right21.setAttribute("class", "ti-angle-right");
		}
		var right22 = document.getElementById("attch22right");
		if (attachs.attch22rs && attachs.attch22bs) {
			right22.setAttribute("class", "ti-check");
		} else {
			right22.setAttribute("class", "ti-angle-right");
		}
		var right3 = document.getElementById("attch3right");
		if (attachs.attch3) {
			right3.setAttribute("class", "ti-check");
		} else {
			right3.setAttribute("class", "ti-angle-right");
		}
		var right4 = document.getElementById("attch4right");
		if (attachs.attch4) {
			right4.setAttribute("class", "ti-check");
		} else {
			right4.setAttribute("class", "ti-angle-right");
		}
	}
}

function onAllload() {
	var username = $ctx.getApp("username");
	var product = $ctx.getApp("product");
	var id = $ctx.getApp("applyid");
	var datajson = '{"username":"' + username + '","product":"' + product + '","id":"' + id + '"}';
	var url = url_mgr + "api/qryAttach";
	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "loadApplyCallback2()"
	}, true);
}

function savePsnAction() {
	var username = $ctx.getApp("username");
	var adress = $("#address").val();
	if (!adress) {
		alert("联系地址不能为空");
		return;
	}
	adress = adress.trim();
	$ctx.setApp({
		"adress" : adress
	})
	var datajson = '{"adress":"' + adress + '","username":"' + username + '"}';
	var url = url_mgr + "api/saveadress";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "savePsnActionCallback()"
	}, true);
}
