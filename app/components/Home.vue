<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap" />
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

        <Gridlayout rows="*, auto">
            <ScrollView rowSpan="2"> 
                <StackLayout class="p-20">
                    <Gridlayout columns="auto, *">
                        <Label v-if="score > 0" col="0" class="status-ico fa" text.decode="&#xf164;"/>
                        <Label v-else-if="score < 0" col="0" class="status-ico fa" text.decode="&#xf165;"/>
                        <Label v-else col="0" class="status-ico fa" text.decode="&#xf11a;"/>
                        <StackLayout col="1">
                            <Label class="h2 title" text="Дата:" horizontalAlignment="left"/>
                            <Label class="h2" :text="currentDate" horizontalAlignment="left"/>
                            <Label class="h2 title" text="Текущий счёт:" horizontalAlignment="left"/>
                            <Label 
                                class="score quicksand-bold" 
                                :class="scoreClasses" 
                                :text="computedScore" 
                                horizontalAlignment="left"
                            />
                        </StackLayout>
                    </Gridlayout>

                    <StackLayout class="m-b-20">
                        <Label class="h2 title" text="Прогресс:" />
                        <Progress :value="currentProgress" :maxValue="minTrainVal" />
                    </StackLayout>

                    <FlexboxLayout class="activities" flexWrap="wrap">
                        <ActivityCard
                            v-for="(activity, key) in activities"
                            :key="key"
                            :item="activity"
                        />
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>

            <Gridlayout row="1" columns="*, auto"> 
                <Button 
                    col="1"
                    class="btn btn-primary btn-active circle fa" 
                    text.decode="&#xf067;"
                    :fontSize="32"
                    @tap="goToAddActivity" 
                    :textWrap="true"
                    width="50"
                    height="50"
                />
            </Gridlayout>
        </Gridlayout>
    </Page>
</template>

<script>
    import AddActivity from "./AddActivity";  
    import ActivityCard from "./ActivityCard"; 
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        components: {
            ActivityCard,
        },

        data() {
            return {
                score: 1,
                currentDate: null,
                currentProgress: 10,
                minTrainVal: 30,

                activities: [
                    { name: 'Бег'},
                    { name: 'Тренировка'},
                    { name: 'Напиток'},
                ],

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
            },
            computedIco() {
                if(this.score > 0) return '&#xf164;';
                if(this.score < 0) return '&#xf165;';
                return '&#xf11a;'
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
    .status-ico {
        font-size: 120;
        color: $page-icon-color;
        margin-right: 20;
    }

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

    .activities {
        margin: -10;
        padding-bottom: 10;
    }
</style>