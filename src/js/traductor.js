const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

window.onload = function () {
    const lang = urlParams.get("lang");
    if (lang) {
        changeLanguage(lang);
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            const href = link.getAttribute("href");
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

    const response = await fetch(`./i18n/${lang}.json`);

    if (response.status === 404) {
        console.log(`No existe el archivo ${lang}.json`);
        return;
    }

    const data = await response.json();

    console.log(data)

    for (const element in data) {
        console.log(element, data[element]);
        let elemento = document.getElementById(element);
        console.log(elemento)
        elemento.innerHTML = data[element];
    }
}
