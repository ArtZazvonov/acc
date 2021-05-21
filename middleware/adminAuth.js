export default function ({ store, redirect }) {
  const user = store.getters['auth/getUser']
  if (!store.getters['auth/isAuth']) {
    redirect('/admin/login?messege=login')
  } else if (user.role !== 0) {
    redirect('/admin/login?messege=right')
  }
}
