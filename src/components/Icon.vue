<template>
  
    <svg class="icon">
      <use :xlink:href="'#'+name"/>
      
    </svg>
  
</template>

<script>
const importAll = requireContext => requireContext.keys().map(requireContext);
importAll(require.context('../assets/icons',true, /\.svg$/));
export default{
  props: ['name'],
  name:'Icon'
}
</script>

<style scoped>
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
