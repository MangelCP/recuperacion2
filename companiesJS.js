// Datos 
var data = {
    "companies": [
        {
            "continent": "Africa",
            "countries": [
                {
                    "name": "Egypt",
                    "companies": [
                        {"Air Arabia Egypt": {"IATA": "E5", "ICAO": "RGB"}},
                        {"Air Leisure": {"IATA": "AL", "ICAO": "ALD"}},
                        {"Aviator Airlines": {"IATA": "T9", "ICAO": "AVV"}},
                        {"Air Arabia Egypt": {"IATA": "E5", "ICAO": "RGB"}}
                    ]
                },
                {
                    "name": "Kenya",
                    "companies": [
                        {"Air Peace": {"IATA": "APK", "ICAO": "A4"}},
                        {"Forty Five Aviation": {"IATA": "FFV", "ICAO": "5H"}}
                    ]
                },
                {
                    "name": "Morocco",
                    "companies": [
                        {"Air Arabia Maroc": {"IATA": "MAC", "ICAO": "30"}}
                    ]
                },
                {
                    "name": "South Africa",
                    "companies": [
                        {"Kulula": {"IATA": "CAW", "ICAO": "MN"}},
                        {"Mango Airlines": {"IATA": "MNO", "ICAO": "JE"}},
                        {"Namibia Flyafrica": {"IATA": "NMD", "ICAO": "N6"}},
                        {"Safair": {"IATA": "SFR", "ICAO": "FA"}}
                    ]
                },
                {
                    "name": "Tanzania",
                    "companies": [
                        {"Fastjet": {"IATA": "FTZ", "ICAO": "FN"}}
                    ]
                },
                {
                    "name": "Nigeria",
                    "companies": [
                        {"Arik Air": {"IATA": "W3", "ICAO": "ARA"}},
                        {"Dana Air": {"IATA": "9J", "ICAO": "DAE"}}
                    ]
                },
                {
                    "name": "Ethiopia",
                    "companies": [
                        {"Ethiopian Airlines": {"IATA": "ET", "ICAO": "ETH"}}
                    ]
                }
            ]
        },
        {
            "continent": "Asia and the Pacific",
            "countries": [
                {
                    "name": "Australia",
                    "companies": [
                        {"Jetstar": {"IATA": "JJP", "ICAO": "JQ"}},
                        {"Virgin Australia": {"IATA": "VOZ", "ICAO": "VA"}}
                    ]
                },
                {
                    "name": "Japan",
                    "companies": [
                        {"All Nippon Airways": {"IATA": "NH", "ICAO": "ANA"}},
                        {"Japan Airlines": {"IATA": "JL", "ICAO": "JAL"}}
                    ]
                }
            ]
        },
        {
            "continent": "Europe",
            "countries": [
                {
                    "name": "France",
                    "companies": [
                        {"Air France": {"IATA": "AF", "ICAO": "AFR"}}
                    ]
                },
                {
                    "name": "Germany",
                    "companies": [
                        {"Lufthansa": {"IATA": "LH", "ICAO": "DLH"}},
                        {"Condor": {"IATA": "DE", "ICAO": "CFG"}}
                    ]
                },
                {
                    "name": "Spain",
                    "companies": [
                        {"Iberia": {"IATA": "IB", "ICAO": "IBE"}},
                        {"Vueling": {"IATA": "VY", "ICAO": "VLG"}}
                    ]
                }
            ]
        },
        {
            "continent": "North America",
            "countries": [
                {
                    "name": "United States",
                    "companies": [
                        {"American Airlines": {"IATA": "AA", "ICAO": "AAL"}},
                        {"Delta Air Lines": {"IATA": "DL", "ICAO": "DAL"}}
                    ]
                },
                {
                    "name": "Canada",
                    "companies": [
                        {"Air Canada": {"IATA": "AC", "ICAO": "ACA"}},
                        {"WestJet": {"IATA": "WS", "ICAO": "WJA"}}
                    ]
                }
            ]
        },
        {
            "continent": "South America",
            "countries": [
                {
                    "name": "Brazil",
                    "companies": [
                        {"LATAM Brasil": {"IATA": "JJ", "ICAO": "TAM"}},
                        {"GOL Linhas Aéreas": {"IATA": "G3", "ICAO": "GLO"}}
                    ]
                },
                {
                    "name": "Colombia",
                    "companies": [
                        {"Avianca": {"IATA": "AV", "ICAO": "AVA"}},
                        {"Viva Air Colombia": {"IATA": "VH", "ICAO": "VVC"}}
                    ]
                }
            ]
        }
    ]
}


// Construir tabla
var tableBody = document.querySelector("#airlinesTable tbody");
var continentSelect = document.getElementById("continentSelect");
var showCompaniesButton = document.getElementById("showCompaniesButton");

