<template>
  <div class="form">
    <b-form-textarea
      v-model="bio"
      placeholder="自己紹介"
      :rows="6">
    </b-form-textarea>
  </div>
</template>
<script>
export default {
  props: {
    bio: String
  }
}
</script>>
