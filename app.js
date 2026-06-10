const baseurl = "https://open.er-api.com/v6/latest";

const countrylist = {
     AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW", 
    };


const selectfrom = document.querySelector(".fromselect");
const selectto = document.querySelector(".toselect");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
const exchangebtn = document.querySelector(".convert");
const finalmsg = document.querySelector(".final");
const amountInput = document.querySelector(".input");

function updateFlag(img, countryCode) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function updateRate() {
    let fromCurrency = selectfrom.value;
    let toCurrency = selectto.value;

    let response = await fetch(`${baseurl}/${fromCurrency}`);
    let data = await response.json();

    finalmsg.innerText =
        `1 ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}`;
}

async function exchanger(event) {
    event.preventDefault();

    let fromCurrency = selectfrom.value;
    let toCurrency = selectto.value;
    let amount = amountInput.value;

    if (amount <= 0) {
        amount = 1;
        amountInput.value = 1;
    }

    const url = `${baseurl}/${fromCurrency}`;

    let response = await fetch(url);
    let data = await response.json();

    finalmsg.innerText =
        `${amount}${fromCurrency} = ${amount * data.rates[toCurrency]} ${toCurrency}`;
}

for (let code in countrylist) {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;

    if (code === "USD") {
        option.selected = true;
    }

    selectfrom.append(option);
}

for (let code in countrylist) {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;

    if (code === "INR") {
        option.selected = true;
    }

    selectto.append(option);
}

updateFlag(fromImg, countrylist[selectfrom.value]);
updateFlag(toImg, countrylist[selectto.value]);

updateRate();

selectfrom.addEventListener("change", (e) => {
    updateFlag(fromImg, countrylist[e.target.value]);
    updateRate();
});

selectto.addEventListener("change", (e) => {
    updateFlag(toImg, countrylist[e.target.value]);
    updateRate();
});

exchangebtn.addEventListener("click", exchanger);