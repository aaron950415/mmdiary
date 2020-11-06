<template>
  <div>
    <label class="notes">
      <span class="name"><Icon v-if="type=== text" class="note" name="note"></Icon><Icon v-else  class="note" name="date"></Icon></span>
      <input v-if="type === 'date'"
        :type="type"
        :value="modify(value)"
        @change="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
      <input v-else
        type="text"
        :value="value"
        @change="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop() placeholder?: string;
  @Prop() text?: string;
  @Prop() type?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }

      modify(isoString: string){
          return dayjs(isoString).format('YYYY-MM-DD')
      }
}
</script>

<style scoped lang="scss">
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .note {
    width: 24px;
    height: 24px;
  }
  .name {
    padding-right: 16px;
  }
  input {
    height: 24px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>