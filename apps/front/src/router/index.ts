import {createRouter, createWebHistory, useRouter} from 'vue-router'
// import registerRouteGuard from './Interceptor'
import routes from './routes'
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  routes
})

// registerRouteGuard(router)

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const {getSelf} = userStore
  const {isAdmin, isContractor, isClient, isConnected} = storeToRefs(userStore)
  const router = useRouter()
  const { admin, contractor, connected } = to?.meta;

  console.log(isConnected.value);
  if(isConnected.value) {
    await getSelf()
  }

  if (connected) {
    if(!isConnected.value) {
      next({name: 'home-page'});
    } else {
      if (admin) {
        if (!isAdmin.value) {
          next({name: 'home-page'});
        }
      } else if (contractor) {
        if (!isContractor.value) {
          next({name: 'home-page'});
        }
      }
    }
  }
  /*if (admin) {
    if (!isAdmin) {
      next({name: 'home-page'});
    }
  }

  if (contractor) {
    if (!isContractor) {
      next({name: 'home-page'});
    }
  }

  if (connected) {
    if (!isConnected) {
      next({name: 'home-page'});
    }
  }*/

  next()
})

export default router
