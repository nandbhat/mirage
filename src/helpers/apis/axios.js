import axios from "axios";
import store from "../../redux/store";
import { showLoader, hideLoader } from "../../redux/actions";
export const initAxios = () => {
  // const baseURL = ((window.location.origin || "").includes("virgin") ? `${window.location.origin}/svc/embarkation-admin-bff` : `${window.location.origin}/embarkation-admin-bff`)
  //   axios.defaults.headers.common["Authorization"] = `${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

axios.interceptors.request.use((configuration) => {
  store.dispatch(showLoader());
  return configuration;
});

axios.interceptors.response.use(
  (configuration) => {
    store.dispatch(hideLoader());
    return configuration;
  },
  (err) => {
    console.error(err);
    store.dispatch(hideLoader());
  }
);
