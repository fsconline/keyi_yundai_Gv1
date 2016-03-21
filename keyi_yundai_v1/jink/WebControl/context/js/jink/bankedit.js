function start() {
	var value = new Array;
	var str = location.href;
	var srtr = decodeURIComponent(str);
	var num = srtr.indexOf("?");
	var cs = srtr.substr(num + 1);
	var arr = cs.split("&");
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value[i] = arr[i].substr(num + 1);
		}
	}
	var end_bankacc = value[1].substr(value[1].length - 4);
	var start_bankacc = value[1].substr(0, 4);
	var bankacc = start_bankacc + ' **** **** ' + end_bankacc;
	$("#bankdoc").val(value[0]);
	$("#bankacc").val(bankacc);
	$("#sf").val(value[2]);
	$("#cs").val(value[3]);
	$("#khzh").val(value[4]);
}

