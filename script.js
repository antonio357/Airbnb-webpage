const dataBaseApiUrl =
    "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let jsonRoomsData = 1;
let currentPage = 1;

const getJsonUrl = async (url) => {
    let response = await fetch(url);
    if (!response.ok) response = await fetch("data.json");
    const textResponse = await response.text();
    return JSON.parse(textResponse);
};

const paginateArray = (array, itemsPerPage) => {
    return array.reduce((total, current, index) => {
        /* console.log("paginateArray -> total", total)
        console.log("paginateArray -> current", current)
        console.log("paginateArray -> index", index) */
        const belongArray = Math.ceil((index + 1) / itemsPerPage) - 1;
        /* console.log("paginateArray -> belongArray", belongArray) */
        total[belongArray]
            ? total[belongArray].push(current)
            : total.push([current]);
        /* console.log("paginateArray -> total", total) */
        return total;
    }, []);
};

const renderPage = () => {

    document.getElementById("script").innerHTML = `${jsonRoomsData[--currentPage]
        .map(function (room) {
            return `
        <div class="card">
        <div class="cardImg">
            <img
                src=${room.photo}
            />
        </div>
        <div class="cardText">
            <div>${room.property_type}</div>
            <div>${room.name}</div>
            <div>R$: ${room.price}</div>
        </div>
    </div>`;
        })
        .join("")}`;
};

const renderisação = () => {
    
}


const createPaginationMenu = async () => {
    jsonRoomsData = await getJsonUrl(dataBaseApiUrl);
    jsonRoomsData = paginateArray(jsonRoomsData, 8);

    renderPage()

    let paginationMenu = document.querySelector(".pagination-menu");
    console.log("createPaginationMenu -> paginationMenu", paginationMenu);
    let pages = [];
    if (jsonRoomsData.length > 1) {
        for (let i = 0; i < jsonRoomsData.length; i++) {
            pages.push(document.createElement("button"));
            pages[i].innerHTML = i + 1;
            pages[i].addEventListener('click', () => {
                currentPage = i + 1;
                renderPage()
            });
            paginationMenu.appendChild(pages[i]);
        }
    }
    
};

createPaginationMenu();
