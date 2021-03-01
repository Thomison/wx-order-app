<template>
	
	<!-- 使用优惠券页面 -->
	
	<view class="container">
		<!-- 无可使用优惠券 -->
		<view class="coupon_empty" v-if="myCouponList.length===0">
			<u-empty text="无可用优惠券" mode="coupon" margin-top="100">
				<u-button slot="bottom" size="medium" @click="handleGoGetCoupon">
					点击领取优惠券
				</u-button>
			</u-empty>
		</view>
		<!-- 有可使用优惠券 -->
		<view class="coupon_no_empty" v-else>
			<view class="jingdong"
				v-for="(item, index) in myCouponList" 
				:key="item.id">
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
							<view class="date u-line-1">{{item.startTime}}-{{item.endTime}}</view>
							<view class="immediate-use" @click="handleUseCoupon(item)">立即使用</view>
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
				myCouponList:[],
				goodsTypeMap:{
					'0':'全商品',
					'1':'类目限制',
					'2':'商品限制'
				},
			}
		},
		onShow() {
			this.getData();
			// 过滤只剩下订单金额超过最低消费金额的优惠券
			let orderAmountTotal = uni.getStorageSync('orderAmountTotal')||0;
			this.myCouponList = this.myCouponList.filter(v => v.couponMin<=orderAmountTotal);
		},
		methods:{
			async getData() {
				const res = await this.request({
					url: this.baseUrl + '/coupons/mine',
					method: 'get'
				});
				console.log(res);
				this.myCouponList = res.data;
				this.myCouponList.forEach((item) => {
					item.startTime = item.startTime.substring(0,10);
					item.endTime = item.endTime.substring(0,10);
				});
			},
			
			// 处理 使用优惠券 事件
			handleUseCoupon(item) {
				// 添加优惠券信息到缓存
				uni.setStorageSync('couponUserId', item.couponUserId);
				uni.setStorageSync('couponDiscount', item.discount);
				// 跳转到支付页面
				uni.navigateTo({
					url:'../../pay/index',
				})
			},
			
			// 处理 跳转到领取优惠券页面 事件
			handleGoGetCoupon() {
				uni.navigateTo({
					url:'../index',
				})
			}
		}
	};
</script>

<style lang="scss">
	.container{
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
