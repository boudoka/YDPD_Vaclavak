//MARKERY POHLEDNIC
var arrow = L.icon({
    iconUrl: 'images/marker-icon-violet.png', 
    //attribution: <a href="https://www.flaticon.com/free-icons/down-arrow" title="down arrow icons">Down arrow icons created by The Chohans Brand - Flaticon</a>

    iconSize:     [20, 30], // size of the icon
    iconAnchor:   [15, 25], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//MAPA + WMS vrstvy
var crs = new L.Proj.CRS('EPSG:5514', '+proj=krovak +lat_0=49.5 +lon_0=24.8333333333333 +alpha=30.2881397527778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs', {
    resolutions: [2800, 1400, 700, 350, 175, 84, 42, 21, 11.2, 5.6, 2.8, 1.4, 0.7, 0.35, 0.14, 0.07],
});

var map = L.map('map', {
    //crs: L.CRS.EPSG3857,
    center: [50.0809600, 14.4287928],
    zoom: 18,
    maxZoom:20, 
    minZoom:12
});


var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});

map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');

measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';

var basemaps = {
    ZTM5: L.tileLayer.wms('https://ags.cuzk.cz/arcgis1/services/ZTM/ZTM5/MapServer/WMSServer?', {
        layers: '0',
        format: 'image/png',
        transparent: true,
        attribution: '',
    }),

    ORTOFOTO: L.tileLayer.wms('https://ags.cuzk.cz/arcgis1/services/ORTOFOTO/MapServer/WMSServer?', {
        layers: '0',
        format: 'image/png',
        transparent: true,
        attribution: '',
    }),

    cisarske_otisky_1440: L.tileLayer.wms('https://gs-pub.praha.eu/imgs/services/arch/cisarske_otisky_1440/ImageServer/WMSServer', {
        layers: '0',
        format: 'image/png',
        transparent: true,
        attribution: '',
    })
};


// Ensure the GeoJSON variable is available
if (typeof json_727181HP_3 !== 'undefined') {
    // Create the style function for the layer
    function styleCadastralBorders(feature) {
        return {
            color: 'black',   // Set line color (adjust as needed)
            weight: 3,       // Line thickness
            opacity: 1,
            interactive: false
        };
    }

    // Add the GeoJSON layer to the map
    var geoJsonLayer = L.geoJson(json_727181HP_3, {
        style: styleCadastralBorders,
    });
       
}


var pohled1922 = L.marker([50.080301,14.428696], {
    icon: arrow})
    .bindPopup('<img src="HisPodklady/Pohled_1922.jpg" style="width:200px"></img><br><strong>1922</strong><br>'),
    pohled1960 = L.marker([50.08038,14.428739], {
        icon: arrow})
    .bindPopup('<img src="HisPodklady/Pohled_1960.jpg" style="width:200px"></img><br><strong>1960</strong><br>'),
    pohled1961 = L.marker([50.080948,14.427747], {
        icon: arrow})
    .bindPopup('<img src="HisPodklady/Pohled_1961.jpg" style="width:200px"></img><br><strong>1961</strong><br>'),
    pohled2022 = L.marker([50.0808225,14.4286014], {
        icon: arrow})
    .bindPopup('<img src="HisPodklady/Pohled_2022.jpg" style="width:200px"></img><br><strong>2022</strong><br>');
var pohledy = L.layerGroup([pohled1922,pohled1960,pohled1961,pohled2022]);

var overlayMaps = {
    "Fotografie": pohledy,
    '<img src="legend/727181HP_3.png" style="width:10px"> Katastrální mapa': geoJsonLayer
};

L.control.layers(basemaps, overlayMaps).addTo(map); 
basemaps.ZTM5.addTo(map);
