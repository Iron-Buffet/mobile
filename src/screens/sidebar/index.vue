<template>
  <nb-container :style="{backgroundColor: '#000'}">
    <nb-content class="sidebar-content-wrapper" :bounces="true">
      <nb-content
        :style="stylesObj.drawerCoverObj"
      />
      <nb-list>
        <nb-list-item
          v-for="data in datas"
          :key="data.route"
          button
          noBorder
          :onPress="() => handleListItemClick(data)"
        >
          <nb-left>
            <nb-icon
              active
              :name="data.icon"
              :style="{ color: '#fff', fontSize: 26, width: 30 }"
            />
            <nb-text
              :style="{color:'#fff'}"
            >
              {{ data.name }}
            </nb-text>
          </nb-left>
          <nb-right v-if="data.types" :style="{ flex: 1 }">
            <nb-badge
              class="list-item-badge-container"
              :style="{ backgroundColor: data.bg }"
            >
              <nb-text
                class="list-item-badge-text"
                :style="stylesObj.badgeText"
              >
                {{ `${data.types} Types` }}
              </nb-text>
            </nb-badge>
          </nb-right>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import drawerCover from "../../../assets/drawer-cover.png";
import drawerImage from "../../../assets/logo-kitchen-sink.png";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      drawerCover,
      drawerImage,
      stylesObj: {
        drawerCoverObj: {
          height: deviceHeight / 10
        },
        drawerImageObj: {
          left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
          top:
            Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
          resizeMode: "cover"
        },
        badgeText: {
          fontSize: Platform.OS === "android" ? 11 : 13,
          marginTop: Platform.OS === "android" ? -3 : 0,
          fontWeight: "400"
        }
      },
      datas: [
        {
          name: "DASHBOARD",
          route: "Home",
          icon: "grid",
          bg: "#DA4437"
        },
        {
          name: "DESIGN A NEW WORKOUT",
          route: "NHDesign",
          icon: "color-wand",
          bg: "#DA4437"
        },
        {
          name: "CERTIFIED WORKOUTS",
          route: "NHCertified",
          icon: "flower",
          bg: "#DA4437"
        },
        {
          name: "WORKOUTS",
          route: "NHManagement",
          icon: "fitness",
          bg: "#DA4437"
        },
        {
          name: "EXERCISES",
          route: "NHExercises",
          icon: "clipboard",
          bg: "#DA4437"
        },
        {
          name: "PARTS",
          route: "NHParts",
          icon: "body",
          bg: "#DA4437"
        },
        {
          name: "STYLES",
          route: "NHStyles",
          icon: "leaf",
          bg: "#DA4437"
        }
      ]
    };
  },
  methods: {
    handleListItemClick(dataObj) {
      this.navigation.navigate(dataObj.route);
    }
  }
};
</script>

<style>
.sidebar-content-wrapper {
  flex: 1;
  background-color: #000;
}
.drawer-cover {
  flex: 1;
  align-self: stretch;
  position: relative;
  margin-bottom: 10;
}
.drawer-image {
  align-self: center;
  position: absolute;
  height: 75;
  width: 210;
}
.list-item-badge-container {
  border-radius: 3;
  height: 25;
  width: 72;
}
.list-item-badge-text {
  /* font-weight: 400; // not-working  */
  /* font-weight: bold; // working */
  text-align: center;
}
</style>
