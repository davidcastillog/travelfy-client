import { apiServer } from "../api/ServerAPI"
import { successStatus, internalServerError } from "../utils/clear-res";

export const uploadWs = (files) =>
apiServer
    .post("/upload", files, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(successStatus)
    .catch(internalServerError);
