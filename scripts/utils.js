function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const popupList = Array.from(document.querySelectorAll(".overlay"));

    const openedPopup = popupList.find((popupElement) => {
      return popupElement.style.display === "flex";
    });

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(popupElement) {
  popupElement.style.display = "flex";
  document.addEventListener("keydown", closePopupByEsc);
}

export function closeModal(popupElement) {
  popupElement.style.display = "none";
  document.removeEventListener("keydown", closePopupByEsc);
}

export function closePopupByOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}