<template>
	<view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		methods: {
			showToast(data) {
				var that = this;
				this.$refs.uToast.show({
					title: data.title,
					type: data.type,
					url: data.url
				})
			}
		}
	}
</script>