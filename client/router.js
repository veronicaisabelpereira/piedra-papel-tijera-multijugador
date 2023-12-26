"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const root = document.querySelector(".root");
const router = new router_1.Router(root);
router.setRoutes([
    { path: "/", component: "welcome-page" },
    { path: "/main", component: "welcome-page" },
    { path: "/enter-room", component: "enter-room" },
    { path: "/sign-in", component: "signin-page" },
    { path: "/error", component: "error-page" },
    { path: "/share-code", component: "code-room" },
    { path: "/start", component: "start-page" },
    { path: "/waiting", component: "waiting-page" },
    { path: "/countdown", component: "countdown-page" },
    { path: "/moves", component: "moves-page" },
    { path: "/results", component: "results-page" },
    { path: "(.*)", redirect: "/main" },
]);
/**
 Este fragmento de código está importando la clase Router del módulo "@vaadin/router". Luego, crea una nueva instancia de la clase Router, pasando un elemento HTML con la clase "root". Se llama al método router.setRoutes() para definir las rutas de la aplicación. Cada ruta se define como un objeto con una propiedad path que especifica la ruta URL y una propiedad component que especifica el componente a renderizar para esa ruta. También se especifica una ruta de captura todo con la ruta (.*), que redirige a la ruta "/main".
 */
