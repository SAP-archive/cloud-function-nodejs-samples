/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
module.exports = function () {
    const form = document.querySelector(".top-banner form");
    const input = document.querySelector(".top-banner input");
    const msg = document.querySelector(".top-banner .msg");
    const list = document.querySelector(".ajax-section .cities");


    form.addEventListener("submit", e => {
        e.preventDefault();
        let inputVal = input.value;

        //check if there's already a city
        const listItems = list.querySelectorAll(".ajax-section .city");
        const listItemsArray = Array.from(listItems);

        if (listItemsArray.length > 0) {
            const filteredArray = listItemsArray.filter(el => {
                let content = "";
                if (inputVal.includes(",")) {
                    if (inputVal.split(",")[1].length > 2) {
                        inputVal = inputVal.split(",")[0];
                        content = el
                            .querySelector(".city-name span")
                            .textContent.toLowerCase();
                    } else {
                        content = el.querySelector(".city-name").dataset.name.toLowerCase();
                    }
                } else {
                    //athens
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                }
                return content == inputVal.toLowerCase();
            });

            if (filteredArray.length > 0) {
                msg.textContent = `You already know the weather for ${
                    filteredArray[0].querySelector(".city-name span").textContent
                    } ...otherwise be more specific by providing the country code as well 😉`;
                form.reset();
                input.focus();
                return;
            }
        }

        //ajax here

        fetch(url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: inputVal })
        })
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${
                    weather[0]["icon"]
                    }@2x.png`;

                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
                    <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                    </h2>
                    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                    <figure>
                    <img class="city-icon" src="${icon}" alt="${
                    weather[0]["description"]
                    }">
                    <figcaption>${weather[0]["description"]}</figcaption>
                    </figure>
                `;
                li.innerHTML = markup;
                list.appendChild(li);

                //remove element on delete button click
                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-btn");
                li.appendChild(deleteButton);
                deleteButton.onclick = function () {
                    li.remove();
                };
            })
            .catch(() => {
                msg.textContent = "Please search for a valid city 😩";
            });

        msg.textContent = "";
        form.reset();
        input.focus();
    });
};


