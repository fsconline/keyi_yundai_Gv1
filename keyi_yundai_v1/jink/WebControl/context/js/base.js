$(function() {
	if ( typeof ump_currentController == "undefined") {
		ump_currentController = "IndexController";
	} else {
		ump_currentController = "IndexController";
	}
})
/**
 *存储公共方法
 * @param {Object} message
 */

function showWarnMsg(message) {
	alert(message);
}

function changePage() {
	//$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/" + page + ".html");
	var page = $ctx.get("page");
	window.location.href = page;
}

function clearCache() {
	$ctx.setApp({
		"username" : "",
		"token" : "",
		"bankdoc" : "",
		"bankacc" : "",
		"dkInfo" : "",
		"str_cust" : "",
		"contInfo" : "",
		"str_continfos" : "",
		"ch_cachejson" : "",
		"apply_id" : "",
		"applyid" : "",
		"idcardinfo" : "",
		"custinfo" : "",
		"attachs" : "",
		"product" : "",
		"attachmsg" : "",
		"product_nc_id" : "",
		"daikloupan" : "",
		"teltype" : ""
	})

	$cache.write("attch1rsid", "");
	$cache.write("attch1bsid", "");
	$cache.write("attch2rsid", "");
	$cache.write("attch2bsid", "");
	$cache.write("attch21rsid", "");
	$cache.write("attch21bsid", "");
	$cache.write("attch22rsid", "");
	$cache.write("attch22bsid", "");
	$cache.write("attch3id", "");
	$cache.write("attch4id", "");
	$cache.write("attch51id", "");
	$cache.write("attch52id", "");
	$cache.write("attch53id", "");
	$cache.write("attch6id", "");
	$cache.write("attch71id", "");
	$cache.write("attch72id", "");
	$cache.write("attch73id", "");
	$cache.write("attch81id", "");
	$cache.write("attch82id", "");
	$cache.write("attch83id", "");
	$cache.write("attch9id", "");
	$cache.write("attch10id", "");
	$cache.write("attch11id", "");
	$cache.write("attch12id", "");
	$cache.write("attch13id", "");
	$cache.write("attch141id", "");
	$cache.write("attch142id", "");
	$cache.write("attch143id", "");

	$cache.write("attch1rsimg", "");
	$cache.write("attch1bsimg", "");
	$cache.write("attch2rsimg", "");
	$cache.write("attch2bsimg", "");
	$cache.write("attch21rsimg", "");
	$cache.write("attch21bsimg", "");
	$cache.write("attch22rsimg", "");
	$cache.write("attch22bsimg", "");
	$cache.write("attch3img", "");
	$cache.write("attch4img", "");
	$cache.write("attch51img", "");
	$cache.write("attch52img", "");
	$cache.write("attch53img", "");
	$cache.write("attch6img", "");
	$cache.write("attch71img", "");
	$cache.write("attch72img", "");
	$cache.write("attch73img", "");
	$cache.write("attch81img", "");
	$cache.write("attch82img", "");
	$cache.write("attch83img", "");
	$cache.write("attch9img", "");
	$cache.write("attch10img", "");
	$cache.write("attch11img", "");
	$cache.write("attch12img", "");
	$cache.write("attch13img", "");
	$cache.write("attch141img", "");
	$cache.write("attch142img", "");
	$cache.write("attch143img", "");

	$cache.write("attch1rs", "");
	$cache.write("attch1bs", "");
	$cache.write("attch2rs", "");
	$cache.write("attch2bs", "");
	$cache.write("attch21rs", "");
	$cache.write("attch21bs", "");
	$cache.write("attch22rs", "");
	$cache.write("attch22bs", "");
	$cache.write("attch3", "");
	$cache.write("attch4", "");
	$cache.write("attch51", "");
	$cache.write("attch52", "");
	$cache.write("attch53", "");
	$cache.write("attch6", "");
	$cache.write("attch71", "");
	$cache.write("attch72", "");
	$cache.write("attch73", "");
	$cache.write("attch81", "");
	$cache.write("attch82", "");
	$cache.write("attch83", "");
	$cache.write("attch9", "");
	$cache.write("attch10", "");
	$cache.write("attch11", "");
	$cache.write("attch12", "");
	$cache.write("attch13", "");
	$cache.write("attch141", "");
	$cache.write("attch142", "");
	$cache.write("attch143", "");

	$cache.write("idcardinfo1", "");
	$cache.write("idcardinfo2", "");
	$cache.write("idcardinfo3", "");
	$cache.write("idcardinfo4", "");
}

