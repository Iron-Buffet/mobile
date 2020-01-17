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
        <nb-title>Design</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
    
    </nb-content>
  </nb-container>
</template>

<script>

export default {
  data: function() {
    return {
      message: "Hello World",
      text: '',
      isLoading: true,
      value: false
    };
  },
  methods: {
    handleBtnPress: function() {
      alert('Btn Press');
    },
    handleChange: function(val) {
      this.value = val;
    }
  }
};
</script>

<style>
.body-icon-color {
  color: #999;
}
</style>
