const selector = document.getElementById("lenguaje");
const url = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";
const cambio = document.getElementById("subCuadro");
const desc = document.getElementById("parrafo");
const estrella = document.getElementById("estrellas");
const link = document.getElementById("link");
let url2;
const tex = document.getElementById("texto");
const boton = document.getElementById("boton");
// aqui recorre y agrega nuveas opciones al selector 
fetch(url)
.then(response =>{
    return response.json();
})

.then(data => {
    data.forEach(element => {
        const nuevaOpcion = document.createElement("option");
        nuevaOpcion.textContent = element.title;
        selector.appendChild(nuevaOpcion);


        boton.addEventListener('click', function() {
        cambio.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        cambio.className = "subCuadro";
        desc.textContent = "";
        estrella.textContent = "";
        link.textContent = "";
        selector.appendChild(nuevaOpcion);
        tex.textContent = "Buscando repositorio..."; 
        boton.style.display = "none";
        });

    });
});// aqui termina con el ; las conexiones de los then

//evento cuando el ususario cambia de opcion dentro del selector
selector.addEventListener('change', (evento) => {
    cambio.className = "subCuadro";
    desc.textContent = "";
    estrella.textContent = "";
    link.textContent = "";
    tex.textContent = "Buscando repositorio...";  // cambia el texto actual por este nuevo 
    const valorSeleccionado = evento.target.value;
    url2 = `https://api.github.com/search/repositories?q=language:${valorSeleccionado}&sort=stars&order=desc&per_page=10`;

fetch(url2)
.then(response =>{
    return response.json();
})
.then(data =>{

    if(data.total_count === 0 || !data.items || data.items.length === 0){
        tex.textContent = "No se encontro repositorios";
        cambio.style.backgroundColor = "rgba(255, 0, 0, 0.801)";
        boton.style.display = "block";
        boton.style.backgroundColor = "red";
    }
    else{
    cambio.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    const random = Math.floor(Math.random() * data.items.length);
    const repositorio = data.items[random];

    cambio.className = "subCuadro_2";
    tex.textContent = repositorio.full_name;
    desc.textContent = repositorio.description;
    estrella.textContent = "⭐: "+ repositorio.stargazers_count;
    link.textContent = repositorio.language;
    link.href = repositorio.html_url;

    if (repositorio.description.length < 50) {
    desc.style.fontSize = "18px";  // Texto grande si es corto
    } else if (repositorio.description.length < 150) {
        desc.style.fontSize = "14px";  // Mediano si es de longitud media
    } else {
        desc.style.fontSize = "12px";  // Pequeño si es muy largo
    }
    boton.style.display = "block";
    boton.style.backgroundColor = "black";
    }

})


});

