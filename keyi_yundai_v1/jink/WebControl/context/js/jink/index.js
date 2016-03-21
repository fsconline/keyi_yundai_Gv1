var page = 0;
var page2 = 1;
var ispage = true;
var data_list = new Array();
var data_index = 0;
function onload2(id, id2) {
	location.reload();
	$ctx.setApp({
		"pageflag" : "0"
	});
	if (id == "wode") {
		//没有登录的情况下，直接跳转到登录页
		var username = $ctx.getApp("username");
		if (!username) {
			window.location = "login.html";
			return;
		}
	}
	if (id == "index") {
		ispage = true;
	}

	if (id == "loupan") {
		ispage = false;
	}
	var next3 = document.getElementById(id2);
	next3.href = '#' + id;
	next3.setAttribute("onclick", '');
	next3.click("return false");
	var loginame = $ctx.get("username");
	document.getElementById("loginame").innerHTML = loginame;
}

window.onload = function() {
	setTimeout(queryproject, 500);
}
function queryproject() {
	var pageflag = $ctx.getApp("pageflag");
	if (pageflag != "0") {
		var currentpage = document.getElementById("next1");
		currentpage.href = '#index';
		currentpage.setAttribute("onclick", '');
		currentpage.click("return false");
	}
	$js.showLoadingBar();
	var datajson;
	if (ispage) {
		page = page + 1;
		datajson = '{"page":"' + page + '"}';
	} else {
		page2 = page2 + 1;
		datajson = '{"page":"' + page2 + '"}';
	}
	var url = url_mgr + "api/loadproject";

	$service.call("UMService.post", {
		"url" : url,
		"data" : JSON.parse(datajson),
		"callback" : "getQueryProject()"
	}, true);

}

var ViewModel = function() {
};
var viewModel;
var viewModel2;
function backqueryproject() {
	var projectdata = $ctx.getApp("projectdata");
	var list = JSON.parse(projectdata);
	var myArray = new Array();
	if (list != null && list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			var data = list[i];
			var jsonarray = {};
			jsonarray.img = url_mgr + "file_down?filePath=" + data.homepage;
			jsonarray.title = data.projectname;
			jsonarray.detail = data.address;
			jsonarray.comments = data.amount;
			myArray[i] = jsonarray;
			var filepathmap = {};
			filepathmap.id = data.id;
			filepathmap.filepath = data.filepath;
			data_list[data_index] = filepathmap;
			data_index = data_index + 1;
			if (page > 1 && ispage) {
				viewModel.data.push(jsonarray);
			} else if (page2 > 1 && !ispage) {
				viewModel2.data.push(jsonarray);
			}
		}
	}
	$js.hideLoadingBar();

	if (page == 1 && page2 == 1) {
		viewModel = new ViewModel();
		viewModel.data = ko.observableArray(myArray);
		ko.applyBindings(viewModel, document.getElementById('listview'));
	}

	//构造控件实例
	var listview = UM.listview("#listview");
	//添加控件方法
	listview.on("pullUp", function(sender) {
		//这是可以编写列表上拉刷新逻辑，参数sender即为当前列表实例对象
		ispage = true;
		queryproject();
		setTimeout(800);
		sender.refresh();
	});
	listview.on("itemDelete", function(sender, args) {
		//这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
	});
	listview.on("itemClick", function(sender, args) {
		var rowdata = data_list[args.rowIndex];
		$ctx.setApp({
			"loupanid" : rowdata.id
		})
		window.location = "loupaninfo.html";
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert("您点击了列表的第" + (args.rowIndex + 1) +　"行！");
	});
	listview.on("itemSwipeLeft", function(sender, args) {
		//这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//sender.showItemMenu(args.$target);
	});
	listview.on("tapHold", function() {
		//这里可以处理长按事件
		//console.log("您长按了列表！");
	});
	if (page == 1 && page2 == 1) {
		viewModel2 = new ViewModel();
		viewModel2.data = ko.observableArray(myArray);
		ko.applyBindings(viewModel2, document.getElementById('listview2'));
	}
	//构造控件实例
	var listview2 = UM.listview("#listview2");
	//添加控件方法
	listview2.on("pullUp", function(sender) {
		ispage = false;
		queryproject();
		setTimeout(800);
		sender.refresh();
	});
	listview2.on("itemDelete", function(sender, args) {
		//这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
	});
	listview2.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert("您点击了列表的第" + (args.rowIndex + 1) +　"行！");
		var rowdata = data_list[args.rowIndex];
		$ctx.setApp({
			"loupanid" : rowdata.id
		})
		window.location = "loupaninfo.html";
	});
	listview2.on("itemSwipeLeft", function(sender, args) {
		//这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//sender.showItemMenu(args.$target);
	});
	listview2.on("tapHold", function() {
		//这里可以处理长按事件
		//console.log("您长按了列表！");
	});

	//查询可用额度，已用额度和本月应还
	var loginame = $ctx.getApp("username");
	if (loginame) {
		var url = url_mgr + "api/qryQuota/" + loginame;
		$service.call("UMService.post", {
			"url" : url,
			"callback" : "getQueryCallQuota()"
		}, true);
	}
}

//额度回调
function qrtQuotaBack() {
	var datavar = $ctx.get("data");
	var data = JSON.parse(datavar);
	if (data != null && data.creditAmount) {
		document.getElementById("creditAmount").innerHTML = data.creditAmount;
	} else {
		document.getElementById("creditAmount").innerHTML = 0;
	}
	if (data.useAmount) {
		document.getElementById("useAmount").innerHTML = data.useAmount;
	} else {
		document.getElementById("useAmount").innerHTML = 0;
	}
	if (data.shouldAmount) {
		document.getElementById("shouldAmount").innerHTML = data.shouldAmount;
	} else {
		document.getElementById("shouldAmount").innerHTML = 0;
	}

}
