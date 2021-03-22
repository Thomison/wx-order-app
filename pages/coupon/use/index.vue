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
				
				<!-- 复选框 -->
				<view class="coupon_checkbox_wrap">
					<checkbox-group :data-id="item.id" @change="handleCouponSelect">
						<checkbox :checked="item.checked"></checkbox>
					</checkbox-group>
				</view>				
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
				selectedCoupons:[],
			}
		},
		
		// 加载页面
		onLoad() {
			this.getData();
		},
		
		onShow() {
			this.getData();
		},
		
		// 卸载页面
		onUnload() {
			this.selectedCoupons = this.myCouponList.filter(v => v.checked);
			
			// 订单金额
			let total = uni.getStorageSync('total');
			// 优惠金额
			let discount = 0;
			let myCart = uni.getStorageSync('myCart')||[];
			myCart = myCart.filter(v => v.checked);
			let goodIdList = myCart.map(v => v.goodId);
			for (let i=0; i<this.selectedCoupons.length; i++) {
				let coupon = this.selectedCoupons[i];
				if (coupon.storeId != myCart[0].storeId) continue;
				if (coupon.goodId === 0) { // 满减优惠券
					if (coupon.couponMin <= total) {
						discount += coupon.discount;
					}
				} else { // 指定商品优惠券
					let index = myCart.lastIndexOf(coupon.goodId);
					if (coupon.goodId != -1) {
						discount += coupon.discount;
					}
				}
			}
			// 支付金额
			let pay = total - discount;
			
			uni.setStorageSync('total', total);
			uni.setStorageSync('discount', discount);
			uni.setStorageSync('pay', pay);
			uni.setStorageSync('coupons', this.selectedCoupons);
		},
		
		methods:{
			
			// 发送请求 获取用户拥有的优惠券数据
			async getData() {
				const openId = uni.getStorageSync('openid')||'';
				const res = await this.request({
					url: this.baseUrl + '/coupons/' + openId,
					method: 'get'
				});
				console.log(res);
				this.myCouponList = res.data;
				// 仅展示来自店铺A的未使用优惠券
				this.myCouponList = this.myCouponList.filter(v => (v.couponStatus===0));
				uni.setStorageSync('coupons', this.myCouponList);
			},
			
			// 处理用户选中优惠券
			handleCouponSelect(e) {
				console.log(e);
				// 获取用户优惠券id
				const couponUserId = e.currentTarget.dataset.id;
				let index = this.myCouponList.findIndex(v => v.id===couponUserId);
				// 选中状态取反
				this.myCouponList[index].checked = !this.myCouponList[index].checked;
			},
			
			// 处理 使用优惠券 事件
			handleUseCoupon(item) {
				// 添加优惠券信息到缓存
				uni.setStorageSync('couponUserId', item.id);
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
		width: 100%;
		height: 200rpx;
		background-color: #ffffff;
		display: flex;
		.coupon_checkbox_wrap{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.left {
			flex: 2;
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
			flex: 5;
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
