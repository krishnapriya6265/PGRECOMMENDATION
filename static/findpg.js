const district = document.getElementById("district");
const city = document.getElementById("city");
const area = document.getElementById("area");


// District → Cities
district.addEventListener("change", function () {

    fetch("/get_cities/" + this.value)

        .then(res => res.json())

        .then(data => {

            city.innerHTML = "<option value=''>Select City</option>";
            area.innerHTML = "<option value=''>Select Area</option>";

            data.cities.forEach(function (c) {

                let option = document.createElement("option");

                option.value = c;
                option.textContent = c;

                city.appendChild(option);

            });

        });

});


// City → Areas
city.addEventListener("change", function () {

    fetch("/get_areas/" + this.value)

        .then(res => res.json())

        .then(data => {

            area.innerHTML = "<option value=''>Select Area</option>";

            data.areas.forEach(function (a) {

                let option = document.createElement("option");

                option.value = a;
                option.textContent = a;

                area.appendChild(option);

            });

        });

});
// Image Slider Logic
const slider = document.querySelector(".slider");
const sliderLabel = document.getElementById("sliderLabel");

const sliderData = [
    { img: '/static/Rjy.jpg', label: 'Rajahmundry' },
    { img: '/static/Devichowk.jpg', label: 'Devi Chowk, Rajahmundry' },
    { img: '/static/double1.jpg', label: 'PGs in East Godavari' },
    { img: '/static/single1.jpg', label: 'PGs in East Godavari' },
    { img: '/static/quad2.jpg', label: 'PGs in East Godavari' },
    { img: '/static/Rajamahendravaram_Bus_station.jpg', label: 'RTC Complex, Rajahmundry' },
    { img: '/static/Kakinada-station.png', label: 'Kakinada station ' },

    { img: '/static/Bhanugudi-kakinada.jpg', label: 'Bhanugudi-Kakinada' },
    { img: '/static/Kakinada-pg.jpg', label: 'PGs in Kakinada' },
    { img: '/static/pg-kakinada.jpg', label: 'PGs in kakinada' },
    { img: '/static/Vijayawada.jpg', label: 'Vijayawada' },
    { img: '/static/Benzcircle.jpg', label: 'Benz Circle, Vijayawada' },
    { img: '/static/Vizag-station.jpg', label: 'Vizag' },
    { img: 'static/vizag-beach.jpg', label: 'Beach Road, Vizag' },
    { img: 'static/Vizag-gajuwaka.jpg', label: 'Gajuwaka, Vizag' },
    { img: '/static/quad3.jpg', label: 'PGs in Vizag' },
    { img: '/static/Triple5.jpg', label: 'PGs in Vizag' },
];

let currentIndex = 0;

const sliderMain = document.querySelector(".slider-main");

function changeImage() {
    const current = sliderData[currentIndex];
    slider.style.backgroundImage = `url('${current.img}')`;
    sliderMain.style.backgroundImage = `url('${current.img}')`;
    sliderLabel.textContent = current.label;
    currentIndex = (currentIndex + 1) % sliderData.length;
}

// Initial image
changeImage();

// Change image every 3 seconds
setInterval(changeImage, 3000);

document.getElementById("pgForm").addEventListener("submit", function (e) {

    let budget = parseInt(document.querySelector("input[name='budget']").value);

    if (budget < 4000) {

        alert("⚠️ Budget should be at least 4000");

        e.preventDefault(); // form submit stop

    } else if (budget >= 15000) {

        alert("⚠️ Please enter a budget below 15000");

        e.preventDefault(); // form submit stop

    }

});