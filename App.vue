<script>
	export default {
		onLaunch: function() {
			// 设置空的购物车
			uni.setStorageSync('myCart', []);
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// 引入uView基础样式
	@import "uview-ui/index.scss";
	@import "colorui/icon.css";
	@import "colorui/main.css";
</style>
