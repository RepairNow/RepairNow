import {createRouter, createWebHistory, useRouter} from 'vue-router'
// import registerRouteGuard from './Interceptor'
import routes from './routes'
import {useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  routes
})

// registerRouteGuard(router)

router.beforeEach(async (to, from, next) => {
  const {isAdmin, isContractor, isClient, isConnected, getSelf} = useUserStore()
  const router = useRouter()
  const { admin, contractor, connected } = to?.meta;

  if(isConnected()) {
    await getSelf()
  }

  if (connected) {
    if(!isConnected()) {
      next({name: 'home-page'});
    } else {
      if (admin) {
        if (!isAdmin()) {
          next({name: 'home-page'});
        }
      } else if (contractor) {
        if (!isContractor()) {
          next({name: 'home-page'});
        }
      }
    }
  }
  /*if (admin) {
    if (!isAdmin()) {
      next({name: 'home-page'});
    }
  }

  if (contractor) {
    if (!isContractor()) {
      next({name: 'home-page'});
    }
  }

  if (connected) {
    if (!isConnected()) {
      next({name: 'home-page'});
    }
  }*/

  next()
})

export default router
