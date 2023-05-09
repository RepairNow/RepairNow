import ua from "ua-parser-js";
// request-ip : Get real client IP address in Node.js

const sendEvent = (data) => {
  console.log("Tracking event ", data);
  fetch("http://localhost:3000/api/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

function trackerBack({ APP_ID, SERVICE = "backend" } = {}) {
  const configData = {
    appid: APP_ID,
    service: SERVICE,
  };

  return (req, res, next) => {
    const collectedUserData = {
      ip: req.ip,
      user_agent: req.headers["user-agent"],
      ...uap(req.headers["user-agent"]),
      referer: req.headers.referer,
      lang: req.acceptsLanguages()[0],
      // id visitor,
      // id session,
    };

    req.sendTrackingEvent = (data) => {
      sendEvent({
        ...data,
        ...collectedUserData,
        ...configData,
      });
    };

    next();
  };
}

export default trackerBack;
