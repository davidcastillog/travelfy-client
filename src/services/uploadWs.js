import { apiServer } from "../api/ServerAPI";
import { successStatus, internalServerError } from "../utils/clear-res";

export const uploadWs = (file) =>
  apiServer
    .post("/upload", file)
    .then(successStatus)
    .catch(internalServerError);
