import config from "./config.js";
export var log = function (msg, mode) {
    if (mode === void 0) { mode = "info"; }
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
