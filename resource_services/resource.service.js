const dotenv = require("dotenv");
dotenv.config();
const RESOURCE_URL = process.env.RESOURCE_URL;
const request = require("request");

exports.getResourcesFunc = (resourceId) => {
    return new Promise(function (resolve, reject) {
      request.get(
        {
          headers: { "content-type": "application/json" },
          url: `${RESOURCE_URL}/by/${resourceId}`,
        },
        (err, resourseResponse) => {
          const _body = JSON.parse(resourseResponse?.body);
          if (!err && _body.success === true) {
            resolve(_body);
          } else {
            resolve(_body);
          }
        }
      );
    });
  };