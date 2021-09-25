/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//Personal API key 
const key = '&appid=afd437b48d016dcff3e8f2ad67b60666';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();

//Event Listener on click 
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate)
    getWeather(baseUrl, zipCode, key)
        // New Syntax!
        .then(function (data) {
            // Add data
            console.log(data)
            postData('/add', {
                temp: data.main.temp,
                date: newDate,
                feelings: feelings
            });
            updateUI('/all');
        })
};

// GET Web API Data 
const getWeather = async (baseUrl, zipCode, key) => {
    const response = await fetch(baseUrl + zipCode + key + '&units=imperial');
    console.log(response);
    // Transform into JSON
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    };
};

//POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    };
};

// Update user interface
const updateUI = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    };
}