let options = {};

// see if we need to export this
const sendEvent = (data) => {
  data.appid = options.APP_ID;

  fetch("http://localhost:3000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, ...options.senderData }),
  });
};

const eventListeners = {};
const SEND_EVENT = Symbol();

export default {
  install(Vue, _options) {
    // Manage ID VISITOR, SESSION, PAGE, EVENT, USER, APP, ORGANIZATION, TEAM ..
    options.senderData = {
      appid: options.APP_ID,
    };

    options.idleTimeout = _options.idleTimeout || 15 * 60 * 1000;

    Vue.directive("tracker", {
      mounted(el, binding) {
        console.log(binding);
        eventListeners[binding.value] = () => {
          sendEvent({
            tag: binding.value,
            event_type: "click",
          });
        };
        el.addEventListener("click", eventListeners[binding.value]);
      },
      unmounted(el, binding) {
        el.removeEventListener("click", eventListeners[binding.value]);
        delete eventListeners[binding.value];
      },
    });

    const customSendEvent = (data) => {
      sendEvent({
        ...data,
        appId: APP_ID,
        idVisitor: "ID_VISITOR",
        idSession: "ID_SESSION",
      });
    };
    Vue.provide(SEND_EVENT, customSendEvent);
  },
};

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0);
  const y = ref(0);
  const sendEvent = inject(SEND_EVENT);

  // a composable can update its managed state over time.
  function update(event) {
    sendEvent({
      tag: "mouse",
      event_type: "mousemove",
      x: event.pageX,
      y: event.pageY,
    });
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // expose managed state as return value
  return { x, y };
}
