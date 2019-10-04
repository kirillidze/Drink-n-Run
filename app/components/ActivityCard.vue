<template>
	<StackLayout
		class="activity-card" 
		width="50%"
	>
		<CardView 
			height="150"
			elevation="10"
			margin="12" 
			radius="20"
			shadowOffsetWidth="3"
			shadowOffsetHeight="3" 
			shadowRadius="10"
		> 
			<StackLayout class="p-10"> 
				<Label
					class="h3"
					:text="item.name"
				/>
			</StackLayout>
		</CardView>
  	</StackLayout>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			}, 
		},
	}
</script>

<style lang="scss" scoped>
	.activity-card {
		&__inner {
			// border-width: 1;
    		// border-color: rgb(204, 204, 204);
			// border-radius: 8;
			//box-shadow: 0 3 6 rgba(0, 0, 0, 0.16)
		}
	}
</style>