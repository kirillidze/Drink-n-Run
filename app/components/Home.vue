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
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <StackLayout>
            <Label class="h2 title" text="Дата:" horizontalAlignment="center"/>
            <Label class="h1" :text="currentDate" horizontalAlignment="center"/>
            <Label class="h2 title" text="Текущий счёт:" horizontalAlignment="center"/>
            <Label 
                class="score quicksand-bold" 
                :class="scoreClasses" 
                :text="computedScore" 
                horizontalAlignment="center"
            />
            <Label class="h2 title" text="  Прогресс:" horizontalAlignment="center"/>
            <Progress class="m-x-20" :value="currentProgress" :maxValue="minTrainVal" />
            <Button 
                class="btn btn-primary btn-active btn-rounded-sm" 
                text="Сделать запись" 
                @tap="goToAddActivity" 
            />
        </StackLayout>
    </Page>
</template>

<script>
    import AddActivity from "./AddActivity";  
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        data() {
            return {
                score: 1,
                currentDate: null,
                currentProgress: 10,
                minTrainVal: 30,

                AddActivity: AddActivity,
            }
        },
        mounted() {
            this.getCurrentDate();
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        computed: {
            scoreClasses() {
                return {
                    "score--green": this.score > 0,
                    "score--red": this.score < 0,
                }
            },
            computedScore() {
                return this.score > 0 ? `+${this.score}` : this.score
            }
        },
        methods: {
            getCurrentDate() {
                const dateToday = new Date();
                const d = dateToday.getDate();
                const m = dateToday.getMonth() + 1;
                const y = dateToday.getFullYear();
                this.currentDate = (d < 10 ? '0' : '') + d + '.' + (m < 10 ? '0' : '') + m + '.' + y;
            },
            goToAddActivity() {
                console.log('taps');

                this.$navigateTo(AddActivity, {
                    clearHistory: true
                });
                //utils.closeDrawer();
            },
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .title {
        color: gray;
    }

    .score {
        font-size: 38px;
        color: black;
        &--green {
            color: green;
        }
        &--red {
            color: red;
        }
    }
</style>