<template>
	<view class="u-wrap">
		
		<!-- 商店标题 -->
		<u-subsection 
			:list="subsectionList" 
			:current="curNow" 
			@change="sectionChange"
			class="title"
			></u-subsection>
		
		<!-- 商品内容 -->
		<view class="u-menu-wrap">
			
			<!-- 左侧分类栏 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" 
					:key="index" 
					class="u-tab-item" 
					:class="[current==index ? 'u-tab-item-active' : '']"
					:data-current="index" 
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			
			<!-- 右侧商品栏 -->
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-title">
								<text>{{item.name}}</text>
							</view>
							
							<view class="item-container">
								<navigator class="thumb-box" 
									v-for="(item1, index1) in item.goods" 
									:key="index1"
									:url="'/pages/goods/good-detail/index?id=' + item1.goodId">
									<image class="item-menu-image" :src="item1.goodImageUrl" mode="aspectFit"></image>
									<view class="item-menu-info">
										<view class="item-menu-name">{{item1.goodName}}</view>
										<view class="item-menu-price">
											<text class="text-red text-xl text-price">{{item1.goodNewPrice}}</text>
										</view>
									</view>
								</navigator>
								<!-- 分割符 -->
								<!-- <u-gap height="80" bg-color="#000"></u-gap> -->
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
			
		</view>
	</view>
</template>

<script>
	// import goodsMain from './goods-main/index.vue';
	// import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				list:[],
				cateList:[],
				subsectionList: [
					{ name: '店铺A' }, 
					{ name: '店铺B' }, 
					{ name: '店铺C' }
				],
				curNow: 0,
				// tabbar: classifyData,
				tabbar:[],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		components:{
			// goodsMain
		},
		methods:{
			// 获取数据 存在缓存中
			async getList() {
				// 获取店铺数据
				const response = await this.request({
					url: this.baseUrl + '/stores',
					method: 'get'
				});
				console.log(response);
				this.list = response.data;
				// 获取分类数据
				const response2 = await this.request({
					url: this.baseUrl + '/category/all',
					method: 'get'
				});
				console.log(response2);
				this.cateList = response2.data;
				// 获取商品数据
				for (let i=0; i<this.list.length; i++) {
					this.list[i].cates = JSON.parse(JSON.stringify(this.cateList));
					for (let j=0; j<this.cateList.length; j++) {
						const response3 = await this.request({
							url: this.baseUrl + '/store/' + this.list[i].id + '/category/' + this.cateList[j].id + '/goods',
							method: 'get'
						}); 
						this.list[i].cates[j].goods = response3.data;
					}
				}
				console.log(this.list);
				this.tabbar = this.list[this.curNow].cates;
				// 存储在缓存
				uni.setStorageSync('dataList', this.list);
			},
			// 切换选项卡
			sectionChange(index) {
				this.curNow = index;
				// 切换店铺的商品数据
				this.tabbar = this.list[this.curNow].cates;
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		},
		onLoad() {
			// 从全局缓存中获取数据
			// this.list = uni.getStorageSync('dataList');
			// if (!this.list) {
				// 缓存不命中 重新获取数据
				// await this.getList();
			// }
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		height: 80rpx;
		// position: fixed;s
		// top: 0;
	}
	.u-wrap {
		// height: calc(100vh - 100rpx);
		display: flex;
		flex-direction: column;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		// position: fixed;
		// bottom: 0;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
		// position: fixed;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-info {
		width: 20%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 30rpx;
		font-weight: 600;
		color: $u-main-color;
	}
	
	.item-menu-price {
		
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 100%;
		display: flex;
		// align-items: center;
		// justify-content: center;
		// flex-direction: column;
		margin-top: 20rpx;
		padding: 10rpx;
		border-bottom: 3rpx #ccc solid;
	}
	
	.item-menu-image {
		width: 70%;
		height: 200rpx;
	}
</style>
