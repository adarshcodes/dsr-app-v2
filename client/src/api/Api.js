import { base_url } from "./base_url";

async function Api({ main, method }) {
  const response = await fetch(base_url + main, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: JSON.parse(localStorage.getItem("usercred"))._id,
    }),
  });
  const data = await response.json();
  return data;
}
export default Api();
