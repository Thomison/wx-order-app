<template>
	<view class="cart_container">
		
		<!-- 购物车为空 -->
		<view v-if="myCart.length === 0" class="cart_empty">
			<u-empty text="购物车为空" mode="car" margin-top="100"></u-empty>
		</view>
		
		<!-- 购物车不为空 -->
		<view v-else class="cart_main">
			
			<!-- 商品列表 -->
			<view v-for="(item,index) in myCart" :key="item.goodId" class="cart_item">
				<!-- 复选框 -->
				<view class="cart_checkbox_wrap">
					<checkbox-group :data-id="item.goodId" @change="handleItemChange">
						<checkbox :checked="item.checked"></checkbox>
					</checkbox-group>
				</view>
				<!-- 商品图片 -->
				<navigator class="cart_image_wrap" :url="'/pages/goods/good-detail/index?id='+item.goodId">
					<image mode="widthFix" :src="item.goodImageUrl"></image>
				</navigator>
				<!-- 商品信息 -->
				<view class="cart_info_wrap">
					<!-- 商品名称 -->
					<view class="goods_name">{{item.goodName}}——{{item.storeName}}</view>
					<view class="goods_price_wrap">
						<!-- 商品价格 -->
						<view class="goods_price text-red text-xl text-price">{{item.goodPrice}}</view>
						<!-- 商品数量编辑 -->
						<view class="cart_num_edit">
							<view class="num_edit" @click="setItemNum" :data-id="item.goodId" :data-operation="-1">-</view>
							<view class="goods_num">{{item.num}}</view>
							<view class="num_edit" @click="setItemNum" :data-id="item.goodId" :data-operation="1">+</view>
					  </view>
					</view>
				</view>
			</view>
			
			<!-- 底部工具栏 -->
			<view class="btm_tools">
				<!-- 全选 -->
				<view class="all_chk_wrap">
					<checkbox-group @change="handleAllItemChange">
						<checkbox :checked="allChecked"/>全选
					</checkbox-group>
				</view>
				<!-- 总价 -->
				<view class="total_price_wrap">
					<view class="total_price">
						合计:<text class="total_price_txt text-red text-xxl text-price">{{totalPrice}}</text>
					</view>
					<view class="price_note">包含运费</view>
				</view>
				<!-- 结算 -->
				<view class="order_pay_wrap" @click="handlePay">
					结算({{totalNum}})
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 购物车数组
				myCart:[],
				// 是否全选
				allChecked:false,
				// 购物车选中商品的总价
				totalPrice:0,
				// 购物车选中商品的总数量
				totalNum:0
			}
		},
		methods:{
			// 用户选中单个商品
			handleItemChange(e){
				// console.log(e);
				const goodId = e.currentTarget.dataset.id;
				let myCart = this.myCart;
				// 通过商品id找到数组下标
				let index = myCart.findIndex(v => v.goodId === goodId);
				// 反选 （取反）
				myCart[index].checked = !myCart[index].checked; 
				// 更新购物车状态
				this.setCart(myCart);
			},
			/**
		     * 处理用户全选或反选购物车所有商品事件
		     */
			handleAllItemChange(e){
				// console.log(e);
				let allChecked = this.allChecked;
				let myCart = this.myCart;
				allChecked = !allChecked;
				// 改变所有购物车中所有商品的选中状态
				myCart.forEach(v => v.checked=allChecked);
				// console.log(allChecked);
				// 更新购物车状态
				this.setCart(myCart);
			},
			/**
			 * 重新设置购物车状态 如选中、数量、价格
			 */
			setCart(myCart){
				let allChecked = true;
				let totalPrice = 0;
				let totalNum = 0;
				// 刷新购物车总计商品价格和数量
				myCart.forEach(v => {
				  if (v.checked) {
					totalPrice += v.num * v.goodPrice;
					totalNum += v.num;
				  } else {
					allChecked = false;
				  }
				});
				// 如果购物车为空 默认全不选中
				allChecked = myCart.length? allChecked:false;
				// this.setData({allChecked, totalPrice, totalNum, myCart})
				this.allChecked = allChecked;
				this.totalPrice = totalPrice;
				this.totalNum = totalNum;
				this.myCart = myCart;
				// 刷新回缓存
				uni.setStorageSync('myCart', myCart);
			},
			/**
			 * 处理用户点击结算的事件
			 */
			handlePay(){
			    // 判断是否选中有商品
			    const totalNum = this.totalNum;
			    // 判断是否选中商品
			    if (totalNum===0) {
			      uni.showToast({
			        title: '您还没有选购商品',
			        icon: 'none',
			        mask: true,
			      });
			      return; 
			    }
				// 过滤用户购物车中所选商品
				let myCartChecked = this.myCart.filter(x => x.checked);
				// 判断用户所选商品是否来自同一家商店
				let storeId = myCartChecked[0].storeId;
				for (let i=0; i<myCartChecked.length; i++) {
					if (myCartChecked[i].storeId != storeId) {
						uni.showToast({
						  title: '您必须选中来自同一家店铺的商品',
						  icon: 'none',
						  mask: true,
						});
						return; 
					}
				}
				// 将订单金额存入缓存
				uni.setStorageSync('total', this.totalPrice);
			    // 跳转到支付页面
			    uni.navigateTo({
			      url: '/pages/pay/index'
			    });
			},
			// 编辑商品数量
			setItemNum(e){
			    const {id, operation} = e.currentTarget.dataset;
			    let myCart = this.myCart;
			    const index = myCart.findIndex(v => v.goodId===id);
			    // 如果商品数量为1 并且 执行减一操作 则弹出删除提示框
			    if (myCart[index].num===1 && operation === -1) {
			      uni.showModal({
			        content: '您是否删除该商品？',
			        title: '提示',
			        success: (result) => {
			          if(result.confirm) {
			            myCart.splice(index, 1); // 删除商品
			            this.setCart(myCart); // 更新购物车
			          } 
			        }
			      })
			    } else {
			      myCart[index].num += operation; // 修改商品数量
			      this.setCart(myCart); // 更新购物车
			    }
			  },
		},
		onShow(){
			// 加载缓存中的购物车数据
			this.myCart = uni.getStorageSync('myCart') || [];
			this.setCart(this.myCart);
			// console.log(this.myCart);
		}
	}
