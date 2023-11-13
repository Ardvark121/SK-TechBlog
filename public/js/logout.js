const logoutfunc = async (event) => {
  console.log("sd");
  event.preventDefault();
  let response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to sign out.");
  }
};

document.getElementById("logoutBtn").addEventListener("click", logoutfunc);
