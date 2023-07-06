export const LOCALHOST_GEO_DATA = {
  city: "San Francisco",
  region: "CA",
  country: "US",
  latitude: "37.7695",
  longitude: "-122.385",
};
export const LOCALHOST_IP = "63.141.56.109";

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.15, ease: "easeOut" },
};

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const HOME_HOSTNAMES = new Set([
  // comment for better diffs
  "internal-short.shopmy.com.au",
  "localhost",
  "localhost:3000",
]);

export const APP_HOSTNAMES = new Set([
  "internal-short.shopmy.com.au",
  "app.localhost:3000",
  "preview.internal-short.shopmy.com.au",
]);

export const DEFAULT_REDIRECTS = {
  home: "https://internal-short.shopmy.com.au",
  dub: "https://internal-short.shopmy.com.au",
  signin: "https://internal-short.shopmy.com.au/login",
  login: "https://internal-short.shopmy.com.au/login",
  register: "https://internal-short.shopmy.com.au/register",
  signup: "https://internal-short.shopmy.com.au/register",
  app: "https://internal-short.shopmy.com.au",
  dashboard: "https://internal-short.shopmy.com.au",
  links: "https://internal-short.shopmy.com.au/links",
  settings: "https://internal-short.shopmy.com.au/settings",
  welcome: "https://internal-short.shopmy.com.au/welcome",
  slack: "https://dub.slack.com",
  discord: "https://twitter.com/dubdotsh", // placeholder for now
  tags: "https://internal-short.shopmy.com.au/changelog/introducing-tags",
};

export const REDIRECT_HEADERS = {
  headers: {
    "x-powered-by": "internal-short.shopmy.com.au - Link management for modern marketing teams",
  },
};

export const FAVICON_FOLDER = "/_static/favicons";
export const GOOGLE_FAVICON_URL =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
export { default as COUNTRIES } from "./countries";
export { default as ccTLDs } from "./cctlds";

export const SECOND_LEVEL_DOMAINS = new Set([
  "com",
  "co",
  "net",
  "org",
  "edu",
  "gov",
  "in",
]);

export const SPECIAL_APEX_DOMAINS = {
  "youtu.be": "youtube.com",
};

export const DEFAULT_LINK_PROPS = {
  key: "github",
  url: "https://github.com/steven-tey/dub",
  domain: "internal-short.shopmy.com.au",
  archived: false,
  expiresAt: null,
  password: null,

  title: null,
  description: null,
  image: null,
  ios: null,
  android: null,

  remark: null,

  clicks: 0,
  userId: "",

  proxy: false,
};

export const DUB_PROJECT_ID = "cl7pj5kq4006835rbjlt2ofka";
