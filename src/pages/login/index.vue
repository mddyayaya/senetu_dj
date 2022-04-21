<template>
	<div class="loginBg">
		<div class="loginWords" id="loginWords"><img src="../../assets/images/loginWords.png" ></div>
		<div class="loginWords2"></div>
		<div class="wave"></div>
		<div class="dh"></div>
		<div class="loginBox">
			<div class="loginRed">登录</div>
			<div class="loginInput">
				<img src="../../assets/images/loginIcon2.png" >
				<input type="text"  v-model="form.username" placeholder="请输入用户名"/>
			</div>
			<div class="loginInput loginInput2">
				<img src="../../assets/images/loginIcon.png" >
				<input :type="show_pwd?'text':'password'" v-model="form.pwd" placeholder="请输入密码"/>
				<i class="fa" :class="show_pwd?'fa-ellipsis-h':'fa-eye'" @click="show_pwd = !show_pwd" aria-hidden="true"></i>
			</div>
			<div class="submit">
				<button type="button" @click="login">立即登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui'
	export default{
		data(){
			return{
				form:{
					username:"",
					pwd:""
				},
				show_pwd:false,
			}
		},
		methods:{
			// 登录
			login(){
				var that = this;
				for(var key in that.form){
					if(that.form[key] == ""){
						Message({
							type:'warning',
							message:"账户或密码不能为空"
						})
						return false;
					}
				}
				that.$store.dispatch('login_sys',that.form)
			}
		},
		mounted() {
			var that = this;
			document.onkeydown = () => {
				if(window.event.keyCode == '13'){
					that.login()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loginBg{
		height: 100%;
		width: 100%;
		overflow: hidden;
		background: url(../../assets/images/login.png) no-repeat;
		background-size: 100% 100%;
		.loginWords{
			position: fixed;
			top: 22%;
			left: 13%;
			height: 33vh;
			width: 35vw;
			img{
				width: 100%;
			}
		}
		.loginWords2{
			position: fixed;
			top: 22%;
			margin-top: 33vh;
			left: 12.8%;
			height: 14vh;
			width: 35vw;
			background: url(../../assets/images/loginWords2.png) no-repeat;
			background-size: 100% 100%;
		}
		.wave{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 40vh;
			background: url(../../assets/images/wave.png) no-repeat;
			background-size: 100% 100%;
			animation: wave 6s infinite linear forwards;
			-webkit-animation:wave 6s infinite linear forwards;
			-moz-animation:wave 6s infinite linear forwards;
			-ms-animation:wave 6s infinite linear forwards;
		}
		.dh{
			position: fixed;
			bottom: 1%;
			width: 16vw;
			left: 50%;
			margin-left: -8vw;
			height: 13.5vw;
			background: url(../../assets/images/dh.png) no-repeat;
			background-size: 100% 100%;
			animation: wave 6s infinite linear forwards;
			-webkit-animation:wave 6s infinite linear forwards;
			-moz-animation:wave 6s infinite linear forwards;
			-ms-animation:wave 6s infinite linear forwards;
		}
		.loginBox{
			position: fixed;
			right: 12.5%;
			top: 24.5%;
			background: #fff;
			height: 42.3vh;
			width: 24.5vw;
			border-radius: 1.5vh;
		}
		.loginRed{
			height: 10vh;
			line-height: 10vh;
			width: 100%;
			text-align: center;
			font-size: 3vh;
			color: rgb(246,0,23);
			font-weight: 700;
		}
		.loginInput{
			position: relative;
			width: 69%;
			display: flex;
			justify-items: center;
			align-items: center;
			padding: 0 3%;
			height: 6vh;
			line-height: 6vh;
			margin: auto;
			border: 0.1vh solid #EEEEEE;
			margin-top: 1vw;
		}
		.loginInput img{
			width: 1.5vw;
		}
		.loginInput input{
			width: 14vw;
			font-size: 1.8vh;
			border: none;
			margin-left: 1vw;
		}
		.loginInput i{
			font-size: 2.2vh;
			cursor: pointer;
			opacity: 0.5;
		}
		.submit{
			width: 75%;
			margin:3vw auto;
			height: 5.5vh;
		}
		.submit button{
			height: 100%;
			width: 100%;
			border-radius: 3vh;
			background: rgb(246,0,23);
			border: none;
			color: #fff;
			font-size: 2.3vh;
			cursor: pointer;
		}
		.submit button:active{
			margin-top: 1px;
		}
		.box-shadow{
			box-shadow: 0px 0px 5px 1px rgb(246,0,23);
			animation: shadow 1s infinite linear forwards;
			-webkit-animation:shadow 1s infinite linear forwards;
			-moz-animation:shadow 1s infinite linear forwards;
			-ms-animation:shadow 1s infinite linear forwards;
		}
		.shake{
			-webkit-animation-name: shake;
			animation-name: shake;
			-webkit-animation-duration: 0.2s;
			animation-duration: 0.3s;
		}
		/* wave */
		@-ms-keyframes wave{
			0%{
				transform: translateY(0px);
			}
			50%{
				transform: translateY(10px);
			}
			100%{
				transform: translateY(0px);
			}
		}
		@-webkit-keyframes wave{
			0%{
				transform: translateY(0px);
			}
			50%{
				transform: translateY(10px);
			}
			100%{
				transform: translateY(0px);
			}
		}
		@keyframes wave{
			0%{
				transform: translateY(0px);
			}
			50%{
				transform: translateY(10px);
			}
			100%{
				transform: translateY(0px);
			}
		}
		@-moz-keyframes wave{
			0%{
				transform: translateY(0px);
			}
			50%{
				transform: translateY(10px);
			}
			100%{
				transform: translateY(0px);
			}
		}

		@-webkit-keyframes shake {
			from, to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			}
			10%, 30%, 50%, 70%, 90% {
				-webkit-transform: translate3d(-10px, 0, 0);
				transform: translate3d(-10px, 0, 0);
			}
			20%, 40%, 60%, 80% {
				-webkit-transform: translate3d(10px, 0, 0);
				transform: translate3d(10px, 0, 0);
			}
		}
		@keyframes shake {
			from, to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			}
			10%, 30%, 50%, 70%, 90% {
				-webkit-transform: translate3d(-10px, 0, 0);
				transform: translate3d(-10px, 0, 0);
			}
			20%, 40%, 60%, 80% {
				-webkit-transform: translate3d(10px, 0, 0);
				transform: translate3d(10px, 0, 0);
			}
		}
	}
</style>
