document.writeln("<div class=\'topNavBar\'></div>");
document.writeln("		<div class=\'topBarLeft\'></div>");
document.writeln("		<div class=\'nav\'>");
document.writeln("			<div class=\'navFixed\'>");
document.writeln("				<div class=\'topNavLeft topNavBar1\'>");
document.writeln("					<div class=\'topNavItem topNavselect\'><a href=\'app.html\'>学习资源</a></div>");
document.writeln("					<div class=\'topNavItem\'><a href=\'dyjy.html\'>专题培训</a></div>");
document.writeln("					<div class=\'topNavItem\'><a href=\'hsqj.html\'>红色全景</a></div>");
document.writeln("					<div class=\'topNavItem\'><a href=\'rdsc.html\'>入党誓词</a></div>");
document.writeln("				</div>");


document.writeln("				<div class=\'topNavRight\'>");
document.writeln("					<div style=\'flex:1\'></div>");
document.writeln("					<div class=\'mess\'>");
document.writeln("						<img src=\'statics/images/message.png\' >");
document.writeln("						<p class=\'messlength\'>0</p>");
document.writeln("					</div>");
document.writeln("					<div class=\'user\'>");
document.writeln("						<img src=\'statics/images/user_icon.png\' >");
document.writeln("						<p class=\'userName\'></p>");
document.writeln("						<p class=\'showList\'></p>");
document.writeln("					</div>");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("		</div>");
// 修改密码
document.writeln("		<!-- 修改密码 -->");
document.writeln("		<div class=\'updatePwd\'>");
document.writeln("			<div class=\'updatePwdBox\'>");
document.writeln("				<div class=\'flagTit\' style=\'margin-top: 5vh;\'>");
document.writeln("					<div class=\'flagTitIcon\' style=\'margin-left: 9vw;\'>修改密码</div>");
document.writeln("				</div>");
document.writeln("				<div class=\'updateForm\'>");
document.writeln("					<div class=\'oldPwd\'>");
document.writeln("						<label>原密码</label>");
document.writeln("						<input type=\'password\' id=\'oldPwd\' name=\'\' value=\'\' />");
document.writeln("					</div>");
document.writeln("					<div class=\'oldPwd\'>");
document.writeln("						<label>新密码</label>");
document.writeln("						<input type=\'password\' id=\'newPwd\' name=\'\' value=\'\' />");
document.writeln("					</div>");
document.writeln("					<div class=\'oldPwd\'>");
document.writeln("						<label>确认密码</label>");
document.writeln("						<input type=\'password\' id=\'surenewPwd\' name=\'\' value=\'\' />");
document.writeln("					</div>");
document.writeln("					<div class=\'oldPwd\'>");
document.writeln("						<div class=\'sureUpdate\'>确认修改</div>");
document.writeln("						<div class=\'cancelUpdate\'>取消</div>");
document.writeln("					</div>");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("		</div>");
// 消息
document.writeln("		<div class=\'mark\'></div>");
document.writeln("		<div class=\'messMark messMark1\'>");
document.writeln("			<div class=\'closeMess\'>");
document.writeln("				<span>消息</span>");
document.writeln("				<span><i class=\'fa fa-times\' aria-hidden=\'true\'></i></span>");
document.writeln("			</div>");
document.writeln("			<!-- 状态 -->");
document.writeln("			<div class=\'messStatus\'>");
document.writeln("				<p class=\'allmess messSelect\'>全部</p>");
document.writeln("				<p class=\'notread\'>未读</p>");
document.writeln("				<p class=\'isread\'>已读</p>");
document.writeln("			</div>");
document.writeln("			<!-- 消息列表 -->");
document.writeln("			<div class=\'messList\'>");
document.writeln("				<!-- 此处循环 -->");
document.writeln("			</div>");
document.writeln("		</div>");


