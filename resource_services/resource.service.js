const dotenv = require("dotenv");
dotenv.config();
const RESOURCE_URL = process.env.RESOURCE_URL;
const request = require("request");

exports.getResourcesFunc = (resourceId,reqId) => {
  const reqbody={"trackId":reqId}
    return new Promise(function (resolve, reject) {
       request.post(
        {
          url: `${RESOURCE_URL}/by/${resourceId}`,
          body:reqbody,
          json:true
        },
        (err, resourseResponse) => {
          const _body = resourseResponse?.body
          if (!err && _body.success === true) {
            resolve(_body);
          } else {
            resolve(_body);
          }
        }
      );
    });
  };