function cameraOpen(imgid) {
	$ctx.setApp({
		"imgid" : imgid
	});
	$camera.open({
		bindfield : "imagefilename",
		callback : "cameraCallback()"
	});
}

function cameraBack() {
	var img = $ctx.getString("imagefilename");
	var temimgid = $ctx.getApp("imgid");
	if (temimgid) {

		$("#" + temimgid).attr("src", img);

		$cache.write(temimgid + "img", img);

	}

};
/**设置图片展示大小，按比例缩放*/
function DrawImage(ImgD) {

	var proMaxWidth = 300;
	var proMaxHeight = 225;

	var image = new Image();
	image.src = ImgD.src;

	//alert("加载图片按比缩放方法");
	//alert("IMG控件长宽比例。。。宽度" + ImgD.width + "。。。。高度" + ImgD.height);
	//alert("图片长宽比：。。。宽度" + image.width + "。。。。高度" + image.height);

	//alert("proMaxWidth/image.width" + proMaxWidth / image.width);
	//alert("proMaxHeight/image.height" + proMaxHeight / image.height);

	if (image.width > 0 && image.height > 0) {
		var rate = (proMaxWidth / image.width < proMaxHeight / image.height) ? proMaxWidth / image.width : proMaxHeight / image.height;
		if (rate <= 1) {

			//alert("image.width * rate; =:" + image.width * rate);
			//alert("image.height * rate; =:" + image.height * rate);
			//alert("ImgD.id"+ImgD.id);
			//document.getElementById(ImgD.id).style.width = image.width * rate;
			//document.getElementById(ImgD.id).style.height = image.height * rate;

			if (ImgD.height > 250) {
				ImgD.width = image.width * rate;
				ImgD.height = image.height * rate;
			}
			if (ImgD.height > 250) {
				$('#' + ImgD.id).attr("style", "width: " + image.width * rate);
				$('#' + ImgD.id).attr("style", "height:" + image.height * rate);
			}
			if (ImgD.height > 250) {
				document.getElementById(ImgD.id).style.width = image.width * rate;
				document.getElementById(ImgD.id).style.height = image.height * rate;
			}
			if (ImgD.height > 250) {
				$('#' + ImgD.id).css("width", image.width * rate);
				$('#' + ImgD.id).css("height", image.height * rate);
			}

			//alert("ImgD.width * rate; =:" + ImgD.width);
			//alert("ImgD.height * rate; =:" + ImgD.height);

		} else {
			if (ImgD.height > 250) {
				ImgD.width = proMaxWidth;
				ImgD.height = proMaxHeight;
			}
			if (ImgD.height > 250) {
				$('#' + ImgD.id).attr("style", "width: " + proMaxWidth);
				$('#' + ImgD.id).attr("style", "height:" + proMaxHeight);
			}
			if (ImgD.height > 250) {
				document.getElementById(ImgD.id).style.width = proMaxWidth;
				document.getElementById(ImgD.id).style.height = proMaxHeight;
			}
			if (ImgD.height > 250) {
				$('#' + ImgD.id).css("width", proMaxWidth);
				$('#' + ImgD.id).css("height", proMaxHeight);
			}
		}
	} else {
		ImgD.width = proMaxWidth;
		ImgD.height = proMaxHeight;

		if (ImgD.height != proMaxHeight) {
			$('#' + ImgD.id).attr("style", "width: " + proMaxWidth);
			$('#' + ImgD.id).attr("style", "height:" + proMaxHeight);
		}
		if (ImgD.height != proMaxHeight) {
			document.getElementById(ImgD.id).style.width = proMaxWidth;
			document.getElementById(ImgD.id).style.height = proMaxHeight;
		}
		if (ImgD.height != proMaxHeight) {
			$('#' + ImgD.id).css("width", proMaxWidth);
			$('#' + ImgD.id).css("height", proMaxHeight);
		}
	}

	//alert("IMG修改后控件长宽比例。。。宽度" + ImgD.width + "。。。。高度" + ImgD.height);

};

/**
 *点击显示大图
 */
