const dataBaseApiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

const getJsonUrl = async (url) => {
    let response = await fetch(url);
    if (!response.ok) response = await fetch("data.json");
    const textResponse = await response.text();
    return JSON.parse(textResponse);
};

const paginateArray = (array, itemsPerPage) => {
    return array.reduce((total, current, index) => {
        const belongArray = Math.ceil((index + 1) / itemsPerPage) - 1
        total[belongArray] ? total[belongArray].push(current) : total.push([current])
        return total;
    }, [])
};

const renderPage = async (page) => {
    let jsonRoomsData = await getJsonUrl(dataBaseApiUrl);
    jsonRoomsData = paginateArray(jsonRoomsData, 10);
    

    document.getElementById("script").innerHTML = `${jsonRoomsData[page - 1]
        .map(function (room) {
        console.log("renderPage -> room", room)
            
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

renderPage(1);
