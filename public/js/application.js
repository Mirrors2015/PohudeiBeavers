const photo = document.querySelector("#photo");

async function a() {
  const responce = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  let jsonFromBack = await responce.json();
  photo.src = `/images/${jsonFromBack.key}`;
}
setInterval(a, 1000);
