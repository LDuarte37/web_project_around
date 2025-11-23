      // BOTÓN PARA ABRIR POPUP
      const openPopupButton = document.querySelector(".profile__edit-button");
      const popup = document.querySelector("#edit-popup");
      const closePopupButton = document.querySelector(".popup__close-button");

      // INPUTS
      let nameInput = document.querySelector("#name-input");
      let jobInput = document.querySelector("#job-input");
      let formElement = document.querySelector("#edit-form");

      // BOTÓN GUARDAR
      const submitButton = document.querySelector(".popup__submit-button");

      // ELEMENTOS DEL PERFIL A MODIFICAR
      const profileName = document.querySelector(".profile__name");
      const profileRole = document.querySelector(".profile__role");

      // ----- Función para abrir popup -----
      function openPopup() {
        popup.style.display = "flex";

        // Rellenar inputs con nombre actual
        nameInput.value = profileName.textContent;
        jobInput.value = profileRole.textContent;

        checkInputs(); // Asegurar estado correcto del botón
      }

      // ----- Función para cerrar popup -----
      function closePopup() {
        popup.style.display = "none";

        // Limpiar los campos al cerrar
        nameInput.value = "";
        jobInput.value = "";
        checkInputs(); // Actualizar el estado del botón
      }

      // Eventos abrir/cerrar
      openPopupButton.addEventListener("click", openPopup);
      closePopupButton.addEventListener("click", closePopup);

      // ----- HABILITAR/DESHABILITAR BOTÓN -----
      function checkInputs() {
        if (nameInput.value.trim() !== "" && jobInput.value.trim() !== "") {
          submitButton.disabled = false;
          submitButton.classList.add("popup__submit-button_enabled");
          submitButton.classList.remove("popup__submit-button_disabled");
        } else {
          submitButton.disabled = true;
          submitButton.classList.remove("popup__submit-button_enabled");
          submitButton.classList.add("popup__submit-button_disabled");
        }
      }

      // Escucha cambios en ambos campos
      nameInput.addEventListener("input", checkInputs);
      jobInput.addEventListener("input", checkInputs);

      // ----- GUARDAR NUEVOS DATOS EN EL PERFIL -----
      formElement.addEventListener("submit", function (event) {
        event.preventDefault();

        // Cambiar el nombre y el rol en el perfil
        profileName.textContent = nameInput.value;
        profileRole.textContent = jobInput.value;

        // Cerrar popup
        closePopup();
      });