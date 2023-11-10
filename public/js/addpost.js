const postFormHandler = async (event) => {
  event.preventDefault();
  const alltext = document.querySelector("#user-post").value.trim();
  const { id, username } = await fetch("/api/users/", {
    method: "GET",
  });
  console.log(id, username, alltext);
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
