<template>
	
	<!-- 优惠券领取界面 -->
	
	<view class="u-wrap">
		<!-- 暂无可领取的优惠券 -->
		<view class="coupon_empty" v-if="couponList.length===0">
			<u-empty text="暂无可领取的优惠券" mode="coupon" margin-top="100"></u-empty>
		</view>
		<view class="coupon_no_empty" v-else>
			<view class="jingdong"
				v-for="(item, index) in couponList" 
				:key="item.id"
				v-if="item.total>=0">
				<view class="left">
					<view class="sum">
						￥
						<text class="num">{{item.discount}}</text>
					</view>
					<view class="type">满{{item.couponMin}}元可用</view>
				</view>
				<view class="right">
					<view class="top">
						<view class="title">
							<text class="tag">{{goodsTypeMap[item.goodsType]}}</text>
							<text>{{item.couponName}}</text>
						</view>
						<view class="bottom">
							<view class="date u-line-1">领取后{{item.days}}天有效</view>
							<view class="immediate-use" @click.once="handleGetCoupon(item)">立即领取</view>
						</view>
					</view>
					<view class="tips">
						<view class="explain">
							<text>{{item.couponDesc}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			couponList:[],
			goodsTypeMap:{
				'0':'全商品',
				'1':'类目限制',
				'2':'商品限制'
			},
		}
	},
	onShow() {
		this.getData();
	},
	methods:{
		async getData() {
			const response = await this.request({
				url: this.baseUrl + '/coupons',
				method: 'get'
			});
			// console.log(response);
			this.couponList = response.data;
		},
		
		// 处理领取优惠券事件
		async handleGetCoupon(coupon) {
			// console.log(e);
			// 获取用户openid 构造参数
			let openid = uni.getStorageSync('openid')||'';
			let param = {};
			param.userOpenID = openid;
			param.couponId = coupon.id;
			
			uni.showLoading({
				title:'正在领取中',
				mask:true,
			});
			// 发送请求 领取优惠券
			const response = await this.request({
				url: this.baseUrl + '/coupon/get',
				method: 'post',
				data: param
			});
			uni.hideLoading();
			uni.showToast({
				title:response.message,
				icon:'none'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	background-color: rgb(244, 244, 244);
}
.u-wrap {
	padding: 24rpx;
}

.jingdong {
	margin-top: 40rpx;
	width: 700rpx;
	height: auto;
	background-color: #ffffff;
	display: flex;
	.left {
		padding: 0 30rpx;
		background-color: rgb(95, 148, 224); //rgb(94, 152, 225);
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		.sum {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 32rpx;
			.num {
				font-size: 80rpx;
			}
		}
		.type {
			margin-bottom: 50rpx;
			font-size: 24rpx;
		}
	}
	.right {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
		.top {
			border-bottom: 2rpx dashed $u-border-color;
			.title {
				margin-right: 60rpx;
				line-height: 40rpx;
				.tag {
					padding: 4rpx 20rpx;
					background-color: rgb(73, 154, 201);
					border-radius: 20rpx;
					color: #ffffff;
					font-weight: bold;
					font-size: 24rpx;
					margin-right: 10rpx;
				}
			}
			.bottom {
				display: flex;
				margin-top: 20rpx;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.date {
					font-size: 20rpx;
					flex: 1;
				}
				.immediate-use {
					height: auto;
					padding: 0 20rpx;
					font-size: 24rpx;
					border-radius: 40rpx;
					line-height: 40rpx;
					color: rgb(117, 142, 165);
					border: 2rpx solid rgb(117, 142, 165);
				}
			}
		}
		.tips {
			width: 100%;
			line-height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			.transpond {
				margin-right: 10rpx;
			}
			.explain {
				display: flex;
				align-items: center;
			}
			.particulars {
				width: 30rpx;
				height: 30rpx;
				box-sizing: border-box;
				padding-top: 8rpx;
				border-radius: 50%;
				background-color: $u-type-info-disabled;
				text-align: center;
			}
		}
	}
}

</style>
