<template>

    <button class="button" @click="$emit('click',$event)">
      <slot></slot>
    </button>

</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>
