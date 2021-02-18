<script>
	export default {
		onLaunch: function() {
			// 获得系统信息
		   //  uni.getSystemInfo({
		   //      success: function(e) {
					// Vue.prototype.StatusBar = e.statusBarHeight;
					// let custom = wx.getMenuButtonBoundingClientRect();
					// Vue.prototype.Custom = custom;
					// Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// let capsule = wx.getMenuButtonBoundingClientRect();
					// if (capsule) {
					// 	Vue.prototype.Custom = capsule;
					// 	// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
					// 	Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					// } else {
					// 	Vue.prototype.CustomBar = e.statusBarHeight + 50;
					// }s
		   //      }
		   //  });
		   console.log('App Launch');
		   // 测试后端接口
		   // const response = this.request({
			  //  url:'http://localhost:8080/hello'
		   // });
		   // console.log(response);
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
	@import "colorui/icon.css";
	@import "colorui/main.css";
</style>
