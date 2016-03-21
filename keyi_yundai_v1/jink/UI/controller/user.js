function getJsonStr(data) {
	if (CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceIOS) {
		return JSON.stringify(data);
	} else if (CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
		return data;
	}
}

function isIOS() {
	if (CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceIOS) {
		return true;
	}
	return false;
}

function loginCallback() {
	var result = $ctx.param("result");
	if (result) {
		$js.hideLoadingBar();
		var data = $stringToJSON(result);
		if ("success" == data.flag) {
			//清除缓存
			clearCache();
			var username = $ctx.get("username");
			var token = data.token;
			var adress = data.adress;
			$ctx.setApp({
				"username" : username,
				"token" : token,
				"adress" : adress
			})
			$ctx.setApp({
				"pageflag" : "-1"
			});
			var daikloupan = $ctx.getApp("daikloupan");
			if (daikloupan != null && daikloupan == "1") {
				$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/sfdindex.html");
				$ctx.setApp({
					"daikloupan" : ""
				})
			} else {
				$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/index.html");
			}
		} else {
			alert(data.msg);
		}
	} else {
		$js.hideLoadingBar();
		alert("网络异常，请重试");
	}
}

function filestatusCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if (data != null && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var key = data[i].filetypecode;
				var value = data[i].islosing;
				$cache.write(key, value);
			}
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/sfdapply.html");
		} else {
			alert(data.msg);
		}
	} else {
		alert("网络异常，请重试");
	}
}

function filestatusCallback2() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if (data != null && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var key = data[i].filetypecode;
				var value = data[i].islosing;
				$cache.write(key, value);
			}
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/sfdapply.html");
		} else {
			alert(data.msg);
		}
	} else {
		alert("网络异常，请重试");
	}
}

function setCardCallback() {
	var result = $ctx.param("result");
	if (result) {

	} else {
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "setCardCallback1()"//webControl的HTML页面中定义的全局js方法名
		})
	}

}

function getBankDataCallback() {
	var result = $ctx.param("result");
	if (result) {
		$ctx.setApp({
			"bankdata" : result
		});
		$ctx.put("data", result);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "setDiv()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function queryloadCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryloadBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function addcardCallback() {
	var result = $ctx.param("result");
	if (result) {
		var isios = isIOS();
		var data;
		if (isios) {
			data = result;
		} else {
			data = JSON.parse(result);
		}
		if (data.flag == 'success') {
			alert("添加成功！");
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "addcardCallback1()"//webControl的HTML页面中定义的全局js方法名
			})
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/bankcard.html");
		} else {
			alert("添加失败！");
		}
	} else {
		$alert("网络异常，请重试");
	}
}

function queryloadCallback1() {
	var data = $ctx.param("result");
	if (data) {
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryloadBack1()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function savePsnActionCallback() {
	var data = $ctx.param("result");
	//alert("data00000" + data);
	//var data1 = $stringToJSON(data);
	//alert("data1" + data1);
	//	alert("data1.adress===  " + data1.adress);
	if (data) {
		//	$ctx.setApp({
		//	"useradress" : data1.adress
		//})
		alert("保存成功！");
	} else {
		$alert("网络异常，请重试");
	}
}

function registerCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if (data.result == 1) {
			$js.hideLoadingBar();
			var username = data.username;
			var token = data.token;
			var adress = data.adress;
			//清除缓存
			clearCache();
			$ctx.setApp({
				"username" : username,
				"token" : token,
				"adress" : adress
			})
			$ctx.setApp({
				"pageflag" : "-1"
			});
			alert("成功");
			$ctx.setApp({
				"codeflag" : ""
			});
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/index.html");
		} else {
			$js.hideLoadingBar();
			alert(data.reason);
		}
	} else {
		$js.hideLoadingBar();
		$alert("网络异常，请重试");
	}
}

//密碼修改
function changePwdCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if (data.result == 1) {
			$js.hideLoadingBar();
			alert("密码修改成功");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/login.html");
		} else {
			$js.hideLoadingBar();
			alert(data.reason);
		}
	} else {
		$js.hideLoadingBar();
		$alert("网络异常，请重试");
	}
}

function loadApplyCallback1() {
	var data = $ctx.param("result");
	$js.hideLoadingBar();
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryload1()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadApplyCallback2() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryload2()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadApplyCallback3() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryload3()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadApplyCallback4() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "queryload4()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadApplyCallback5() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadpercentage()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function applyCallback() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		var data = $stringToJSON(result);
		if (data.result == 1) {
			alert("资料提交成功");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/index.html");
		} else if (data.result == 2) {
			alert("请先绑定银行卡！");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/bankcard.html");
		} else {
			alert(data.reason);
		}
	} else {
		$alert("网络异常，请重试");
	}
}

