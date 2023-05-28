var mymap = L.map('mapid').setView([{{ lat }}, {{ lng }}], 13);

var blueIcon = L.divIcon({
className: 'custom-div-icon',
html: "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' stroke='black' stroke-width='2' fill='blue' /></svg>",
iconSize: [30, 30],
iconAnchor: [15, 15]
});

var redIcon = L.divIcon({
className: 'custom-div-icon',
html: "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' stroke='black' stroke-width='2' fill='red' /></svg>",
iconSize: [30, 30],
iconAnchor: [15, 15]
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(mymap);

var data = {{ data|tojson }};

for (var i = 0; i < data.length; i++) {
    var icon = data[i].wikidata ? blueIcon : redIcon;
    var marker = L.marker([data[i].lat, data[i].lng], { icon: icon }).addTo(mymap);

    var popupContent = "<b>" + data[i].locName + "</b><br>" + data[i].countryCode + "<br>locId: " + data[i].locId;

    if (data[i].wikidata) {
        popupContent += "<br><a href='" + data[i].wikidata + "' target='_blank'>View on Wikidata</a>";
    } else {
        var searchUrl = "https://www.wikidata.org/wiki/Special:Search?search=" + encodeURIComponent(data[i].locName);
        popupContent += "<br><a href='" + searchUrl + "' target='_blank'>Search on Wikidata</a>";
    }
    popupContent += "<br><a href=https://ebird.org/hotspot/" + data[i].locId + " target='_blank'>View on eBird</a>";

    marker.bindPopup(popupContent);
}
