<template>
  <nb-container :style="blackBg">
    <nb-header>
      <nb-title>WORKOUTS LIST</nb-title>
    </nb-header>
    <scroll-view :on-scroll="(event) => {loadMore(event)}" :scroll-event-throttle="400">
      <nb-content padder>
        <nb-card v-for="workout in workouts">
          <nb-card-item bordered :style="blackBg">
            <nb-left>
              <nb-thumbnail :source="thumb"></nb-thumbnail>
              <nb-body>
                <nb-text :style="whiteText">{{workout.name}}</nb-text>
                <nb-text note>{{workout.created_at}}</nb-text>
              </nb-body>
            </nb-left>
          </nb-card-item>
          <nb-card-item :style="blackBg">
            <nb-body>
              <image :source="img" class="card-item-image" :style="stylesObj.cardItemImage"/>
              <nb-text :style="whiteText">{{workout.description}}</nb-text>
            </nb-body>
          </nb-card-item>
          <nb-card-item :style="blackBg">
            <nb-left>
              <nb-button transparent>
                <nb-icon :style="{color: '#DA4437'}" name="logo-github"></nb-icon>
                <nb-text :style="{color: '#DA4437'}">8000 stars</nb-text>
              </nb-button>
            </nb-left>
            <nb-right>
              <nb-button transparent @press="goToWorkout(workout.id)">
                <nb-text :style="{color: '#DA4437'}">View</nb-text>
              </nb-button>
            </nb-right>
          </nb-card-item>
        </nb-card>
      </nb-content>
    </scroll-view>
    <view :style="{flex: 1, justifyContent: 'center'}" v-if="loading">
      <activity-indicator size="large" color="gray"/>
    </view>
  </nb-container>

</template>

<script>
  import axios from "axios"
  import thumb from '../../../assets/icon2.png'
  import img from '../../../assets/bg.png'
  import { Dimensions } from "react-native";
  const deviceWidth = Dimensions.get("window").width;
  export default {
    props: {
      navigation: {
        type: Object
      }
    },
    data: function () {
      return {
        thumb,
        img,
        loading: false,
        workouts: [],
        per_page: 15,
        stylesObj: {
          cardItemImage: {
            resizeMode: "cover",
            width: deviceWidth / 1.18
          }
        },
        blackBg: {
          backgroundColor: '#000'
        },
        whiteText: {
          color: '#fff'
        }
      }
    },
    mounted: function () {
      this.getData();
    },

    methods: {
      getData: function () {
        let uri = 'http://api.ironbuffet.localhost/workout/certified';
        this.loading = true;
        axios.get(uri, {
          params: {
            per_page: this.per_page
          }
        }).then((result) => {
          let response = result.data;
          for (let i in response) {
            this.workouts.push(response[i]);
          }
          this.loading = false;
        }).catch((error) => {
          alert(error)
          console.log(error)
        })
      },
      loadMore: function (event) {
        let paddingToBottom = 0;
        paddingToBottom += event.nativeEvent.layoutMeasurement.height;
        if (event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - paddingToBottom) {
          this.getData()
        }
      },
      goToWorkout(id) {
        console.log(this.blackBg) // this is correct. incorrect navigation
        this.navigation.navigate("NHViewWorkout");
      }
    }
  }
</script>

<style>
.card-item-image {
  align-self: center;
  height: 150;
  margin-vertical: 5;
}
</style>
