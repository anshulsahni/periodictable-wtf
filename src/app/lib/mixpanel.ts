import mixpanel from "mixpanel-browser";

mixpanel.init("b9e94f9cd63270bff68bdba3391b79e5", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default mixpanel;