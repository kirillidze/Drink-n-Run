import Vue from "nativescript-vue";
import App from "./components/App";
// import Home from "./components/Home";
// import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import CalendarView from "nativescript-ui-calendar/vue";
import firebase from "nativescript-plugin-firebase";

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

Vue.use(RadSideDrawer);
Vue.use(CalendarView);
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    render (h) {
        return h(
          App,
          // [
          //   h(DrawerContent, { slot: 'drawerContent' }),
          //   h(Home, { slot: 'mainContent' })
          // ]
        )
      }
  }).$start();
