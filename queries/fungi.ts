export async function fetchGame() {
  return await fetch("/api/game")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to fetch posts...");
    });
}