<template>
	<view class="container">
	  <my-appointlist @appointList="appointList" :lists="lists"></my-appointlist>
	  <my-loading :status="loadingStatus"></my-loading>
	</view>
</template>

<script>
	import UseLog from './uselog.js'
	export default {
		mixins:[UseLog]
	}
</script>

<style lang="scss">
	@import './uselog.scss';
</style>