function addcontCallback() {
	var data = $ctx.param("result");
	$js.hideLoadingBar();
	if (data) {
		data = getJsonStr(data);
		$ctx.setApp({
			"data" : data
		});
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "addcontBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

/**
 *用戶協議
 */
function qryUserAgreeCallback() {
	var data = $ctx.param("result");
	$js.hideLoadingBar();
	if (data) {
		var data2 = getJsonStr(data)
		$ctx.put("data", data2);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "agreementBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

/**
 *用户额度查询
 */
function getQueryCallQuota() {
	var data = $ctx.param("result");
	$js.hideLoadingBar();
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "qrtQuotaBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function signcontCallback() {
	var data = $ctx.param("result");
	if (data) {
		if (data == "0") {
			alert("签订成功");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/qryhuanking.html");
		} else {
			alert($ctx.getString("parameter"));
		}
	} else {
		$alert("网络异常，请重试");
	}
}

function updpwdCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if ("success" == data.flag) {
			alert("提交成功！");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/login.html");
		} else {
			alert(data.msg);
		}
	} else {
		$alert("网络异常，请重试");
	}
}

function telChangeCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "telChangeBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function telChangePwdCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "telChangePwdBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function sendTelCodeCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		var msgs = data.split("&");
		var results = msgs[0].split("=");
		var messages = msgs[1].split("=");

		if (results[1] == 0) {
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "sendTelSuccessBack()"//webControl的HTML页面中定义的全局js方法名
			})
		} else {
			alert(messages[1]);
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "sendTelCodeBack()"//webControl的HTML页面中定义的全局js方法名
			})
		}
	} else {
		$alert("网络异常，请重试");
	}

}

function verifyTelCodeCallback() {
	var result = $ctx.param("result");
	if (result) {
		var data = $stringToJSON(result);
		if (data.register == "register_true") {
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "verifyTelCodeBack()"//webControl的HTML页面中定义的全局js方法名
			})
		} else if (data.chgpwd == "chgpwd_true") {
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "verifyTelCodePwdBack()"//webControl的HTML页面中定义的全局js方法名
			})
		} else if (data.addCard == "addCard_true") {
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "addcardinfo()"//webControl的HTML页面中定义的全局js方法名
			})
		} else {
			$js.hideLoadingBar();
			alert("请输入正确的验证码");
		}
	} else {
		$js.hideLoadingBar();
		$alert("网络异常，请重试");
	}
}

function loadDevelopCallback() {
	var data2 = $ctx.param("result");
	if (data2) {
		$ctx.put("data2", data2);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadDevelopBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadRepayCallback() {
	var data3 = $ctx.param("result");
	if (data3) {
		$ctx.put("data3", data3);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadRepayMentBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function loadHouseCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadHouseBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function saveInfoCallback() {
	var data = $ctx.param("result");
	$js.hideLoadingBar();
	if (data) {
		data = getJsonStr(data);
		$ctx.setApp({
			"data" : data
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "saveInfoBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function querydkinfoCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "querydkinfoBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function qryConInfoCallback() {
	var result = $ctx.param("result");
	if (result) {
		//$ctx.put("data1", data.continfo);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "qryConInfoBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function qryConPlanCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data2", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "qryConPlanBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function logOutCallback() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "logOutBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function qryConPlanCallback2() {
	var data = $ctx.param("result");
	if (data) {
		$ctx.put("data3", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "qryConPlanBack2()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$alert("网络异常，请重试");
	}
}

function cameraCallback() {
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "cameraBack()"//webControl的HTML页面中定义的全局js方法名
	})
}

function cameraCallbackr1() {
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "cameraBackr1()"//webControl的HTML页面中定义的全局js方法名
	})
}

function cameraCallbackb1() {
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "cameraBackb1()"//webControl的HTML页面中定义的全局js方法名
	})
}

function uploadImageCallback() {
	$js.hideLoadingBar();
	var res = $ctx.getJSONObject("res");
	$ctx.setApp({
		"res" : res
	})
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "uploadImageBack()"//webControl的HTML页面中定义的全局js方法名
	})
}

function uploadImageCallback1() {
	$js.hideLoadingBar();
	var res = $ctx.getJSONObject("res");
	$ctx.setApp({
		"res" : res
	})
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "uploadImageBack1()"//webControl的HTML页面中定义的全局js方法名
	})
}

function uploadImageBCallback1() {
	$js.hideLoadingBar();
	var res = $ctx.getJSONObject("res");
	res = getJsonStr(res);
	$ctx.setApp({
		"res" : res
	})
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "uploadImageBBack1()"//webControl的HTML页面中定义的全局js方法名
	})
}

