<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../static/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="handleGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// // 是否授权
			// hasUserInfo:false,
			// 用户个人信息
			userInfo:{},
			param:{
				// 临时登录凭证
				code:"",
				// 用户非敏感信息
				rawData:"",
				// 签名
				signature:"",
				// 用户敏感信息
				// encrypteData:"",
				// 解密算法的向量
				iv:""
			}
		}
	},
	// 页面加载时使用用户授权逻辑 弹出授权提示框
	onLoad() {
		// this.userAuthorized();
	},
	methods:{
		handleGetUserInfo() {
			let _this = this;
			// 调用 uni.login 获取 code
			uni.login({
				provider:'weixin',
				success(login_res) {
					// console.log(login_res);

					// 登录成功 调用 uni.getUserInfo 获取用户信息
					uni.getUserInfo({
						success(userinfo_res) {
							// console.log(userinfo_res);
							// 获取用户信息成功 调用 uni.request 向开发者服务器发送code
							_this.userInfo = userinfo_res.userInfo;
							_this.param.code = login_res.code;
							_this.param.rawData = userinfo_res.rawData;
							_this.param.signature = userinfo_res.signature;
							// _this.param.encrypteData = userinfo_res.encrypteData;
							_this.param.iv = userinfo_res.iv;
							uni.request({
								url:_this.baseUrl + "/user/login",
								method:"POST",
								data:_this.param,
								success(res) {
									console.log(res);
									if (res.data.code === 200) {
										// 登陆成功
										
										// 存储用户个人信息
										// getApp().globalData.userInfo=userinfo_res.userInfo;
										uni.setStorageSync('userInfo', userinfo_res.userInfo);
										// getApp().globalData.skey=res.data.data.skey;
										// 存储用户openid
										uni.setStorageSync('openid', res.data.data.openid);
										// 存储与服务器的会话key
										// getApp().globalData.hasLogin=true;
										uni.setStorageSync('skey', res.data.data.skey);
										uni.showToast({
											title:"登陆成功"
										});
										// 导航到首页
										uni.switchTab({
											url:"/pages/home/index"
										});
									} else {
										uni.showToast({
											title:"登陆失败"
										});
										uni.reLaunch({
											url:'/pages/index'
										});
									}
								},
								fail(err) {
									// 调用服务端登录接口失败
									console.log(err);
								}
							})
						},
						fail(error) {
							console.log(error);
						}
					})
				},
				fail(error) {
					console.log(error);
					// 用户拒绝授权 重启登录授权界面
					uni.showToast({
						title:"登陆失败"
					});
					uni.reLaunch({
						url:'/pages/index'
					});
				}
			});
		},
		handleGetPhoneNumber() {
			// 
		}
	}
}
</script>

<style>
.header {
	margin: 90rpx 0 90rpx 50rpx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650rpx;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200rpx;
	height: 200rpx;
}

.content {
	margin-left: 50rpx;
	margin-bottom: 90rpx;
}

.content text {
	display: block;
	color: #9d9d9d;
	margin-top: 40rpx;
}

.bottom {
	border-radius: 80rpx;
	margin: 70rpx 50rpx;
	font-size: 35rpx;
}
</style>