// Select con los nombres de los continentes
data.companies.forEach(function(continent) {
    var option = document.createElement("option");
    option.text = continent.continent;
    option.value = continent.continent;
    continentSelect.add(option);
});

// Orden alfabetico
function sortCountriesAlpha(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

// Mostrar Paises con opcion
function showCountries() {
    if (this.id === "showCompaniesButton") {
        var selectedContinent = continentSelect.value;
        tableBody.innerHTML = "";
        var selectedContinentData = selectedContinent ? 
            data.companies.find(function(continent) {
                return continent.continent === selectedContinent;
            }) :
            { countries: data.companies.flatMap(continent => continent.countries) };

        selectedContinentData.countries.sort(sortCountriesAlpha).forEach(function(country) {
            var row = document.createElement("tr");
            var countryCell = document.createElement("td");
            countryCell.textContent = country.name;
            row.appendChild(countryCell);
            var numCompaniesCell = document.createElement("td");
            numCompaniesCell.textContent = country.companies.length;
            row.appendChild(numCompaniesCell);
            var companiesCell = document.createElement("td");
            var companiesList = document.createElement("ul");
            country.companies.forEach(function(company) {
                var companyName = Object.keys(company)[0];
                var listItem = document.createElement("li");
                listItem.textContent = companyName;
                companiesList.appendChild(listItem);
            });
            companiesCell.appendChild(companiesList);
            row.appendChild(companiesCell);
            tableBody.appendChild(row);
        });

        // Actualizar resumen
        updateSummary();
    }
}

// Mostrar Paises sin opcion
function showAllCountries() {
    tableBody.innerHTML = "";
    var allCountries = [];
    data.companies.forEach(function(continent) {
        continent.countries.forEach(function(country) {
            allCountries.push(country);
        });
    });
    allCountries.sort(sortCountriesAlpha).forEach(function(country) {
        var row = document.createElement("tr");
        var countryCell = document.createElement("td");
        countryCell.textContent = country.name;
        row.appendChild(countryCell);
        var numCompaniesCell = document.createElement("td");
        numCompaniesCell.textContent = country.companies.length;
        row.appendChild(numCompaniesCell);
        var companiesCell = document.createElement("td");
        var companiesList = document.createElement("ul");
        country.companies.forEach(function(company) {
            var companyName = Object.keys(company)[0];
            var listItem = document.createElement("li");
            listItem.textContent = companyName;
            companiesList.appendChild(listItem);
        });
        companiesCell.appendChild(companiesList);
        row.appendChild(companiesCell);
        tableBody.appendChild(row);
    });

    // Actualizar resumen
    updateSummary();
}

// Funcion de Continente/Opcion
function getSelectedContinentData() {
    var selectedContinent = continentSelect.value;
    return data.companies.find(function(continent) {
        return continent.continent === selectedContinent;
    });
}

// Cantidad Country
function getNumCountries() {
    var numCountries = 0;
    data.companies.forEach(function(continent) {
        numCountries += continent.countries.length;
    });
    return numCountries;
}

// Cantidad Companies
function getNumCompanies() {
    var numCompanies = 0;
    data.companies.forEach(function(continent) {
        continent.countries.forEach(function(country) {
            numCompanies += country.companies.length;
        });
    });
    return numCompanies;
}

// Total Companies Unicas
function getTotalUniqueCompanies() {
    var uniqueCompanies = {};
    data.companies.forEach(function(continent) {
        continent.countries.forEach(function(country) {
            country.companies.forEach(function(company) {
                var companyName = Object.keys(company)[0];
                uniqueCompanies[companyName] = true;
            });
        });
    });
    var totalUniqueCompanies = Object.keys(uniqueCompanies).length;
    return totalUniqueCompanies;
}

// Datos
function updateSummary() {
    var selectedContinentData = getSelectedContinentData();
    var numCountries = selectedContinentData ? selectedContinentData.countries.length : getNumCountries();
    var numCompanies = selectedContinentData ? getNumCompanies(selectedContinentData) : getNumCompanies();
    var totalUniqueCompanies = selectedContinentData ? getTotalUniqueCompanies(selectedContinentData) : getTotalUniqueCompanies();

    // Actualizar datos 
    var numCountriesBox = document.getElementById("numCountries");
    numCountriesBox.textContent = "Countries: (" + numCountries + ")";
    var numCompaniesBox = document.getElementById("numCompanies");
    numCompaniesBox.textContent = "Num: (" + numCompanies + ")";
    var totalUniqueCompaniesBox = document.getElementById("totalUniqueCompanies");
    totalUniqueCompaniesBox.textContent = "Companies Operando: (" + totalUniqueCompanies +")";
}


// Evento boton de mostrar Companies
showCompaniesButton.addEventListener("click", showCountries);

// Evento para el select y hacer cambio
continentSelect.addEventListener("change", function() {
});

//Mostrar Paises por defecto
document.addEventListener("DOMContentLoaded", function() {
    showAllCountries();
});