document.writeln("		<div class=\'messMark messMark2\'>");
document.writeln("			<div class=\'backMess\'></div>");
document.writeln("			<div class=\'subMess\'>");
document.writeln("				<div class=\'subMessTit\'>学习习近平总书记在十九届六中全会上的重要讲话的活动通知</div>");
document.writeln("				<div class=\'subMessSubTit\'>");
document.writeln("					<span>发布党组织：<span class=\'pubZz\'></span></span>");
document.writeln("					<span>发布时间：<span class=\'pubtime\'>2020/12/24</span></span>");
document.writeln("				</div>");
document.writeln("				<div class=\'subMessCont\'>");
document.writeln("					<div class=\'study\'>");
document.writeln("						<div class=\'attendDy\'></div>");
document.writeln("					</div>");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("		</div>");
if(user != ""){
	if(user.flag == 4){
		$('.user .userName').text(user.u_name)
		$('.user .userName').attr('title',user.u_name)
	}else if(user.flag == 3){
		$('.user .userName').text(user.dw)
		$('.user .userName').attr('title',user.dw)
	}else if(user.flag == 1 || user.flag == 2){
		$('.user .userName').text(user.dw)
		$('.user .userName').attr('title',user.dw)
	}
	$('.link').hide();
	$('.link1').hide();
	$('.topNavBar1').show();
	$('.topNavBar2').hide();
	$('.topNavBar3').hide();
}
function golink(){
	if(user.dwid == 333){
		window.location.href='link.html';
	}else if(user.dwid == 385){
		window.location.href='link1.html';
	}
}
function gozfzl(){
	if(user.dwid == 431){
		window.location.href='link2.html';
	}
}
// 消息列表
messList();
function messList(classs){
	postData("information",{user_id:user.id,flag:user.flag},function(res){
		var html = '';
		var isread = [],noread = [];
		if(res.code == 200){
			$('.messlength').text(res.nocat);
			if(res.data != null){
				if(res.data.length > 0){
					for(var i=0;i<res.data.length;i++){
						res.data[i].iscat == "1"?res.data[i].iscat="已读":res.data[i].iscat="未读"
						res.data[i].addtime = toNumber(res.data[i].addtime)
						res.data[i].dw == "" || res.data[i].dw == null?res.data[i].dw="未知":res.data[i].dw = res.data[i].dw
						res.data[i].classs == 1?res.data[i].classs="通知公告":res.data[i].classs == 2?res.data[i].classs="任务汇报":res.data[i].classs == 3?res.data[i].classs="活动通知":res.data[i].classs ='消息'
						html +='<div class="messItem" iscat="'+res.data[i].id+'" id="'+res.data[i].hyid+'" tid="'+res.data[i].tid+'" flag="'+res.data[i].hyflag+'" classs="'+res.data[i].classs+'" onclick="showMessdetial(this)">'+
									'<div class="messItemLeft">'+
										'<div class="messTit">'+res.data[i].classs+'</div>'+
										'<div class="messTime">'+res.data[i].addtime+'</div>'+
									'</div>'+
									'<div class="messItemRight">'+
										'<div class="messCont">'+
											'<div class="messContItem">'+res.data[i].title+'</div>'+
											'<div class="messContStatus">'+res.data[i].iscat+'</div>'+
										'</div>'+
										'<div class="messPub">发布党组织：'+res.data[i].dw+'</div>'+
									'</div>'+
								'</div>'
					}
					$('.messList').html(html);
					$('.allmess').addClass('messSelect').siblings().removeClass('messSelect')
				}else{
					$('.messList').html('<div class=\'null\'>暂无消息</div>');
				}
				// 全部
				$('.allmess').click(function(){
					$('.messList').html("");
					var html1 = '';
					$(this).addClass('messSelect').siblings().removeClass('messSelect')
					if(res.data.length > 0){
						for(var i=0;i<res.data.length;i++){
							html1 +='<div class="messItem" iscat="'+res.data[i].id+'" id="'+res.data[i].hyid+'" tid="'+res.data[i].tid+'" flag="'+res.data[i].flag+'" classs="'+res.data[i].classs+'" onclick="showMessdetial(this)">'+
										'<div class="messItemLeft">'+
											'<div class="messTit">'+res.data[i].classs+'</div>'+
											'<div class="messTime">'+res.data[i].addtime+'</div>'+
										'</div>'+
										'<div class="messItemRight">'+
											'<div class="messCont">'+
												'<div class="messContItem">'+res.data[i].title+'</div>'+
												'<div class="messContStatus">'+res.data[i].iscat+'</div>'+
											'</div>'+
											'<div class="messPub">发布党组织：'+res.data[i].dw+'</div>'+
										'</div>'+
									'</div>'
						}
						$('.messList').html(html1);
					}else{
						$('.messList').html('<div class=\'null\'>暂无消息</div>');
					}
				})
				// 已读
				$('.isread').click(function(){
					$('.messList').html('');
					var html1 = '',isread = [];
					$(this).addClass('messSelect').siblings().removeClass('messSelect')
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].iscat == "已读"){
							isread.push(res.data[i])
						}
					}
					if(isread.length > 0){
						for(var i=0;i<isread.length;i++){
								html1 +='<div class="messItem" iscat="'+isread[i].id+'" flag="'+isread[i].flag+'" id="'+isread[i].hyid+'" classs="'+isread[i].classs+'" onclick="showMessdetial(this)">'+
											'<div class="messItemLeft">'+
												'<div class="messTit">'+isread[i].classs+'</div>'+
												'<div class="messTime">'+isread[i].addtime+'</div>'+
											'</div>'+
											'<div class="messItemRight">'+
												'<div class="messCont">'+
													'<div class="messContItem">'+isread[i].title+'</div>'+
													'<div class="messContStatus">'+isread[i].iscat+'</div>'+
												'</div>'+
												'<div class="messPub">发布党组织：'+isread[i].dw+'</div>'+
											'</div>'+
										'</div>'
						}
						$('.messList').html(html1);
					}else{
						$('.messList').html('<div class=\'null\'>暂无消息</div>');
					}
				})
				// 未读
				$('.notread').click(function(){
					$('.messList').html("");
					$(this).addClass('messSelect').siblings().removeClass('messSelect')
					var html1 = '',notread = [];
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].iscat == "未读"){
							notread.push(res.data[i])
						}
					}
					console.log(notread)
					if(notread.length > 0){
						for(var i=0;i<notread.length;i++){
								html1 +='<div class="messItem" iscat="'+notread[i].id+'" id="'+notread[i].hyid+'" flag="'+notread[i].flag+'" classs="'+notread[i].classs+'" onclick="showMessdetial(this)">'+
											'<div class="messItemLeft">'+
												'<div class="messTit">'+notread[i].classs+'</div>'+
												'<div class="messTime">'+notread[i].addtime+'</div>'+
											'</div>'+
											'<div class="messItemRight">'+
												'<div class="messCont">'+
													'<div class="messContItem">'+notread[i].title+'</div>'+
													'<div class="messContStatus">'+notread[i].iscat+'</div>'+
												'</div>'+
												'<div class="messPub">发布党组织：'+notread[i].dw+'</div>'+
											'</div>'+
										'</div>'
						}
						$('.messList').html(html1);
					}else{
						$('.messList').html('<div class=\'null\'>暂无消息</div>');
					}
				})
			}
		}

	})
}
$('.closeMess').click(function(){
	$('.mark').hide()
	$('.messMark1').animate({
		right:"-38vw"
	},200)
})
$('.mess').click(function(){
	$('.mark').show();
	$('.messMark1').animate({
		right:"0vw"
	},200)
});
$('.backMess').click(function(){
	messList();
	$('.messMark2').animate({
		right:"-38vw"
	},200)
});
$('.mark').click(function(){
	$('.mark').hide();
	$('.messMark').animate({
		right:"-38vw"
	},200)
})
// 消息详情
function showMessdetial(obj){
	var tid = $(obj).attr("tid");
	var iscat = $(obj).attr("iscat");
	$('.messMark2').animate({
		right:"0vw"
	},200)
	// 活动通知
	postData("noticeDetail",{
		id:tid
	},function(res){
		if(res.code == 200){
			$('.subMessTit').text(res.data.title);
			$('.pubtime').text(toNumber(res.data.addtime));
			$('.pubZz').text(user.dw);
			if(res.data.content!=null){
				$('.attendDy').html(res.data.content);
			}else{
				$('.attendDy').html("暂无数据");
			}
		}
	})
	postData("informationCat",{id:iscat},function(res){
		if(res.code == 200){
			
		}
		
	})
}
// 推出弹框
document.writeln("		<div class=\'exitBox\'>");
document.writeln("			<div class=\'exitItem person\'><img src=\'statics\/images\/grzx.png' />个人中心</div>");
document.writeln("			<div class=\'exitItem updatePwdBtn\'><img src=\'statics\/images\/xgmm.png' />修改密码</div>");
document.writeln("			<div class=\'exitItem exitLogin\'><img src=\'statics\/images\/exitLogin.png' />退出登录</div>");
document.writeln("		</div>");
if(user.flag == 4){
	$('.person').show();
	$('.admin').hide()
}else if(user.flag == 3 || user.flag == 1){
	$('.person').hide();
	$('.admin').show()
}
// 个人中心
$('.person').click(function(){
	window.location.href = 'info.html'
})
$('.user').click(function(){
	if($('.exitBox').css('display') == "none"){
		$('.exitBox').show();
		$('.updatePwdBtn').click(function(){
			$('.updatePwd').css('visibility','visible');
			$('.exitBox').css('display','none')
		})
	}else{
		$('.exitBox').css('display','none')
	}
})
// 修改密码
layui.use('layer',function(){
	var layer = layui.layer;
})
// 确认修改密码
$('.sureUpdate').click(function(event){
	if($('#oldPwd').val() == ""){
		layer.msg("请输入原密码",{anim:6,time:600})
	}else if($('#newPwd').val() == ""){
		layer.msg("请输入新密码",{anim:6,time:600})
	}else if($('#surenewPwd').val() == ""){
		layer.msg("请确认新密码",{anim:6,time:600})
	}else{
		if($('#surenewPwd').val() != $('#newPwd').val()){
			layer.msg("两次密码输入不一致，请重新输入",{anim:6,time:600})
		}else{
			postData("updatePwd",{
				user_id:user.id,
				flag:user.flag,
				old_pwd:$('#oldPwd').val(),
				new_pwd:$('#newPwd').val()
			},function(res){
				if(res.code == 200){
					layer.msg("修改成功",{anim:6,time:600},function(){
						sessionStorage.removeItem("userInfo");
						window.location.href = 'login.html';
					})
				}else{
					layer.msg(res.msg,{anim:6,time:600})
				}
			})
		}
	}
})
$('.cancelUpdate').click(function(event){
	$('.updatePwd').css('visibility','hidden');
})
$('.updatePwdBox').click(function(event){
	event.stopPropagation();
})
$('.exitLogin').click(function(){
	window.location.href = 'login.html';
	$.cookie('userInfo',"null",-1);
})
// 党建宣传页面
function goDjxc(){
	if(user.flag == 4){
		window.location.href='dyxc.html';
	}else{
		window.location.href='zbxc.html';
	}
} 

document.writeln("<div style=\'z-index: 1000;display:none;width: 100%;height: 100%;background: rgba(0,0,0,.5);position: fixed;top: 0;left: 0;\' class=\'markZzjg\'><img src=\'statics\/images\/zzjg.png' style=\'width: 80%;height: 90%;margin-left:10%;margin-top: 3%;\'/></div>");
// 打开组织架构
function openJiagou(){
	$('.markZzjg').show();
}
$('.markZzjg img').click(function(){
	window.event.stopPropagation()
})
$('.markZzjg').click(function(){
	$(this).hide();
})