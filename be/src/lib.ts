import config from "./config.js";

export const log = (msg: string, mode = "info") => {
  // tslint:disable-next-line:no-console
  if (config.APP_ENV != "prod") {
    switch (mode) {
      case "error":
        console.error("[error] ".concat(msg));
        break;
      case "warn":
        console.warn("[warn] ".concat(msg));
        break;
      default:
        console.info("[info] ".concat(msg));
    }
  }
};
