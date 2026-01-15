const API_URL = "http://localhost:3000/items";

/**
 * Service function to handle the API POST request.
  */
export const createShoppingItem = async (name: string) => {
  const response = await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error("Error saving");
  return response.json();
};
