<template>
	<view class="">
		<view
			class="u-steps"
			:style="{
				flexDirection: direction
			}"
			style="width: 900rpx;">
			<view class="u-steps__item" 
				:class="['u-steps__item--' + direction]" 
				v-for="(item, index) in list" :key="index">
				<view @click="changeLocal(index)">
					<view class="u-steps__item__num">
						<image v-if="current < index" 
						style="width: 36rpx;height: 36rpx;" :src="unActiveBg" mode="widthFix"></image>
						<u-icon v-else size="42" color="#ffffff" :name="icon"></u-icon>
					</view>
					<!-- 文字样式 -->
					<text class="u-line-1" :style="{ 
						color: index <= current ? activeColor : unActiveColor,
					}" :class="['u-steps__item__text--' + direction]">
						{{ item.name }}
					</text>
				</view>
				<view class="u-steps__item__line" 
					:color="unActiveColor" 
					:style="{ 
						backgroundColor: index <= current ? '#CE2741' : unActiveColor,
					}" v-if="index < list.length - 1">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * steps 步骤条
 * @description 该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。
 * @tutorial https://www.uviewui.com/components/steps.html
 * @property {String} mode 设置模式（默认dot）
 * @property {Array} list 数轴条数据，数组。具体见上方示例
 * @property {String} type type主题（默认primary）
 * @property {String} direction row-横向，column-竖向（默认row）
 * @property {Number String} current 设置当前处于第几步
 * @property {String} active-color 已完成步骤的激活颜色，如设置，type值会失效
 * @property {String} un-active-color 未激活的颜色，用于表示未完成步骤的颜色（默认#606266）
 * @example <u-steps :list="numList" active-color="#fa3534"></u-steps>
 */
export default {
	name: 'u-steps',
	props: {
		// 步骤条的类型，dot|number
		mode: {
			type: String,
			default: 'dot'
		},
		// 步骤条的数据
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 主题类型, primary|success|info|warning|error
		type: {
			type: String,
			default: 'primary'
		},
		// 当前哪一步是激活的
		current: {
			type: [Number, String],
			default: 0
		},
		// 激活步骤的颜色
		activeColor: {
			type: String,
			default: '#2979ff'
		},
		// 未激活的颜色
		unActiveColor: {
			type: String,
			default: '#909399'
		},
		// 未激活的背景
		unActiveBg: {
			type: String,
			default: '#909399'
		},
		// 已激活的背景
		activeBg: {
			type: String,
			default: '#CE2741'
		},
		// 自定义图标
		icon: {
			type: String,
			default: 'checkmark'
		},
		// step的排列方向，row-横向，column-竖向
		direction: {
			type: String,
			default: 'row'
		}
	},
	methods:{
		changeLocal(index){
			this.$emit("changeLocal",index)
		}
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

$u-steps-item-number-width: 36rpx;
$u-steps-item-dot-width: 20rpx;

.u-steps {
	@include vue-flex;
	
	.u-steps__item {
		flex: 1;
		text-align: center;
		position: relative;
		min-width: 100rpx;
		font-size: 26rpx;
		color: #8799a3;
		@include vue-flex;
		// justify-content: center;
		flex-direction: column;
		align-items: center;
		
		&--row {
			@include vue-flex;
			flex-direction: row;
			
			.u-steps__item__line {
				// position: absolute;
				z-index: 0;
				left: 75%;
				height: 6rpx;
				width: 184rpx;
				background: #D8D8D8;
				margin-top: -28rpx;
				&--dot {
					top: calc(#{$u-steps-item-dot-width} / 2);
				}
				
				&--number {
					top: calc(#{$u-steps-item-number-width} / 2);
				}
			}
		}
		
		&--column {
			@include vue-flex;
			flex-direction: row;
			justify-content: flex-start;
			min-height: 120rpx;
			
			.u-steps__item__line {
				position: absolute;
				z-index: 0;
				height: 50%;
				&--dot {
					left: calc(#{$u-steps-item-dot-width} / 2);
				}
				
				&--number {
					left: calc(#{$u-steps-item-number-width} / 2);
				}
			}
		}
		
		&__num {
			@include vue-flex;
			align-items: center;
			justify-content: center;
			width: $u-steps-item-number-width;
			height: $u-steps-item-number-width;
			border-radius: 50%;
			margin: auto;
			overflow: hidden;
		}
		
		&__dot {
			width: $u-steps-item-dot-width;
			height: $u-steps-item-dot-width;
			@include vue-flex;
			border-radius: 50%;
		}
		
		&__text--row {
			margin-top: 14rpx;
		}
		
		&__text--column {
			margin-left: 14rpx;
		}
	}
}
</style>
