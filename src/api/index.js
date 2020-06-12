import online from "./online";
import dev from "./dev";

let api;
if (process.env.VUE_APP_API === 'dev') {
    api = dev
} else if (process.env.VUE_APP_API === 'online') {
    api = online
} else {
    api = dev
}
console.log(process.env.VUE_APP_API);
export default api;