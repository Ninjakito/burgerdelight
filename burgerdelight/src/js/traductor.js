const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

window.onload = function () {
    const lang = urlParams.get("lang");
    if (lang) {
        changeLanguage(lang);
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href.includes("?lang=")) {
                return; 
            }
            link.setAttribute("href", href + "?lang=" + lang);
        });
    }
};

async function changeLanguage(lang) {
    const newURL =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?lang=" +
        lang;
    window.history.replaceState({}, "", newURL);

    const response = await fetch(`/src/i18n/${lang}.json`);

    if (response.status === 404) {
        console.log(`No existe el archivo ${lang}.json`);
        return;
    }

    const data = await response.json();

    const url = window.location.pathname.split("/");
    const archivo = url[url.length - 1];
    const seccion = archivo.split(".")[0] == "" ? "index" : archivo.split(".")[0];

    const dataCorrecto = data[seccion];

    if (!dataCorrecto) {
        console.log(`No existe la traducción para ${seccion}`);
        return;
    }

    for (const element in dataCorrecto) {
        let elemento = document.getElementById(element);
        try {
            elemento.innerHTML = dataCorrecto[element];
        } catch (error) {
            console.log(`No se pudo traducir ${element}: ${error}`);
        }
    }
}
