const router = require("express").Router();
const lodash = require("lodash");
const Response = require("../services/Response");

/**
 * res.ok(data)
 */
router.use((req, res, next) => {
  res.ok = (status, data, notification = {}) => {
    let showNull = res.query.showNull || false;
    removeNullableNestedObject(data, showNull, function (response) {
      let resp = new Response(response, null, notification);
      res.status(status).json(resp);
    });
  };
  res.badRequest = (status, err, data = {}) => {
    // if (err.req) {
    // err.clientInfo = {
    //   token: req.headers.token,
    //   body: err.req.body,
    //   method: err.req.method,
    //   url: err.req.originalUrl,
    //   address: err.req._remoteAddress,
    //   deviceType: err.req.headers.devicetype,
    //   appVersion: err.req.headers.appversion,
    // };
    // delete err.req;
    // }
    if (typeof err === "object") {
      let response = new Response(data, err, {});
      response.getError((errorResp) => {
        res.status(status).json(errorResp);
      });
    }
  };
  next();
});

module.exports = router;

const removeNullableNestedObject = function (params, showNull, callback) {
  try {
    params = pruneEmpty(params, showNull);
  } catch (ex) {
    console.log(ex);
    console.error("Error when remove nullable nested objects", ex);
  }
  callback(params);
};

function pruneEmpty(obj, showNull) {
  return (function prune(current) {
    lodash.forOwn(current, function (value, key) {
      if (
        lodash.isUndefined(value) ||
        lodash.isNull(value) ||
        lodash.isNaN(value) ||
        (lodash.isString(value) && lodash.isEmpty(value)) ||
        (lodash.isObject(value) &&
          lodash.isEmpty(prune(value)) &&
          !lodash.isDate(value))
      ) {
        if (showNull) current[key] = "";
        if (showNull && lodash.isNumber(current[key]))
          return (current[key] = 0);
        if (showNull && lodash.isArray(value)) return (current[key] = []);
        delete current[key];
      }
    });
    if (lodash.isArray(current)) lodash.pull(current, undefined);

    return current;
  })(lodash.cloneDeep(obj));
}
