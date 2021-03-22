<template>
	<view class="container">
		
		<!-- 选中的商品列表 -->
		<view class="goods_item"
			v-for="(item, index) in myGoods"
			:key="item.goodId">
			<!-- 商品图片 -->
			<view class="good_image">
				<image :src="item.goodImageUrl" mode="widthFix"></image>
			</view>
			<!-- 商品信息 -->
			<view class="good_info">
				<!-- 商品名称 -->
				<view class="good_name">
					<text>{{item.goodName}}</text>
				</view>
				<!-- 商品价格和数量 -->
				<view class="good_price_num">
					<!-- 商品价格 -->
					<view class="good_price">
						<text class=" text-red text-price">{{item.goodPrice}}</text>
					</view>
					<!-- 商品数量 -->
					<view class="good_num">
						<text class=" text-gray">X {{item.num}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单信息列表页 -->
		<view class="order_info cu-list menu margin-top">
			<!-- 订单金额 -->
			<view class="order_amount_total cu-item">
				<view class="content text-grey" style="text-align: right;">
					订单总金额: <text class="text-price text-red">{{orderAmountTotal}}</text>
				</view>
			</view>
			<!-- 优惠金额 -->
			<view class="discount_amount cu-item">
				<view class="content text-grey" style="text-align: right;">
					优惠金额:<text class="text-price text-red">{{discountAmount}}</text>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="coupon cu-item arrow">
				<navigator class="content" url="../coupon/use/index" style="text-align: right;">
					<text class="cuIcon-redpacket text-red"></text>
					<text class="text-grey">使用优惠券</text>
				</navigator>
			</view>
		</view>
		
		<!-- 底部工具栏 -->
		<view class="btm_tools">
			<!-- 支付金额 -->
			<view class="pay_amount_total">
				<text class=" text-red text-price">{{payAmountTotal}}</text>
			</view>
			<view class="pay_button" @click="handleCreateOrder">
				结算({{totalNum}})
			</view>
		</view>
		
	</view>
</template>


<script>
	export default {
		data(){
			return{
				// 购物车商品列表
				myCart:[],
				// 选中商品列表
				myGoods:[],
				// 定价总价格
				orderAmountTotal:0,
				// 使用的优惠券列表
				coupons:[],
				// 优惠金额
				discountAmount:0,
				// 支付总价格
				payAmountTotal:0,
				// 商品总数量
				totalNum:0,
				// 请求参数
				params:{
					// openId:'',
					// orderItems:[],
					// coupons:[],
				}
			}
		},
		methods:{
			
			// 处理创建订单的事件
			async handleCreateOrder(){
				// 构造请求参数
				this.params.openId = uni.getStorageSync('openid')||'';
				this.params.orderItems = this.myGoods;
				this.params.coupons = this.coupons;
				
				// 向服务器发送创建订单的请求 获取订单编号以及订单状态
				const res = await this.request({
					url: this.baseUrl + '/order',
					method: 'post',
					data: this.params
				});
				console.log(res);
				
				// 删除缓存中关于订单和优惠券的数据
				uni.removeStorageSync('total');
				uni.removeStorageSync('discount');
				uni.removeStorageSync('pay');
				uni.removeStorageSync('coupons');
				if (res.code === 200) { // 支付成功 跳转到购物车页面
					// 删除购物车已支付商品 保存到缓存
					let newCart = this.myCart.filter(v => !v.checked);
					uni.setStorageSync('myCart', newCart);
					uni.showToast({
						title:'支付成功',
						icon:'success',
						success() {
							setTimeout(function(){
								uni.switchTab({
									url:'../cart/index'
								})
							}, 2000);
						}
					});
					// uni.switchTab({
					// 	url:'../cart/index'
					// });
				} else { // 支付失败 回到购物车页面
					uni.showToast({
						title:res.message,
						icon:'none',
						duration:1500
					});
					uni.navigateTo({
						url:'../cart/index'
					});
				}
			},
			
		},
		
		// 初始化页面
		onLoad() {
			// 从缓存中获取购物车数据
			this.myCart = uni.getStorageSync('myCart')||[];
			// 过滤得到选中商品
			this.myGoods = this.myCart.filter(v => v.checked);
			// 计算订单总价格和总数量
			this.orderAmountTotal = 0;
			this.myGoods.forEach(v => {
				this.orderAmountTotal += v.num * v.goodPrice;
				this.totalNum += v.num;
				v.goodPrice = v.goodPrice;
				v.goodNum = v.num;
			})
			
			console.log('onLoad');
		},
		
		onShow() {
			console.log('onShow');
			// 从缓存获取优惠券信息
			this.coupons = uni.getStorageSync('coupons')||[];
			this.discountAmount = uni.getStorageSync('discount')||0;
			this.payAmountTotal = uni.getStorageSync('pay')||this.orderAmountTotal;
		}
	}
</script>

<style lang="scss">
	.container{
		.goods_item{
			display: flex;
			padding: 10rpx;
			border-bottom: 1rpx solid #ccc;
			.good_image{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 80%;
				}
			}
			.good_info{
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.good_name{
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					color: #666 ;
				}
				.good_price_num{
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					.good_price{
						flex: 1;
						text-align: left;
					}
					.good_num{
						flex: 1;
						text-align: right;
					}
				}
			}
		}
		.btm_tools{
			display: flex;
			padding: 10rpx;
			flex-direction: row;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			border-top: 10rpx solid #ccc;
			.pay_amount_total{
				flex: 1;
				padding-left: 10rpx;
				text-align: left;
				font-size: 40rpx;
			}
			.pay_button{
				flex: 1;
				display: flex;
				background-color: $uni-color-error;
				color: #fff;
				font-size: 34rpx;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
</style>
