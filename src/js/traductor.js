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

    const response = await fetch(`./src/i18n/${lang}.json`);

    if (response.status === 404) {
        console.log(`No existe el archivo ${lang}.json`);
        return;
    }

    const data = await response.json();

    const archivo =
        window.location.pathname.replace("/", "").replace(".html", "") === ""
            ? "index"
            : window.location.pathname.replace("/", "").replace(".html", "");

    console.log(archivo);

    const dataCorrecto = data[archivo];

    if (!dataCorrecto) {
        console.log(`No existe la traducción para ${archivo}`);
        return;
    }

    for (const element in dataCorrecto) {
        let elemento = document.getElementById(element);
        console.log(elemento);
        elemento.innerHTML = dataCorrecto[element];
    }
}
