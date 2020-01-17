<template>
  <nb-container>
    <status-bar :barStyle="'light-content'"></status-bar>
    <image-background :source="launchScreenBg" class="imageContainer">
      <view class="logoContainer" :style="stylesObj.logoContainerStyle">
        <nb-button
          :style="stylesObj.btnContainer"
          :onPress="() => handleBtnClick('NHDesign')"
        >
          <nb-text> Design a new workout</nb-text>
        </nb-button>
        <nb-button
          :style="stylesObj.btnContainer"
          :onPress="() => handleBtnClick('NHCertified')"
        >
          <nb-text> Certified Workouts</nb-text>
        </nb-button>
        <nb-button
          :style="stylesObj.btnContainer"
          :onPress="() => handleBtnClick('NHManagement')"
        >
          <nb-text> Workout Management</nb-text>
        </nb-button>
      </view>
      <view class="text-container">
        <nb-h3 :style="{ marginBottom: 8 }" class="text-color-white"
          >Iron Buffet</nb-h3
        >
        <nb-h3 class="text-color-white">Fitness App</nb-h3>
      </view>
      <view :style="{ marginBottom: 80 }">
        <nb-button
          :style="stylesObj.btnContainer"
          :onPress="handleLetGoBtnPress"
        >
          <nb-text> Menu</nb-text>
        </nb-button>
      </view>
    </image-background>
  </nb-container>
</template>

<script>
import { Dimensions, Platform, Animated, Easing } from "react-native";
import launchScreenBg from "../../../assets/bg.png";
import launchscreenLogo from "../../../assets/logo-kitchen-sink.png";

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      launchScreenBg,
      launchscreenLogo,
      stylesObj: {
        logoContainerStyle: {
          marginTop: Dimensions.get("window").height / 8
        },
        logoStyle: {
          left: Platform.OS === "android" ? 40 : 50,
          top: Platform.OS === "android" ? 35 : 60
        },
        btnContainer: {
          backgroundColor: "red",
          alignSelf: "center",
          marginBottom: 10,
          width: 200
        }
      }
    };
  },
  methods: {
    handleLetGoBtnPress() {
      this.navigation.openDrawer();
    },
    handleBtnClick(route) {
      this.navigation.navigate(route);
    },
  }
};
</script>

<style>
.imageContainer {
  flex: 1;
}
.text-color-primary {
  color: blue;
  font-family: Roboto;
}
.logoContainer {
  flex: 1;
  margin-bottom: 30;
}
.logo {
  position: absolute;
  width: 280;
  height: 100;
}
.text-container {
  align-items: center;
  margin-bottom: 50;
  background-color: transparent;
}
.text-color-white {
  color: white;
}
.button-container {
  background-color: #6faf98;
  align-self: center;
}
</style>
