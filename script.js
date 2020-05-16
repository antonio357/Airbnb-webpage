const dataBaseApiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

const getJsonUrl = async (url) => {
    let response = await fetch(url);
    if (!response.ok) response = await fetch("data.json");
    const textResponse = await response.text();
    return JSON.parse(textResponse);
};

const renderPage = async () => {
    let jsonRoomsData = await getJsonUrl(dataBaseApiUrl);

    document.getElementById("script").innerHTML = `${jsonRoomsData
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

renderPage();
