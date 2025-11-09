function openMenu() {
  const menuMobile = document.getElementById("mobile-menu");
  const header = document.querySelector(".navigation");

  if (menuMobile.classList.contains("open")) {
    menuMobile.classList.remove("open");
    header.classList.remove("menu-open");
  } else {
    menuMobile.classList.add("open");
    header.classList.add("menu-open");
  }
}
