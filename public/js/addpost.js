const postFormHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector("#user-post").value.trim();
  if (content) {
    let response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log(response);
    } else {
      alert("Failed to log post.");
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
