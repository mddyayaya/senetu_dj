$(function(){
	$('.back').hide();
	window.gui=require("nw.gui");
	window.win = gui.Window.get();
	const AutoUpdater = require( "nw-autoupdater" ),
	updater = new AutoUpdater( require( "../package.json" ), {
		strategy: "ScriptSwap"
	}),
	output =  document.querySelector( "#output" );
	async function main(){
	try {
		const rManifest = await updater.readRemoteManifest();
		const needsUpdate = await updater.checkNewVersion( rManifest );
		if ( !needsUpdate ) { 
			window.location.href="index4.html";
			return;
		}
		//显现更新窗口
		$('#output').css('display','block');
		$('hr').css('diplay','block');
		if($('#output').css('display') == 'block' ) {
			$('video').css('display','none');
			//忽略
			$('.ignore').click(function(){
				window.location.href="index4.html";
				return;
			});
			//更新
			$('.update').click(function(){
				$('#output').css('display','none');
				$('hr').hide();
				$('.downloadProgress').css('display','block');
				$('.updateText').css('display','block');
				$('.updateBg').css('display','block');
			})
		}
		//订阅更新事件
		updater.on( "download", (downloadSize, totalSize ) => {
			$('.num').html(Math.floor( downloadSize / totalSize * 100 )+"%");
			$('.updateText').html("更新中...");
			var a = 15*Math.floor( downloadSize / totalSize * 100 )/100+"vw";
			$('.line').animate({
				width:a
			})
		});
		//订阅安装事件
		updater.on( "install", ( installFiles, totalFiles ) => {
			// output.innerHTML = `正在安装...\n`+Math.floor( installFiles / totalFiles * 100 )+"%";
			$('.updateText').html("安装中...")
			$('.num').html(Math.floor( installFiles / totalFiles * 100 )+"%")
			var a = 15*Math.floor( installFiles / totalFiles * 100 )/100+"vw";
			$('.line').animate({
				width:a
			})
		});
		const updateFile = await updater.download( rManifest );
		await updater.unpack( updateFile );
		await updater.restartToSwap();
		} catch ( e ) {
			console.error( e );
		}
	}
	main();
})