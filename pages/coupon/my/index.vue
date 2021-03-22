<template>
	
	<!-- 我的优惠券页面 -->
	
	<view class="container">
		
		<view class="coupon_empty" v-if="myCouponList.length===0">
			<u-empty text="优惠券空空如也" mode="coupon" margin-top="100">
				<u-button slot="bottom" size="medium" @click="handleGoGetCoupon">
					点击领取优惠券
				</u-button>
			</u-empty>
		</view>
		
		<view class="coupon_no_empty" v-else>
			<view class="jingdong" 
				v-for="(item, index) in myCouponList" 
				:key="item.id">
				<view class="left">
					<view class="sum">
						￥
						<text class="num">{{item.discount}}</text>
					</view>
					<view v-if="item.goodId===0" class="type">满{{item.couponMin}}元可用</view>
				</view>
				<view class="right">
					<view class="top">
						<view class="title">
							<text v-if="item.storeId>0" class="tag">{{item.storeName}}</text>
							<text v-else class="tag">全场通用</text>
							
							<text v-if="item.goodId>0" class="tag">{{item.goodName}}</text>
							<text>{{item.couponName}}</text>
						</view>
						<view class="bottom">
							<view class="date u-line-1">{{item.startTime}}-{{item.endTime}}</view>
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
			}
		},
		onLoad() {
			this.getData();
		},
		methods:{
			async getData() {
				const openId = uni.getStorageSync('openid')||'';
				const res = await this.request({
					url: this.baseUrl + '/coupons/' + openId,
					method: 'get'
				});
				console.log(res);
				let myCouponList = res.data;
				myCouponList.forEach((item) => {
					// 只显示状态为未使用的优惠券
					if (item.couponStatus === 0) {
						this.myCouponList.push(item);
					}
				});
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
		height: 200rpx;
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
