<template>
	<view class="mine_container">
		
		<!-- 用户信息 -->
		<view class="avatar">
			<view class="cu-avatar xl round" 
				:style="'background-image:url('+ userInfo.avatarUrl +');'"></view>
		</view>
		<view class="username">
			<view class="text-grey">{{userInfo.nickName}}</view>
		</view>

		<!-- 功能列表 -->
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item arrow" >
				<navigator class="content" url="../order/index">
					<text class="cuIcon-goods"></text>
					<text class="text-grey">我的订单</text>
				</navigator>
			</view>
			<view class="cu-item arrow" >
				<navigator class="content" url="../coupon/my/index">
					<text class="cuIcon-redpacket text-red"></text>
					<text class="text-grey">我的优惠券</text>
				</navigator>
			</view>
			
			<view class="cu-item arrow" >
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">与我联系</text>
				</button>
			</view>
			
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-moneybag text-red"></text>
					<text class="text-grey">我的余额</text>
				</view>
				<view class="action">
					<text class="text-red text-xl text-price">{{data.money}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				userInfo:{},
				data:{},
			}
		},
		methods: {
			async getData() {
				const openid = uni.getStorageSync('openid')||'';
				const res = await this.request({
					url: this.baseUrl + '/user/' + openid,
					method: 'get'
				});
				this.data = res.data;
			}
		},
		onLoad() {
			// 获取用户个人信息
			this.userInfo = uni.getStorageSync('userInfo');
			console.log(this.userInfo);
		},
		onShow() {
			this.getData();
		}
	}
</script>

<style lang="scss">
.avatar{
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 40rpx;
}
.username{
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 20rpx;
}

</style>