</script>

<style lang="scss">
	.cart_empty{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cart_main{
	    .cart_item{
			display: flex;
			padding: 10rpx;
			border-bottom: 1rpx solid #ccc;
			.cart_checkbox_wrap{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.cart_image_wrap{ 
				flex: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
				  width:80% 
				}
			}
			.cart_info_wrap{
				flex: 4;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.goods_name{
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					color: #666 ;
				}
				.goods_price_wrap{
					display: flex;
					flex-direction: row;
					justify-content: space-between; 
					.goods_price{
						flex: 3;
						text-align: left;
						// color: $uni-color-error;
						font-size: 34rpx;
					}
					.cart_num_edit{
						flex: 2;
						display: flex;
						text-align: right;
						.num_edit{
						  width: 50rpx;
						  height: 50rpx;
						  display: flex;
						  justify-content: center;
						  align-items: center;
						  border: 1rpx solid #ccc;
						}
						.goods_num{
							width: 50rpx;
							height: 50rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	    .btm_tools{
	    	border-top: 10rpx solid #ccc;
	    	position: fixed;
	    	left: 0;
	    	bottom: 0;
	    	width: 100%;
	    	height: 90rpx;
	    	background-color: #fff;
	    	display: flex;
	    	.all_chk_wrap{
	    		flex: 2;
	    		display: flex;
	    		justify-content: center;
	    		align-items: center; 
	    	}
	    	.total_price_wrap{
	    		flex: 4;
	    		text-align: right; 
	    		padding-right: 5rpx;
	    		.total_price{
	    			.total_price_txt{
	    				color: $uni-color-error;
	    				font-size: 34rpx;
	    			}
	    		}
	    		.price_note{
	    			font-size: 20rpx;
	    			color: #ccc;
	    		}
	    	}
	    	.order_pay_wrap{
	    		flex: 2;
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
