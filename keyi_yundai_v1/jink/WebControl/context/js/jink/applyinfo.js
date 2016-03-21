window.onload = function() {
	setTimeout(loadPage, 500);
}
function loadPage() {
	var attch51 = $cache.read("attch51");
	var attch52 = $cache.read("attch52");
	var attch53 = $cache.read("attch53");
	if ("1" == attch51 || "1" == attch52 || "1" == attch53) {
		dt5 = document.getElementById("attch5");
		dt5.innerText = "*";
	}

	var attch6 = $cache.read("attch6");
	if ("1" == attch6) {
		dt6 = document.getElementById("attch6");
		dt6.innerText = "*";
	}
	var attch71 = $cache.read("attch71");
	var attch72 = $cache.read("attch72");
	var attch73 = $cache.read("attch73");
	if ("1" == attch71 || "1" == attch72 || "1" == attch73) {
		dt7 = document.getElementById("attch7");
		dt7.innerText = "*";
	}

	var attch81 = $cache.read("attch81");
	var attch82 = $cache.read("attch82");
	var attch83 = $cache.read("attch83");
	if ("1" == attch81 || "1" == attch82 || "1" == attch83) {
		dt8 = document.getElementById("attch8");
		dt8.innerText = "*";
	}

	var attch9 = $cache.read("attch9");
	if ("1" == attch9) {
		dt9 = document.getElementById("attch9");
		dt9.innerText = "*";
	}
	var attch10 = $cache.read("attch10");
	if ("1" == attch10) {
		dt10 = document.getElementById("attch10");
		dt10.innerText = "*";
	}
	var attch11 = $cache.read("attch11");
	if ("1" == attch11) {
		dt11 = document.getElementById("attch11");
		dt11.innerText = "*";
	}
	var attch12 = $cache.read("attch12");
	if ("1" == attch12) {
		dt12 = document.getElementById("attch12");
		dt12.innerText = "*";
	}
	var attch13 = $cache.read("attch13");
	if ("1" == attch13) {
		dt13 = document.getElementById("attch13");
		dt13.innerText = "*";
	}
	var attch141 = $cache.read("attch141");
	var attch142 = $cache.read("attch142");
	var attch143 = $cache.read("attch143");
	if ("1" == attch141 || "1" == attch142 || "1" == attch143) {
		dt14 = document.getElementById("attch14");
		dt14.innerText = "*";
	}
	onAllload();
}

function queryload3() {
	var attachs = JSON.parse($ctx.getApp("attachs"));
	if (attachs) {
		var right5 = document.getElementById("attch5right");
		if (attachs.attch51 || attachs.attch52 || attachs.attach53) {
			right5.setAttribute("class", "ti-check");
		} else {
			right5.setAttribute("class", "ti-angle-right");
		}
		var right6 = document.getElementById("attch6right");
		if (attachs.attch6) {
			right6.setAttribute("class", "ti-check");
		} else {
			right6.setAttribute("class", "ti-angle-right");
		}
		var right7 = document.getElementById("attch7right");
		if (attachs.attch71 || attachs.attch72 || attachs.attch73) {
			right7.setAttribute("class", "ti-check");
		} else {
			right7.setAttribute("class", "ti-angle-right");
		}
		var right8 = document.getElementById("attch8right");
		if (attachs.attch81 || attachs.attch82 || attachs.attch83) {
			right8.setAttribute("class", "ti-check");
		} else {
			right8.setAttribute("class", "ti-angle-right");
		}
		var right9 = document.getElementById("attch9right");
		if (attachs.attch9) {
			right9.setAttribute("class", "ti-check");
		} else {
			right9.setAttribute("class", "ti-angle-right");
		}
		var right10 = document.getElementById("attch10right");
		if (attachs.attch10) {
			right10.setAttribute("class", "ti-check");
		} else {
			right10.setAttribute("class", "ti-angle-right");
		}
		var right11 = document.getElementById("attch11right");
		if (attachs.attch11) {
			right11.setAttribute("class", "ti-check");
		} else {
			right11.setAttribute("class", "ti-angle-right");
		}
		var right12 = document.getElementById("attch12right");
		if (attachs.attch12) {
			right12.setAttribute("class", "ti-check");
		} else {
			right12.setAttribute("class", "ti-angle-right");
		}
		var right13 = document.getElementById("attch13right");
		if (attachs.attch13) {
			right13.setAttribute("class", "ti-check");
		} else {
			right13.setAttribute("class", "ti-angle-right");
		}
		var right14 = document.getElementById("attch14right");
		if (attachs.attch141 || attachs.attch142 || attachs.attch143) {
			right14.setAttribute("class", "ti-check");
		} else {
			right14.setAttribute("class", "ti-angle-right");
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
		"callback" : "loadApplyCallback3()"
	}, true);
}