function imgShow(_this) {
	var src = _this.attr("src");
	$("#bigimg").attr("src", src);
	$("<img/>").attr("src", src).load(function() {
		var windowW = $(window).width();
		var windowH = $(window).height();
		var realWidth = this.width;
		var realHeight = this.height;
		var imgWidth, imgHeight;
		var scale = 0.95;

		if (realHeight > windowH * scale) {
			imgHeight = windowH * scale;
			imgWidth = imgHeight / realHeight * realWidth;
			if (imgWidth > windowW * scale) {
				imgWidth = windowW * scale;
			}
		} else if (realWidth > windowW * scale) {
			imgWidth = windowW * scale;
			imgHeight = imgWidth / realWidth * realHeight;
		} else {
			imgWidth = realWidth;
			imgHeight = realHeight;
		}
		$("#bigimg").css("width", imgWidth);

		var w = (windowW - imgWidth) / 2;
		var h = (windowH - imgHeight) / 2;
		$("#innerdiv").css({
			"top" : h,
			"left" : w
		});
		$("#outerdiv").fadeIn("fast");
	});
	$("#outerdiv").click(function() {
		$(this).fadeOut("fast");
	});
};

/**
 *上传图片
 */
function uploadImg(imgid, attchid) {
	var imgs = imgid.split("_");
	var imgcache = $cache.read(imgs[1] + "img");
	var img = $("#" + imgs[1]).attr("src");
	if (!imgcache || !img || img.indexOf("/file/down") != -1) {
		alert("没有选择图片或没有做图片的更改，不需要再次上传");
		return;
	}
	var username = $ctx.getApp("username");
	var attcid = $('#' + attchid).val();
	var product = $ctx.getApp("product");
	$ctx.put("imgid", imgs[1]);
	$js.hideLoadingBar();
	var url = url_mgr + "file/upload/";
	if (attcid == "0") {
		url += username + "/" + product + "/" + imgid + "/" + attcid;
	} else {
		url += "a/b/c/" + attcid;
	}
	if (img.indexOf("/file/down") != -1) {
		alert("没有做图片的更改，不需要再次上传");
		return;
	}
	$js.showLoadingBar();
	$file.upload({
		"url" : url,
		"filename" : img,
		"bindfield" : "res",
		"compressionRatio" : "0.3",
		"callback" : "uploadImageCallback()"
	});
}

/**
 *删除图片
 */
function deleteImg(id) {
	$js.hideLoadingBar();
	var username = $ctx.getApp("username");
	var product = $ctx.getApp("product");
	var applyid = $ctx.getApp("applyid");
	var url = url_mgr + "file/delete/";
	url += username + "/" + product + "/" + applyid + "/" + id;
	$js.showLoadingBar();
	$service.call("UMService.post", {
		"url" : url,
		"callback" : "deleteImageCallback()"
	}, true);
}

function uploadImageBack() {
	var res = JSON.parse($ctx.getApp("res"));
	var down_url = url_mgr + "file/down";
	if (res.fileName != '-1') {// -1  表示文件太大，没有上传
		var imgid = $ctx.get("imgid");
		$cache.write(imgid + "img", down_url + "?id=" + res.fileName);
		$cache.write(imgid + "id", res.id);
		$("#" + imgid).attr("src", down_url + "?id=" + res.fileName);
		$alert("上传成功");
		if (imgid == "attch1rs" || imgid == "attch1bs") {
			window.location = "attch1.html";
		} else if (imgid == "attch2rs" || imgid == "attch2bs") {
			window.location = "attch2.html";
		} else if (imgid == "attch21rs" || imgid == "attch21bs") {
			window.location = "attch21.html";
		} else if (imgid == "attch22rs" || imgid == "attch22bs") {
			window.location = "attch22.html";
		} else if (imgid == "attch3" || imgid == "attch4") {
			window.location = 'psninfo.html';
		} else if (imgid == "attch51" || imgid == "attch52" || imgid == "attch53") {
			window.location = 'attch5.html';
		} else if (imgid == "attch71" || imgid == "attch72" || imgid == "attch73") {
			window.location = 'attch7.html';
		} else if (imgid == "attch81" || imgid == "attch82" || imgid == "attch83") {
			window.location = 'attch8.html';
		} else if (imgid == "attch141" || imgid == "attch142" || imgid == "attch143") {
			window.location = 'attch14.html';
		} else {
			window.location = 'applyinfo.html';
		}

	} else {
		alert("图片太大");
	}
}

function agreement(type) {
	var url = url_mgr + "api/userAgreement/" + type;

	$js.showLoadingBar();
	$service.call("UMService.post", {
		"url" : url,
		"callback" : "qryUserAgreeCallback()"
	}, true);
}

function agreementBack() {
	var data = $ctx.getJSONObject("data");
	$("#agree").html(data.agreement);
}

function querystatus() {
	var username = $ctx.getApp("username");
	if (!username) {
		window.location = "login.html";
		return;
	}
	window.location = 'myapplyli.html';
}
