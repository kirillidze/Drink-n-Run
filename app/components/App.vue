<template lang="html">
  <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <DrawerContent :user="{name: 'user name', email: 'email'}" />
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <Home />
    </Frame>
  </RadSideDrawer>
</template>

<script>
	import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
	import Home from "./Home";
	import DrawerContent from "./DrawerContent";
	import firebase from "nativescript-plugin-firebase";
    
    export default {
		components: {
			DrawerContent,
			Home,
		},
        data () {
          return {
			transition: new SlideInOnTopTransition(),
			user: "kirilidze",
          }
        },
        mounted () {
			firebase.login({ type: firebase.LoginType.ANONYMOUS })
				.then(user => {
					alert(`User uid: ${user.uid}`)
				})
				.catch(error => {
					alert(`Error login: ${error}`)
				});

			const users = firebase.getValue('/users')
				.then(result => console.log(JSON.stringify(result)))
				.catch(error => console.log("Error: " + error));

			console.log(users);
        },
  }
</script>

<style lang="css">
</style>
