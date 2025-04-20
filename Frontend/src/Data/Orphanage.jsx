import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import orphanageData from "./Orphanage.json";
import Papa from "papaparse";
import shopDataCSV from "./shop.csv";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const orphanageIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/paddle/ylw-blank.png", // A yellow map marker
    iconSize: [40, 40], // Adjust size if needed
    iconAnchor: [20, 40], // Center the marker based on size
    popupAnchor: [0, -35], // Position the popup correctly
});

const shopIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/paddle/grn-blank.png", // A green map marker for shops
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const cityCoordinates = {
    Mumbai: [19.0760, 72.8777],
    Delhi: [28.6139, 77.2090],
    Bangalore: [12.9716, 77.5946],
    Chennai: [13.0827, 80.2785],
    Kolkata: [22.5726, 88.3639],
    Hyderabad: [17.385, 78.4867],
    Pune: [18.5204, 73.8567],
    Ahmedabad: [23.0225, 72.5714],
    Surat: [21.1702, 72.8311],
    Jaipur: [26.9124, 75.7873],
    Kanpur: [26.4478, 80.3218],
    Nagpur: [21.1458, 79.1090],
    Lucknow: [26.8468, 80.9462],
    Visakhapatnam: [17.6868, 83.2185],
    Bhopal: [23.2599, 77.4126],
    Patna: [25.5941, 85.1376],
    Vadodara: [22.3098, 73.1880],
    Ghaziabad: [28.6692, 77.4377],
    Ludhiana: [30.9009, 75.7804],
    Agra: [27.1767, 78.0081],
    Nashik: [19.9996, 73.9097],
    Coimbatore: [11.0168, 76.9558],
    Aurangabad: [19.8776, 75.3624],
    Jodhpur: [26.2764, 73.6850],
    Ranchi: [23.3441, 85.3095],
};

const JumpToMap = ({ selectedCity }) => {
    const map = useMap();

    useEffect(() => {
        const coordinates = cityCoordinates[selectedCity];
        if (coordinates) {
            map.flyTo(coordinates, 13, { animate: true, duration: 1 });
        }
    }, [map, selectedCity]);

    return null;
};

const OrphanageMap = () => {
    const [selectedCity, setSelectedCity] = useState("Mumbai");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrphanage, setSelectedOrphanage] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        Papa.parse(shopDataCSV, {
            download: true,
            header: true,
            complete: (results) => {
                setShops(results.data);
            },
        });
    }, []);

    useEffect(() => {
        const matchedCity = Object.keys(cityCoordinates).find(city =>
            city.toLowerCase() === searchTerm.toLowerCase()
        );
        if (matchedCity) {
            setSelectedCity(matchedCity);
            setSearchTerm("");
        }
    }, [searchTerm]);

    const filteredOrphanages = orphanageData.features.filter(
        (orphanage) => orphanage.properties.City.toLowerCase() === selectedCity.toLowerCase()
    );

    const handleOrphanageClick = (orphanage) => {
        setSelectedOrphanage(orphanage);
        setSelectedShop(null);
    };

    const clearOrphanage = () => {
        setSelectedOrphanage(null);
    };

    const getShopsWithinRadius = () => {
        if (!selectedOrphanage) return [];
        const orphanageLat = selectedOrphanage.geometry.coordinates[1];
        const orphanageLon = selectedOrphanage.geometry.coordinates[0];
        return shops.filter(shop => {
            const shopLat = parseFloat(shop.Latitude);
            const shopLon = parseFloat(shop.Longitude);
            const distance = getDistance(orphanageLat, orphanageLon, shopLat, shopLon);
            return distance <= 2; // Radius in km
        });
    };

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const filteredShops = getShopsWithinRadius();

    const handleShopClick = (shop) => {
        setSelectedShop(shop);
    };

    return (
        <div style={{ position: "relative", height: "100vh", width: "100%" }}>
            <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    position: "absolute",
                    zIndex: 1000,
                    top: "10px",
                    left: "10px",
                }}
            />
            <MapContainer
                center={cityCoordinates[selectedCity]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <JumpToMap selectedCity={selectedCity} />
                {filteredOrphanages.map((orphanage, index) => (
                    <Marker
                        key={index}
                        position={[
                            orphanage.geometry.coordinates[1],
                            orphanage.geometry.coordinates[0],
                        ]}
                        icon={orphanageIcon}
                        eventHandlers={{
                            click: () => handleOrphanageClick(orphanage),
                        }}
                    >
                        <Popup>
                            <div>
                                <h2>{orphanage.properties["NGO Name"]}</h2>
                                <p><strong>City:</strong> {orphanage.properties.City}</p>
                                <p><strong>Address:</strong> {orphanage.properties.Address}</p>
                                <button onClick={() => handleOrphanageClick(orphanage)}>View Shops</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {filteredShops.map((shop, index) => (
                    <Marker
                        key={index}
                        position={[parseFloat(shop.Latitude), parseFloat(shop.Longitude)]}
                        icon={shopIcon}
                        eventHandlers={{
                            click: () => handleShopClick(shop),
                        }}
                    />
                ))}
            </MapContainer>
            {selectedOrphanage && (
                <div
                    style={{
                        background: "#fff",
                        padding: "10px",
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        zIndex: 1000,
                    }}
                >
                    <h3>Selected Orphanage:</h3>
                    <p>{selectedOrphanage.properties["NGO Name"]}</p>
                    <p>{selectedOrphanage.properties.Address}</p>
                    <button onClick={clearOrphanage}>Close</button>
                    {filteredShops.length > 0 && (
                        <div>
                            <h4>Nearby Shops:</h4>
                            {filteredShops.map((shop, index) => (
                                <div key={index} onClick={() => handleShopClick(shop)}>
                                    <p>{shop.Shop_Name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {selectedShop && (
                <div
                    style={{
                        position: "absolute",
                        top: "200px",
                        left: "20px",
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        zIndex: 1000,
                    }}
                >
                    <h4>Shop Details:</h4>
                    <p><strong>Name:</strong> {selectedShop.Shop_Name}</p>
                    <p><strong>Contact:</strong> {selectedShop.Contact}</p>
                    <p><strong>Address:</strong> {selectedShop.Address}</p>
                    <button onClick={() => setSelectedShop(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default OrphanageMap;
