<!-- 用户注册页面 -->

<template>
	<view class="box">
		<image src="../../../static/login/register.png" mode='aspectFit' class="logo"></image>
		<view class="title">LOGO区域</view>
		<view class="form">
			<input class="input" placeholder-class placeholder="请输入用户名" />
			<input class="input" placeholder-class password placeholder="请输入密码"/>
			<input class="input" placeholder-class password placeholder="请再输入一次密码"/>
			<button class="btn">立即注册</button>
			<navigator url="../login/index" open-type='navigateBack' hover-class="none" class="label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.box{
		padding: 0 100rpx;
		position: relative;
	}
	.logo{
		width: 100%;
		width: 100%;
		height: 310rpx;
	}
	.title{
		position: absolute;
		top: 0;
		line-height: 360rpx;
		font-size: 68rpx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100rpx;
	}
	.form{
		margin-top: 300rpx;
	}
	.input{
		background: #e2f5fc;
		margin-top: 30rpx;
		border-radius: 100rpx;
		padding: 20rpx 40rpx;
		font-size: 36rpx;
		height: 100rpx;
	}
	.input-placeholder, .input{
		color: #94afce;
	}
	.label{
		padding: 60rpx 0;
		text-align: center;
		font-size: 30rpx;
		color: #a7b6d0;
	}
	.btn{
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100rpx;
		font-size: 36rpx;
		margin-top: 60rpx;
	}
	.btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.btn.button-hover{
		transform: translate(1rpx, 1rpx);
	}
</style>