function getQueryProject() {
	var data = $ctx.param("result");
	if (data) {
		data = getJsonStr(data);
		$ctx.setApp({
			"projectdata" : data
		});
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "backqueryproject()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$js.hideLoadingBar();
		$alert("网络异常，请重试");
	}
}

function getQueryProInfo() {
	var data = $ctx.param("result");
	if (data) {
		data = getJsonStr(data);
		$ctx.put("proinfodata", data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "backqueryproInfo()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$js.hideLoadingBar();
		$alert("网络异常，请重试");
	}
}

//签订合同的时候登录回调
function signContLoginCallback() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		var data = $stringToJSON(result);
		if ("success" == data.flag) {
			var username = $ctx.getApp("username");
			var token = data.token;
			var adress = data.adress;
			$ctx.setApp({
				"username" : username,
				"token" : token,
				"adress" : adress
			})
			$js.runjs({
				"controlid" : "webcontrol0", //webControl的id
				"func" : "signContLoginBack()"//webControl的HTML页面中定义的全局js方法名
			})
		} else {
			alert(data.msg);
		}
	} else {
		alert("网络异常，请重试");
	}
}

//获取p10回调方法
function generateP10Callback() {
	var param = $ctx.getJSONObject("parameter");
	var result = param.result;
	if (result) {
		$ctx.put("p10Data", param.p10Data);
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "generateP10Back()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		$js.hideLoadingBar();
		alert(param.message);
	}
}

//请求秘钥回调方法
function RAPublicKeyCallback() {
	var result = $ctx.param("result");
	if (result) {
		result = getJsonStr(result);
		var data = $stringToJSON(result);
		if (data.status == "200") {
			var publickey = data.show_data.publicKey;
			//导入证书
			alert("导入证书");
			$service.call("CFCAService.importCertificate", {
				publicKey : publickey,
				callback : "importCertificateCallback()"
			}, true)
		} else {
			$js.hideLoadingBar();
			alert(data.message);
		}
	} else {
		$js.hideLoadingBar();
		alert("网络异常，请重试");
	}
}

//导入证书回调
function importCertificateCallback() {
	var param = $ctx.getJSONObject("parameter");
	if (param.result) {
		//对签名数据
		alert("数据签名");
		var show_data = $ctx.getJSONObject("show_data");
		show_data.password = $ctx.get("pwd");
		$service.call("CFCAService.signData", {
			unsignData : show_data,
			callback : "signDataCallback()"
		}, true)
	} else {
		$js.hideLoadingBar();
		alert(param.message);
	}
}

//数据签名回调
function signDataCallback() {
	var param = $ctx.getJSONObject("parameter");
	if (param.result) {
		var signedData = param.signedData;
		$ctx.put("signedData", signedData);
		alert("提交签名数据");
		//发送签名数据
		var jsondata = '{"signCode":"' + signedData + '"}';

		var url = url_mgr + "SignContract";
		$service.call("UMService.post", {
			"url" : url,
			"data" : JSON.parse(jsondata),
			"callback" : "SignContractCallback()"
		}, true);
	} else {
		$js.hideLoadingBar();
		alert(param.message);
	}
}

//签订合同回到方法
function SignContractCallback() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		result = getJsonStr(result);
		var data = $stringToJSON(result);
		if (data.status == "200") {
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/qryhuanking.html");
		} else {
			alert(data.message);
		}
	} else {
		alert("网络异常，请重试");
	}
}

function bindCardCallback() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		if (result == "0") {
			alert("绑定成功");
			$id("webcontrol0").setAttribute("url", "#{element.assetpath}/webcontrol/context/index.html");
		} else {
			alert("绑定失败");
		}
	} else {
		alert("网络异常，请重试");
	}
}

function loadIdInfoCallback() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		$ctx.setApp({
			"data" : result
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadIdInfoBack()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		alert("网络异常，请重试");
	}
}

function loadIdInfoCallback2() {
	var result = $ctx.param("result");
	$js.hideLoadingBar();
	if (result) {
		$ctx.setApp({
			"data" : result
		})
		$js.runjs({
			"controlid" : "webcontrol0", //webControl的id
			"func" : "loadIdInfoBack2()"//webControl的HTML页面中定义的全局js方法名
		})
	} else {
		alert("网络异常，请重试");
	}
}

function qryPhoneCallBack() {
	$js.runjs({
		"controlid" : "webcontrol0", //webControl的id
		"func" : "qrybookBack()"//webControl的HTML页面中定义的全局js方法名
	})
}

function deleteImageCallback() {
	$js.hideLoadingBar();
	var data = $ctx.param("result");
	if (data) {
		$ctx.setApp({
			"attachs" : data
		})
	}
}
