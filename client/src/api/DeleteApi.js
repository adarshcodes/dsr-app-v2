import { base_url } from "./base_url";
async function DeleteApi(main, id) {
  const response = await fetch(base_url + main, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ draft: id }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export default DeleteApi;
