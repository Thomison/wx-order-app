<template>
	<view class="mine_container">
		<!-- 用户信息 -->
		<view class="avatar">
			<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>
		<view class="username">
			<view class="text-grey">用户昵称</view>
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
				<navigator class="content" url="../coupon/index">
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
			
<!-- 			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">按钮</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow">
						<text class="cuIcon-upload"></text> 上传</button>
				</view>
			</view> -->
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">音乐</view>
					<view class="cu-tag round bg-olive light">电影</view>
					<view class="cu-tag round bg-blue light">旅行</view>
				</view>
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-favor text-red"></text>
					<text class="text-grey">我的收藏</text>
				</view>
				<!-- <view class="action">
					<text class="text-red text-xl text-price">100</text>
				</view> -->
			</view>
			
			<view class="cu-item arrow" >
				<view class="content">
					<text class="cuIcon-moneybag text-red"></text>
					<text class="text-grey">我的余额</text>
				</view>
				<view class="action">
					<text class="text-red text-xl text-price">100</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
			}
		},
		methods: {
			
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
