<template>
	<view class="container">
		
		<!-- 选中的商品列表 -->
		<view class="goods_item">
			<!-- 商品图片 -->
			<view class="good_image">
				<image src="" mode="widthFix"></image>
			</view>
			<!-- 商品信息 -->
			<view class="good_info">
				<!-- 商品名称 -->
				<view class="good_name">
					
				</view>
				<!-- 商品价格和数量 -->
				<view class="good_price_num">
					<!-- 商品价格 -->
					<view class="good_price">
						<text class="text-xl text-red text-price">0</text>
					</view>
					<!-- 商品数量 -->
					<view class="good_num">
						<text class="text-xl text-gray">X 1</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order_info">
			<!-- 优惠金额 -->
			<view class="order_amount_total">
				<text class="text-xsl text-black text-price">0</text>
			</view>
			<!-- 优惠金额 -->
			<view class="discount_amount">
				<text class="text-xsl text-black text-price">0</text>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="coupon cu-item arrow">
			<navigator class="content" url="../coupon/my/index">优惠券</navigator>
		</view>
		
		<!-- 底部工具栏 -->
		<view class="btm_tools">
			<!-- 支付金额 -->
			<view class="pay_amount_total">
				<text class="text-xxl text-red text-price">0</text>
			</view>
			<!-- 结算按钮 -->
			<view class="pay_button">
				<u-button 
					type="error"
					loading
					@click="handleCreateOrder"></u-button>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data(){
			return{
				goodsList:[],
				orderAmountTotal:0,
				discountAmount:0,
				payAmountTotal:0,
			}
		},
		methods:{
			async getData(){
				
			},
			// 处理点击优惠券的事件
			
			// 处理创建订单的事件
			handleCreateOrder(){
				// 准备post请求的参数
				// 向服务器发送创建订单的请求
			},
			
		},
		// 初始化页面
		onLoad() {
			this.getData();
		}
	}
</script>

<style>
	.container{
		.goods_item{
			.good_image{
				
			}
			.good_info{
				.good_name{
					
				}
				.good_price_num{
					.good_price{
						
					}
					.good_num{
						
					}
				}
			}
		}
		.order_info{
			.order_amount_total{
				
			}
			.discount_amount{
				
			}
		}
		.coupon{
			
		}
		.btm_tools{
			.pay_amount_total{
				
			}
			.pay_button{
				
			}
		}
	}
</style>
