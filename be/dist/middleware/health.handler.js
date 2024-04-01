export var healthHandler = function (req, res, next) {
    res.send({ data: null, msg: "service is health" });
};
export default healthHandler;
