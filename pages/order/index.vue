<template>
	<view>
		<view class="container">
			<view class="orders_main">
				<view class="order_item"
					v-for="(item, index) in orderList"
					:key = "item.orderNo">
					
					<view class="order_no_row">
						<view class="order_no_text">订单编号</view>
						<view class="order_no_val">{{item.orderNo}}</view>
					</view>
					
					<view class="order_price_row">
						<view class="order_price_text">订单支付金额</view>
						<view class="order_price_val text-price text-red">{{item.payTotalAmount}}</view>
					</view>
					
					<view class="order_time_row">
						<view class="order_time_text">订单日期</view>
						<view class="order_time_val">{{item.createTime}}</view>
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
			orderList:[],
		};
	},
	onShow() {
		this.getData();
	},
	methods: {
		// 页面数据
		async getData() {
			const openid = uni.getStorageSync('openid')||'';
			const res = await this.request({
				url: this.baseUrl + '/orders/' + openid,
				method: 'get',
			});
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none'
			});
			this.orderList = res.data;
		},
	}
};
</script>

<style lang="scss">
.order_item{
    padding: 20rpx;
	background-color: #FFFFFF;
    border-bottom: 1rpx solid #ccc;
    .order_no_row{
		display: flex;
		padding: 10rpx 0;
		justify-content: space-between;
		.order_no_text{}
		.order_no_val{}
    }
    .order_price_row{
		display: flex;
		padding: 10rpx 0;
		justify-content: space-between;
		.order_price_text{}
		.order_price_val {
			font-size: 32rpx;
		}
    }
    .order_time_row{
      display: flex;
      padding: 10rpx 0;
      justify-content: space-between;
      .order_time_text{}
      .order_time_val{}
    }
  }
</style>
