//JavaScript Framework 2.0 Code
try {
	Type.registerNamespace('com.keyimc.cloudloan.IndexController');
	com.keyimc.cloudloan.IndexController = function() {
		com.keyimc.cloudloan.IndexController.initializeBase(this);
		this.initialize();
	}
	function com$yonyou$IndexController$initialize() {

	}

	function com$yonyou$IndexController$evaljs(js) {
		eval(js)
	}

	function myCallBack(sender, args) {
		alert("args.result" + args.result);
		//通过post请求资源包的地址后根据args中的result对象，来获取服务器端返回的新版本信息
		var ret = $stringToJSON(args.result);
		alert("flag" + ret.flag);
		if (ret.flag) {
			//args.result对象中包含了所有关于新的应用资源包的版本号
			var tempversion = ret.versionno;
			//当前最新的资源包的版本号，即后台管理员上传上传发布资源包时指定的版本号
			var tempname = ret.explains;
			//资源包的url
			var tempurl = ret.url;
			alert(tempurl);
			$cache.write("zipid", tempversion);

			//根据服务器的返回的资源包的url，通过调用更新应用服务来获取服务器端返回的新版本资源包
			$service.call("UAPappStore.updateAPP", {
				url : tempurl, //资源包的url
				override : "true"//覆盖原先的老的资源，以达到应用内更新
			}, false);

		}

	}

	function onkeydown(sender, args) {
		var params = {
			"title" : "提示",
			"message" : "确定要退出吗",
			"okbuttontitle" : "确定",
			"cancelbuttontitle" : "取消",
			"style" : "ok-cancel",
			"okaction" : "ok()",
			"cancelaction" : "cancel()"
		};
		$view.openDialog(params);
	}

	function ok() {
		var username = $ctx.getApp("username");
		//清除缓存
		clearCache();
		var datajson = '{"username":"' + username + '"}';
		var url = url_mgr + "api/logout";
		$service.call("UMService.post", {
			"url" : url,
			"data" : JSON.parse(datajson),
			"callback" : "logOutCallback()"
		}, true);
		//关闭前做退出处理
		$view.close();
	}

	function cancel() {

	}

	function com$keyimc$cloudloan$IndexController$webcontrol0_onload(sender, args) {
		//var net = JSON.parse($net.getNetworkInfo());
		var net = "";
		if (net.Type == "Wifi11") {
			if (url_mgr) {
				var zipid = $cache.read("zipid");
				if (zipid == "" || zipid == null) {
					zipid = "0";
				}

				//通过post请求资源包的地址，来获取是否有新版本信息
				$service.post({
					"url" : url_mgr + "api/template/tempdetail",
					"data" : {
						tempid : zipid
					},
					"callback" : "myCallBack()"
				});
			}
		}
	}


	com.keyimc.cloudloan.IndexController.prototype = {
		webcontrol0_onload : com$keyimc$cloudloan$IndexController$webcontrol0_onload,
		initialize : com$yonyou$IndexController$initialize,
		evaljs : com$yonyou$IndexController$evaljs
	};
	com.keyimc.cloudloan.IndexController.registerClass('com.keyimc.cloudloan.IndexController', UMP.UI.Mvc.Controller);
} catch(e) {
	$e(e);
}
