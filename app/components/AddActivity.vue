<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Add Activity"></Label>
        </ActionBar>

        <StackLayout class="page-content">
            <!-- <Label class="page-icon fa" text.decode="&#xf005;"></Label> -->
            <DatePicker v-model="selectedDate" @dateChange="onDateChange"/>
            <TextField
                class="m-x-20"
                ref="taskInput" 
                v-model="textFieldValue"
                hint="Введите значение..."
                keyboardType="number" 
            />
            <Button class="btn btn-primary btn-active btn-rounded-sm" text="Добавить" @tap="addActivity" />
        </StackLayout>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        data() {
            return {
                textFieldValue: '',
                selectedDate: new Date(),
            }
        },
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("AddActivity");
        },
        computed: {
            
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onDateChange() {
                console.log(this.selectedDate);
            },
            addActivity() {
                console.log('activity has been added');
            },
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>
