export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuth']) {
    redirect('/admin/login?messege=login')
    if (store.getters['auth/adminAccess'] !== 0) {
      redirect('/admin/login?messege=right')
    }
  }
}
