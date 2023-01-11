//require('dotenv').config();

//const token = process.env.API_AUTH;
//const diagnosisURL = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[16]&gender=male&year_of_birth=2012&token=${token}&format=json&language=en-gb`
let diagnosisBtn = document.getElementById('get-diagnosis-btn')

// function to retrieve diagnosis from API
// const getDiagnosis = () => {
//     console.log('Successful click')
//     fetch(diagnosisURL)
//     .then(function (response) {
//         console.log(response)
//     })
//     .then(function(data) {
//         console.log(data)
//     })
// }

function getDiagnosis() {
    console.log('successful click')
}

document.addEventListener(diagnosisBtn, getDiagnosis)

console.log("Successful log!")

