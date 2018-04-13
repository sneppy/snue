<template>
	<div class="user-avatar"
		:class="{circle}">
		<img :src="src"/>
	</div>
</template>

<script>
/**
 * User image
 */
export default {
	name: "user-avatar",
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

