<template>
	<view class="container">
		
		<u-modal v-model="show" @confirm="confirmModal" show-confirm-button>
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
				<view class="count-down">
					限定在<u-count-down :timestamp="timestamp" color="red"></u-count-down>时间内使用
				</view>
			</view>
		</u-modal>
		
		<!-- 商品展示栏 -->
		<view class="good_view">
			<view class="good_image">
				<image :src="data.goodImageUrl" mode="widthFix"></image>
			</view>
			<view class="good_info">
				<view class="good_name">
					{{data.goodName}}
				</view>
				<view class="text-red text-xxl text-price">
					{{data.goodPrice}}
				</view>
			</view>
		</view>
		
		<!-- 领取优惠券 -->
		<view class="cu-list menu margin-top">
			<view class="coupon cu-item arrow">
				<navigator class="content" url="../../coupon/index">
					<text class="cuIcon-redpacket text-red"></text>
					<text class="text-grey">领取优惠券</text>
				</navigator>
			</view>
		</view>
		
		<!-- 底部工具栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">店铺</view>
				</view>
				<view class="item car" @click="handleGoCart">
					<!-- <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge> -->
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="handleAddCart">加入购物车</view>
				<!-- <view class="buy btn u-line-1" @click="handleBuy">立即购买</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 当前商品数据
			id:-1,
			data:{},
			coupon:{},
			recordParam: {
				userOpenId:'',
				goodId:-1,
			},
			recordId:-1,
			show:false,
			content:'恭喜您被优惠券砸中了',
			timestamp:0,
			// time:'',
		}
	},
	methods:{
		async confirmModal() {
			// 领取优惠券
			let params = {};
			params.userOpenID = uni.getStorageSync('openid')||'';
			params.couponId = this.coupon.id;
			const response = await this.request({
				url:this.baseUrl+'/coupon/get',
				method: 'post',
				data: params
			});
			this.show = false;
		},
		
		async getData() {
			const response = await this.request({
				url:this.baseUrl+'/good/'+this.id
			});
			const response2 = await this.request({
				url: this.baseUrl + '/coupons',
				method: 'get'
			});
			// console.log(response);
			this.data = response.data;
			let coupons = response2.data;
			for (let i=0; i<coupons.length; i++) {
				if (coupons[i].goodId === this.data.goodId) {
					this.coupon = coupons[i];
					// 开启优惠券弹窗
					this.show = true;
					this.timestamp = this.coupon.seconds;
					break;
				}
			}
		},
		
		async createRecord() {
			this.recordParam.userOpenId = uni.getStorageSync('openid');
			this.recordParam.goodId = this.id;
			const response = await this.request({
				url:this.baseUrl+'/record',
				method: 'post',
				data: JSON.stringify(this.recordParam)
			});
			console.log(response);
			this.recordId = response.data.id;
		},
		
		async updateRecord() {
			const response = await this.request({
				url:this.baseUrl+'/record/' + this.recordId,
				method: 'put',
			});
			console.log(response);
		},
		
		// 处理 加入购物车 事件
		handleAddCart() {
			uni.showLoading({
				title:'正在加入购物车',
				mask:true,
			});
			// 从缓存获取购物车数组
			let myCart = uni.getStorageSync('myCart');
			// 设置当前商品在购物车中被选中且数量为1
			let cartIndex = myCart.findIndex(v => v.goodId === this.data.goodId);
			if (cartIndex === -1) {
				this.data.checked = true;
				this.data.num = 1;
				myCart.push(this.data);
			} else {
				// if (myCart[cartIndex]) {
					myCart[cartIndex].checked = true;
					myCart[cartIndex].num++;
				// }
			}
			// 将购物车数组刷新回缓存
			uni.setStorageSync('myCart', myCart);
			uni.showToast({
				title:'加入购物车成功',
				duration:2000
			})
			uni.hideLoading();
		},

		// 处理 前往购物车 事件
		handleGoCart() {
			uni.switchTab({
				url:"../../cart/index"
			});
		}
	},
	
	/**
	 * 页面加载
	 */
	onLoad(options) {
		// console.log(options);
		// 获取传入参数 - 商品id
		this.id=options.id;
		// 获取商品数据
		this.getData();
		// 创建访问记录
		this.createRecord();
		console.log('onLoad');
	},
	
	/**
	 * 页面显示
	 */
	onShow() {
		console.log('onShow');
	},
	
	/**
	 * 离开页面（页面销毁时触发）
	 */
	onUnload() {
		// 更新访问记录
		this.updateRecord();
		// 消除定时器
		// clearTimeout(this.time);
		console.log('onUnload');
	}
};
</script>

<style lang="scss" scoped>

.good_view{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	
	.good_image{
		padding: 20rpx;
		border-bottom: 3rpx #ccc solid;
		// width: 100vw;
		// image{
		// 	width: 100%;
		// }
	}
	.good_info{
		width: 100vw;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		font-weight: 500;
	}
}
	
.navigation {
	width: 100%;
	position: fixed;
	bottom: 0;
	display: flex;
	// margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 20rpx 0;
	.left {
		display: flex;
		font-size: 25rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 36rpx;
		align-items: flex-end;
		justify-content: end;
		.btn {
			line-height: 90rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
.slot-content{
	// display: flex;
	// align-items: center;
	// justify-content: center;
	text-align: center;
	padding: 30rpx;
	font-size: 30rpx;
	font-weight: 400;
	// rich-text{
	// 	width: 100%;
	// }
	// .count-down{
	// 	width: 100%;
	// }
}
</style>
