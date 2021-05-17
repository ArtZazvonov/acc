export default function ({ store, redirect }) {
  if (!store.getters['adminAuth/isAuth']) {
    redirect('/admin/login?messege=login')
  }
}
