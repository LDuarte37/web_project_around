# Around the U.S.

## Descripción

Around the U.S. es una página web interactiva que permite a los usuarios editar la información de su perfil, agregar nuevas tarjetas con imágenes de lugares, dar "Me gusta" a las tarjetas, eliminarlas y visualizar las imágenes en tamaño ampliado.

Este proyecto fue desarrollado como parte del programa de Desarrollo Web de TripleTen. En esta etapa, el código JavaScript fue refactorizado utilizando programación orientada a objetos y módulos.

## Funcionalidades

- Editar el nombre y la descripción del perfil.
- Agregar nuevas tarjetas mediante un formulario.
- Eliminar tarjetas.
- Dar y quitar "Me gusta" a las tarjetas.
- Abrir imágenes en una ventana emergente.
- Cerrar ventanas emergentes mediante:
  - El botón de cierre.
  - La tecla Escape.
  - Un clic fuera del contenido del popup.
- Validación de formularios en tiempo real.
- Diseño adaptable para diferentes tamaños de pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Programación orientada a objetos
- Clases de JavaScript
- Módulos ES6
- Metodología BEM
- Git y GitHub
- Diseño responsivo

## Estructura de JavaScript

El proyecto divide la lógica principal en diferentes módulos:

- `Card.js`: crea y controla cada tarjeta.
- `FormValidator.js`: gestiona la validación de los formularios.
- `Section.js`: renderiza y agrega elementos a la sección de tarjetas.
- `Popup.js`: contiene el comportamiento común de las ventanas emergentes.
- `PopupWithImage.js`: controla la ventana emergente para visualizar imágenes.
- `PopupWithForm.js`: controla las ventanas emergentes que contienen formularios.
- `UserInfo.js`: obtiene y actualiza la información del perfil.
- `index.js`: crea las instancias de las clases y conecta los componentes de la aplicación.

## GitHub Pages

Puedes ver el proyecto publicado aquí:

[Ver proyecto en GitHub Pages](https://lduarte37.github.io/web_project_around/)