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
        <nb-title>Dashboard</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
    </nb-content>
  </nb-container>
</template>

<script>
export default {
  data() {
    return {}
  }
};
</script>

<style>
.body-icon-color {
  color: #999;
}
</style>
