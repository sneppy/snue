<template>
	<div class="user-avatar"
		:class="{circle}">
		<img :src="src"/>
	</div>
</template>

<script>
export default {
	name: 'user-avatar',

	props: {
		src: {
			type: String,
			required: true
		},

		circle: {
			type: Boolean,
			default: false
		}
	}
}
</script>
