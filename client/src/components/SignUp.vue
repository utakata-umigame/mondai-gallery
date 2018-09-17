<template>
  <div>
    <h2>ユーザー登録</h2>
    <form :class="input-group" method="post" class="mb-2">
      <label>ニックネーム</label>
      <input class="form-control mb-2" type="text" name="nickname" placeholder="Nickname" required="required">
      <label>ユーザー名(英数、必須)</label>
      <input class="form-control mb-2" type="text" name="username" placeholder='User Name' required="required">
      <label>パスワード(英数、必須)</label>
      <input class="form-control mb-2" type="password" name="password" placeholder='Password' required="required">
      <input class="btn btn-primary mb-2" type="submit" value='新規登録'>
    </form>
  </div>
</template>
