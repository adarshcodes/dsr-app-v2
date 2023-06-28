import { base_url } from "./base_url";
async function Api(main, method, body) {
  const response = await fetch(base_url + main, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authToken"),
    },
    body: body
      ? JSON.stringify(body)
      : JSON.stringify({
          user: localStorage.getItem("authToken"),
        }),
  });

  return await response.json();
}

export default Api;
