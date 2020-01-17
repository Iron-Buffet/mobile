<template>
  <nb-container :style="{ backgroundColor: '#000' }">
    <nb-header>
      <nb-left>
        <nb-button
          transparent
          :onPress="() => this.props.navigation.openDrawer()"
        >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Single workout</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
      <nb-card>
        <nb-card-item class="black-background" header button :onPress="handleBtnPress">
          <nb-text class="black-background">Interactive header</nb-text>
        </nb-card-item>
        <nb-card-item class="black-background">
          <nb-text class="black-background">{{item.name}}</nb-text>
        </nb-card-item>
        <nb-card-item class="black-background" footer>
          <nb-text class="black-background">GeekyAnts</nb-text>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>
  import axios from "axios"
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
    return {
      isLoading: true,
      item: false,
      id: null
    };
  },
  beforeMount() {
    const id = this.navigation.getParam('id');
    this.id = id
    this.getData(id)
  },
  methods: {
    handleBtnPress: function() {
      alert('Current id - ' + this.id);
    },
    getData: function (id) {
      let uri = 'http://api.ironbuffet.localhost/workout/' + id;
      this.loading = true;
      axios.get(uri, {
        params: {
          per_page: this.per_page
        }
      }).then((result) => {
        this.item = result.data;
        this.loading = false;
      }).catch((error) => {
        alert(error)
        console.log(error)
      })
    },
  }
};
</script>

<style>
.body-icon-color {
  color: #999;
}

.black-background {
  backgroundColor: #000;
  color: #fff
}
</style>
