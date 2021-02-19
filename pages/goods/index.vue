<template>
	<view class="goods_container">
		<!-- 分段器 -->
		<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
		<goods-main></goods-main>
	</view>
</template>

<script>
	import goodsMain from './goods-main/index.vue';
	export default {
		data() {
			return {
				list: [
					{
						name: '商家A'
					}, 
					{
						name: '商家B'
					}, 
					{
						name: '商家C'
					}
				],
				curNow: 0
			}
		},
		components:{
			goodsMain
		},
		methods:{
			// 切换选项卡
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style>
	.goods_main{
		/* height: 60%; */
	}
</style>
