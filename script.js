document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".draggable").forEach(el => {
    dragElement(el);
  });
});

function dragElement(elmnt) {
  const container = elmnt.parentElement;

  let shiftX = 0;
  let shiftY = 0;
  let dragging = false;

  // ensure element has positioning
  if (!elmnt.style.left) elmnt.style.left = elmnt.offsetLeft + "px";
  if (!elmnt.style.top) elmnt.style.top = elmnt.offsetTop + "px";

  elmnt.addEventListener("mousedown", (e) => {
    e.preventDefault();

    dragging = true;

    const rect = elmnt.getBoundingClientRect();

    shiftX = e.clientX - rect.left;
    shiftY = e.clientY - rect.top;

    elmnt.style.transform = "rotate(0deg)";
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const containerRect = container.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - shiftX;
    let newTop = e.clientY - containerRect.top - shiftY;

    const maxLeft = containerRect.width - elmnt.offsetWidth;
    const maxTop = containerRect.height - elmnt.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    elmnt.style.left = newLeft + "px";
    elmnt.style.top = newTop + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;

    dragging = false;

    const rotation = (Math.random() - 0.5) * 10;
    elmnt.style.transform = `rotate(${rotation}deg)`;
  });
}