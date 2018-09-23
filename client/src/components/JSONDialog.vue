<template>
  <div>
    <p>コピーしたJSON文字列からリストを生成できます</p>
    <div class="form">
      <b-form-textarea
        v-model="mondaiJSON"
        class="form-control"
        placeholder="JSON"
        :rows="6">
      </b-form-textarea>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mondaiJSON: String
  }
}
</script>
