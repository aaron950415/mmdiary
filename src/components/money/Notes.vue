<template>
 <div>
<label class="notes">
    <span class="name"><Icon class="note" name='note'></Icon></span>
    <input type="text" :value="value" @blur="onValueChanged($event.target.value)" :placeholder="this.placeholder">
</label>
 </div>
</template>

<script lang="ts">
import { Vue,Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue{
 @Prop({default:''}) value!: string
 @Prop() placeholder?: string
 
 onValueChanged(value: string){
     this.$emit('update:value',value)
 }
}
</script>

<style scoped lang="scss">
.notes{
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .note{
        width: 24px;
        height: 24px;
    }
    .name{
        padding-right: 16px;
    }
    input{
        height: 40px;
        flex-grow: 1;
        background:transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>