// es6 封装自己的异步请求
export default (params) => {
	// 加载中
	uni.showLoading({
		title:'加载中'
	})
	// 封装 promise
	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			},
			complete(){
				uni.hideLoading();
			}
		})
	}) 
}