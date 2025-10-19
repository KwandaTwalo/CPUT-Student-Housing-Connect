import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAccommodations } from "../../../services/accommodationService";
import StudentNavigation from "../../../components/student/StudentNavigation";

const initialFilters = {
    query: "",
    minRent: "",
    maxRent: "",
    wifiAvailable: "any",
    furnished: "any",
    utilitiesIncluded: "any",
    maxDistanceFromCampus: "",
    city: "",
    suburb: "",
    roomType: "",
    bathroomType: "",
};

const booleanOptions = [
    { value: "any", label: "Any" },
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
];

const sortOptions = [
    { value: "RECOMMENDED", label: "Recommended" },
    { value: "LOWEST_RENT", label: "Lowest rent" },
    { value: "HIGHEST_RENT", label: "Highest rent" },
    { value: "NEAREST", label: "Nearest to campus" },
];

const viewModes = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
];

const searchOptions = [
    "Student Residence A",
    "Student House B",
    "Residence C",
    "Cape Town",
    "Bellville",
    "Belhar",
    "Observatory",
    "Studio apartment",
    "Single room",
    "Double room",
];

const CAPE_TOWN_COORDINATES = [-33.9249, 18.4241];
const coordinateCache = new Map();

const LEAFLET_SCRIPT_ID = "leaflet-js";
const LEAFLET_STYLESHEET_ID = "leaflet-css";
const LEAFLET_SCRIPT_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_STYLESHEET_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_PROMISE_KEY = Symbol.for("cput.studentHousing.leafletPromise");

const ensureLeafletLoaded = () => {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("Leaflet is only available in the browser."));
    }

    if (window.L) {
        return Promise.resolve(window.L);
    }

    if (window[LEAFLET_PROMISE_KEY]) {
        return window[LEAFLET_PROMISE_KEY];
    }

    if (!document.getElementById(LEAFLET_STYLESHEET_ID)) {
        const link = document.createElement("link");
        link.id = LEAFLET_STYLESHEET_ID;
        link.rel = "stylesheet";
        link.href = LEAFLET_STYLESHEET_URL;
        document.head.appendChild(link);
    }

    window[LEAFLET_PROMISE_KEY] = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(LEAFLET_SCRIPT_ID);

        if (existingScript) {
            existingScript.addEventListener("load", () => {
                if (window.L) {
                    resolve(window.L);
                } else {
                    reject(new Error("Leaflet failed to initialise."));
                }
            }, { once: true });
            existingScript.addEventListener("error", () => {
                reject(new Error("Unable to load Leaflet resources."));
            }, { once: true });
            return;
        }

        const script = document.createElement("script");
        script.id = LEAFLET_SCRIPT_ID;
        script.src = LEAFLET_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
            if (window.L) {
                resolve(window.L);
            } else {
                reject(new Error("Leaflet failed to initialise."));
            }
        };
        script.onerror = () => {
            reject(new Error("Unable to load Leaflet resources."));
        };

        document.body.appendChild(script);
    })
        .catch((error) => {
            delete window[LEAFLET_PROMISE_KEY];
            throw error;
        });

    return window[LEAFLET_PROMISE_KEY];
};

const buildListingKey = (listing) =>
    [listing.streetAddress, listing.suburb, listing.city, listing.postalCode, listing.id].filter(Boolean).join("|");

const extractLatLng = (listing) => {
    const explicitLat =
        listing.latitude ??
        listing.lat ??
        listing.location?.latitude ??
        listing.coordinates?.latitude ??
        listing.geoLocation?.latitude ??
        listing.geoLocation?.lat ??
        listing.latitudeCoordinate;
    const explicitLng =
        listing.longitude ??
        listing.lng ??
        listing.location?.longitude ??
        listing.coordinates?.longitude ??
        listing.geoLocation?.longitude ??
        listing.geoLocation?.lng ??
        listing.longitudeCoordinate;

    if (typeof explicitLat === "number" && typeof explicitLng === "number") {
        return [explicitLat, explicitLng];
    }

    return null;
};

const generateCoordinatesFromAddress = (listing) => {
    const cacheKey = buildListingKey(listing);
    if (coordinateCache.has(cacheKey)) {
        return coordinateCache.get(cacheKey);
    }

    const seedString = cacheKey || "cape-town-default";
    let hash = 0;
    for (let index = 0; index < seedString.length; index += 1) {
        hash = (hash << 5) - hash + seedString.charCodeAt(index);
        hash |= 0;
    }

    const latOffset = ((hash % 1000) / 1000 - 0.5) * 0.12;
    const lngOffset = ((((hash >> 4) % 1000) / 1000) - 0.5) * 0.12;
    const coordinates = [CAPE_TOWN_COORDINATES[0] + latOffset, CAPE_TOWN_COORDINATES[1] + lngOffset];
    coordinateCache.set(cacheKey, coordinates);
    return coordinates;
};

const resolveListingCoordinates = (listing) => extractLatLng(listing) ?? generateCoordinatesFromAddress(listing);

function SearchAccommodation() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [sortOrder, setSortOrder] = useState("RECOMMENDED");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedListingId, setSelectedListingId] = useState(null);

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerLayerRef = useRef(null);
    const resultKeyRef = useRef("");
    const leafletRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState("");

    const normaliseBoolean = useCallback((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return undefined;
    }, []);

    const buildPayload = useCallback(() => {
        const payload = {};

        if (filters.query) payload.query = filters.query;
        if (filters.minRent) payload.minRent = filters.minRent;
        if (filters.maxRent) payload.maxRent = filters.maxRent;
        if (filters.maxDistanceFromCampus) payload.maxDistanceFromCampus = filters.maxDistanceFromCampus;
        if (filters.city) payload.city = filters.city;
        if (filters.suburb) payload.suburb = filters.suburb;
        if (filters.roomType) payload.roomType = filters.roomType;
        if (filters.bathroomType) payload.bathroomType = filters.bathroomType;

        const wifi = normaliseBoolean(filters.wifiAvailable);
        const furnished = normaliseBoolean(filters.furnished);
        const utilities = normaliseBoolean(filters.utilitiesIncluded);

        if (wifi !== undefined) payload.wifiAvailable = wifi;
        if (furnished !== undefined) payload.furnished = furnished;
        if (utilities !== undefined) payload.utilitiesIncluded = utilities;

        return payload;
    }, [filters, normaliseBoolean]);

    const loadResults = useCallback(async (payload = {}) => {
        setLoading(true);
        setError("");
        try {
            const data = await searchAccommodations(payload);
            setResults(Array.isArray(data) ? data : []);
        } catch (serviceError) {
            setError(serviceError.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadResults();
    }, [loadResults]);

    useEffect(() => {
        let isMounted = true;

        setMapError("");

        ensureLeafletLoaded()
            .then((leaflet) => {
                if (!isMounted) {
                    return;
                }
                leafletRef.current = leaflet;
                setMapReady(true);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }
                leafletRef.current = null;
                setMapReady(false);
                setMapError("Unable to load the interactive map right now. Please try again later.");
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!mapReady || !leafletRef.current || !mapContainerRef.current || mapInstanceRef.current) {            return;
        }

        const leaflet = leafletRef.current;

        mapInstanceRef.current = leaflet.map(mapContainerRef.current, {            center: CAPE_TOWN_COORDINATES,
            zoom: 12,
            zoomControl: false,
        });

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        leaflet.control.zoom({ position: "bottomright" }).addTo(mapInstanceRef.current);
        markerLayerRef.current = leaflet.layerGroup().addTo(mapInstanceRef.current);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
            mapInstanceRef.current = null;
            markerLayerRef.current = null;
        };
    }, [mapReady]);

    const handleSelectListing = useCallback((listing) => {
        setSelectedListingId(listing.id);
        const map = mapInstanceRef.current;
        if (map) {
            const coordinates = resolveListingCoordinates(listing);
            map.flyTo(coordinates, Math.max(map.getZoom(), 14), { duration: 0.6 });
        }
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;
        const markerLayer = markerLayerRef.current;
        const leaflet = leafletRef.current;
        if (!map || !markerLayer || !leaflet) {
            return;
        }

        markerLayer.clearLayers();

        if (results.length === 0) {
            map.setView(CAPE_TOWN_COORDINATES, 11);
            resultKeyRef.current = "";
            return;
        }

        const listingIds = results.map((listing) => listing.id).join("|");
        const bounds = [];

        results.forEach((listing) => {
            const coordinates = resolveListingCoordinates(listing);
            const isSelected = listing.id === selectedListingId;
            const marker = leaflet.circleMarker(coordinates, {
                radius: isSelected ? 12 : 8,
                color: isSelected ? "#1d4ed8" : "#38bdf8",
                weight: isSelected ? 3 : 2,
                opacity: 0.9,
                fillOpacity: isSelected ? 0.85 : 0.6,
                fillColor: isSelected ? "#1d4ed8" : "#38bdf8",
            });

            marker.on("click", () => handleSelectListing(listing));
            marker.bindPopup(
                `<strong>${listing.streetAddress || "Listing"}</strong><br />${
                    listing.suburb ? `${listing.suburb}, ` : ""
                }${listing.city || "Cape Town"}`
            );
            markerLayer.addLayer(marker);
            bounds.push(leaflet.latLng(coordinates[0], coordinates[1]));
        });

        if (!selectedListingId && results[0]) {
            setSelectedListingId(results[0].id);
        }

        if (listingIds !== resultKeyRef.current) {
            if (bounds.length === 1) {
                map.flyTo(bounds[0], 14, { duration: 0.6 });
            } else if (bounds.length > 1) {
                map.fitBounds(leaflet.latLngBounds(bounds), { padding: [48, 48], maxZoom: 14 });
            }
            resultKeyRef.current = listingIds;
        }
    }, [results, selectedListingId, handleSelectListing]);

    useEffect(() => {
        if (results.length === 0) {
            setSelectedListingId(null);
            return;
        }

        if (!selectedListingId || !results.some((item) => item.id === selectedListingId)) {
            setSelectedListingId(results[0].id);
        }
    }, [results, selectedListingId]);

    const selectedListing = useMemo(
        () => results.find((listing) => listing.id === selectedListingId) || null,
        [results, selectedListingId]
    );

    const handleQueryChange = (value) => {
        setFilters((prev) => ({ ...prev, query: value }));
        if (!value) {
            setSuggestions([]);
            return;
        }
        const lowerValue = value.toLowerCase();
        const matches = searchOptions.filter((option) => option.toLowerCase().includes(lowerValue)).slice(0, 6);
        setSuggestions(matches);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "query") {
            handleQueryChange(value);
            return;
        }
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSuggestionClick = (option) => {
        setFilters((prev) => ({ ...prev, query: option }));
        setSuggestions([]);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const payload = buildPayload();
        loadResults(payload);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        setSuggestions([]);
        setSortOrder("RECOMMENDED");
        loadResults();
    };

    const sortedResults = useMemo(() => {
        const data = [...results];
        switch (sortOrder) {
            case "LOWEST_RENT":
                return data.sort((a, b) => (a.rent ?? 0) - (b.rent ?? 0));
            case "HIGHEST_RENT":
                return data.sort((a, b) => (b.rent ?? 0) - (a.rent ?? 0));
            case "NEAREST":
                return data.sort(
                    (a, b) => (a.distanceFromCampus ?? Number.MAX_VALUE) - (b.distanceFromCampus ?? Number.MAX_VALUE)
                );
            default:
                return data;
        }
    }, [results, sortOrder]);

    const filterChips = useMemo(() => {
        return [
            filters.query && `Search: ${filters.query}`,
            filters.city && `City: ${filters.city}`,
            filters.suburb && `Suburb: ${filters.suburb}`,
            filters.roomType && `Room: ${filters.roomType}`,
            filters.bathroomType && `Bathroom: ${filters.bathroomType}`,
            filters.minRent && `Min rent: R${filters.minRent}`,
            filters.maxRent && `Max rent: R${filters.maxRent}`,
            filters.maxDistanceFromCampus && `≤ ${filters.maxDistanceFromCampus} km from campus`,
            normaliseBoolean(filters.wifiAvailable) !== undefined && `Wi-Fi: ${filters.wifiAvailable === "true" ? "Yes" : "No"}`,
            normaliseBoolean(filters.furnished) !== undefined && `Furnished: ${filters.furnished === "true" ? "Yes" : "No"}`,
            normaliseBoolean(filters.utilitiesIncluded) !== undefined &&
            `Utilities: ${filters.utilitiesIncluded === "true" ? "Included" : "Excluded"}`,
        ].filter(Boolean);
    }, [filters, normaliseBoolean]);

    const analytics = useMemo(() => {
        if (sortedResults.length === 0) {
            return null;
        }
        const totalRent = sortedResults.reduce((acc, item) => acc + (item.rent ?? 0), 0);
        const wifiCount = sortedResults.filter((item) => item.wifiAvailable || item.isWifiAvailable).length;
        const avgRent = totalRent / sortedResults.length;
        const furnishedCount = sortedResults.filter((item) => item.furnished || item.isFurnished).length;

        return {
            averageRent: Math.round(avgRent),
            wifiPercentage: Math.round((wifiCount / sortedResults.length) * 100),
            furnishedPercentage: Math.round((furnishedCount / sortedResults.length) * 100),
        };
    }, [sortedResults]);

    return (
        <div className="student-search-shell">
            <StudentNavigation />
            <div style={styles.page}>
                <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>Discover • Match • Move</span>
                    <h1 style={styles.title}>Your personalised CPUT housing hub</h1>
                    <p style={styles.subtitle}>
                        Curated accommodation listings with rich amenities, live analytics and an interactive Cape Town map.
                        Save time and move in with confidence.
                    </p>
                    <div style={styles.heroMetrics}>
                        <div style={styles.heroMetricCard}>
                            <strong>{sortedResults.length || "–"}</strong>
                            <span>Active matches</span>
                        </div>
                        <div style={styles.heroMetricCard}>
                            <strong>{analytics ? `R${analytics.averageRent}` : "–"}</strong>
                            <span>Average monthly rent</span>
                        </div>
                        <div style={styles.heroMetricCard}>
                            <strong>{analytics ? `${analytics.wifiPercentage}%` : "–"}</strong>
                            <span>Listings with Wi-Fi</span>
                        </div>
                    </div>
                </div>
            </section>

            <div style={styles.contentWrapper}>
                <form style={styles.filterPanel} onSubmit={handleSearch}>
                    <div style={styles.panelHeader}>
                        <h2>Smart filters</h2>
                        <p>Refine the marketplace in real-time. Your results update instantly.</p>
                    </div>

                    <div style={styles.searchField}>
                        <label>Search</label>
                        <div style={styles.searchInputWrapper}>
                            <input
                                type="text"
                                name="query"
                                value={filters.query}
                                onChange={handleInputChange}
                                placeholder={'Try "Observatory studio" or "Bellville"'}
                                autoComplete="off"
                                style={styles.inputControl}
                            />
                            {suggestions.length > 0 && (
                                <ul style={styles.suggestionList}>
                                    {suggestions.map((option) => (
                                        <li
                                            key={option}
                                            style={styles.suggestionItem}
                                            onMouseDown={() => handleSuggestionClick(option)}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div style={styles.filterGrid}>
                        <div style={styles.field}>
                            <label>Minimum rent (R)</label>
                            <input
                                type="number"
                                name="minRent"
                                value={filters.minRent}
                                onChange={handleInputChange}
                                placeholder="e.g. 2500"
                                style={styles.inputControl}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Maximum rent (R)</label>
                            <input
                                type="number"
                                name="maxRent"
                                value={filters.maxRent}
                                onChange={handleInputChange}
                                placeholder="e.g. 4500"
                                style={styles.inputControl}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Max distance (km)</label>
                            <input
                                type="number"
                                name="maxDistanceFromCampus"
                                value={filters.maxDistanceFromCampus}
                                onChange={handleInputChange}
                                placeholder="e.g. 3"
                                step="0.1"
                                min="0"
                                style={styles.inputControl}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleInputChange}
                                placeholder="Cape Town"
                                style={styles.inputControl}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Suburb</label>
                            <input
                                type="text"
                                name="suburb"
                                value={filters.suburb}
                                onChange={handleInputChange}
                                placeholder="Belhar"
                                style={styles.inputControl}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Room type</label>
                            <select
                                name="roomType"
                                value={filters.roomType}
                                onChange={handleInputChange}
                                style={styles.inputControl}
                            >
                                <option value="">Any</option>
                                <option value="SINGLE">Single</option>
                                <option value="DOUBLE">Double</option>
                                <option value="SHARED">Shared</option>
                                <option value="EN_SUITE">En-suite</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Bathroom</label>
                            <select
                                name="bathroomType"
                                value={filters.bathroomType}
                                onChange={handleInputChange}
                                style={styles.inputControl}
                            >
                                <option value="">Any</option>
                                <option value="PRIVATE">Private</option>
                                <option value="SHARED">Shared</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Wi-Fi included</label>
                            <select
                                name="wifiAvailable"
                                value={filters.wifiAvailable}
                                onChange={handleInputChange}
                                style={styles.inputControl}
                            >
                                {booleanOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Furnished</label>
                            <select
                                name="furnished"
                                value={filters.furnished}
                                onChange={handleInputChange}
                                style={styles.inputControl}
                            >
                                {booleanOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Utilities included</label>
                            <select
                                name="utilitiesIncluded"
                                value={filters.utilitiesIncluded}
                                onChange={handleInputChange}
                                style={styles.inputControl}
                            >
                                {booleanOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <button type="submit" style={styles.primaryButton} disabled={loading}>
                            {loading ? "Searching..." : "Update results"}
                        </button>
                        <button type="button" style={styles.secondaryButton} onClick={handleReset} disabled={loading}>
                            Clear filters
                        </button>
                    </div>

                    {filterChips.length > 0 && (
                        <div style={styles.chipRow}>
                            {filterChips.map((chip) => (
                                <span key={chip} style={styles.chip}>
                                    {chip}
                                </span>
                            ))}
                        </div>
                    )}
                </form>

                <section style={styles.resultsAndMap}>
                    <div style={styles.resultsPanel}>
                        <header style={styles.resultsHeader}>
                            <div>
                                <h2>Results</h2>
                                <p>{sortedResults.length} curated listings that match your preferences.</p>
                            </div>
                            <div style={styles.toolbar}>
                                <div style={styles.sortControl}>
                                    <label>Sort by</label>
                                    <select
                                        value={sortOrder}
                                        onChange={(event) => setSortOrder(event.target.value)}
                                        style={{ ...styles.inputControl, minWidth: "160px" }}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.viewModeToggle}>
                                    {viewModes.map((mode) => (
                                        <button
                                            key={mode.value}
                                            type="button"
                                            onClick={() => setViewMode(mode.value)}
                                            style={{
                                                ...styles.viewModeButton,
                                                ...(viewMode === mode.value ? styles.viewModeButtonActive : {}),
                                            }}
                                        >
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </header>

                        {analytics && (
                            <div style={styles.analyticsStrip}>
                                <div>
                                    <strong>R{analytics.averageRent}</strong>
                                    <span>Average rent</span>
                                </div>
                                <div>
                                    <strong>{analytics.wifiPercentage}%</strong>
                                    <span>Listings with Wi-Fi</span>
                                </div>
                                <div>
                                    <strong>{analytics.furnishedPercentage}%</strong>
                                    <span>Furnished spaces</span>
                                </div>
                            </div>
                        )}

                        {error && <div style={styles.error}>{error}</div>}
                        {!error && loading && <div style={styles.loading}>Loading available accommodation...</div>}
                        {!loading && !error && sortedResults.length === 0 && (
                            <div style={styles.emptyState}>
                                <h3>No accommodation found</h3>
                                <p>Adjust your filters and try again. New listings are added regularly.</p>
                            </div>
                        )}

                        <div
                            style={{
                                ...(viewMode === "grid" ? styles.grid : styles.list),
                            }}
                        >
                            {sortedResults.map((item) => {
                                const baseCardStyles = viewMode === "grid" ? styles.card : styles.cardList;
                                const isSelected = item.id === selectedListingId;
                                return (
                                    <article
                                        key={item.id}
                                        style={{
                                            ...baseCardStyles,
                                            ...(isSelected ? styles.cardSelected : {}),
                                        }}
                                        onClick={() => handleSelectListing(item)}
                                        onMouseEnter={() => handleSelectListing(item)}
                                    >
                                        <div style={styles.cardHeader}>
                                            <span style={styles.statusBadge}>{item.status || item.accommodationStatus}</span>
                                            <h2 style={styles.cardTitle}>R{item.rent?.toFixed(2)} / month</h2>
                                            <p style={styles.cardSubtitle}>
                                                {item.streetAddress || "Address on request"}
                                                {item.suburb ? `, ${item.suburb}` : ""}
                                                {item.city ? `, ${item.city}` : ""}
                                            </p>
                                        </div>
                                        <div style={styles.tagRow}>
                                            <span style={styles.tag}>{item.roomType?.replace("_", " ")}</span>
                                            <span style={styles.tag}>{item.bathroomType} bathroom</span>
                                            <span style={styles.tag}>{item.distanceFromCampus?.toFixed(1)} km from campus</span>
                                        </div>
                                        <ul style={styles.featureList}>
                                            <li>Wi-Fi: {item.wifiAvailable || item.isWifiAvailable ? "Included" : "Not included"}</li>
                                            <li>Furnished: {item.furnished || item.isFurnished ? "Yes" : "No"}</li>
                                            <li>
                                                Utilities: {item.utilitiesIncluded || item.isUtilitiesIncluded ? "Included" : "Excluded"}
                                            </li>
                                        </ul>
                                        <div style={styles.landlordBlock}>
                                            <div>
                                                <p style={styles.landlordName}>
                                                    Listed by {item.landlordName || item.landlord?.landlordFirstName}
                                                </p>
                                                {item.landlordEmail || item.landlord?.contact?.email ? (
                                                    <p style={styles.landlordEmail}>
                                                        {item.landlordEmail || item.landlord?.contact?.email}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <button
                                                type="button"
                                                style={styles.viewButton}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    navigate(`/student/accommodation/${item.id}`);
                                                }}
                                            >
                                                View details
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    <aside style={styles.mapPanel}>
                        <div ref={mapContainerRef} style={styles.mapContainer} />
                        <div style={styles.mapOverlay}>
                            <span style={styles.mapBadge}>Interactive Cape Town map</span>
                            {mapError ? (
                                <p style={styles.mapError}>{mapError}</p>
                            ) : !mapReady ? (
                                <p style={styles.mapPlaceholder}>Loading interactive map...</p>
                            ) : selectedListing ? (                                <div style={styles.mapListingDetails}>
                                    <strong>{selectedListing.streetAddress || "Selected listing"}</strong>
                                    <span>
                                        {[selectedListing.suburb, selectedListing.city].filter(Boolean).join(", ") ||
                                            "Cape Town"}
                                    </span>
                                    <span>R{selectedListing.rent?.toFixed(2)} / month</span>
                                </div>
                            ) : (
                                <p style={styles.mapPlaceholder}>Hover or tap on a listing to highlight it on the map.</p>
                            )}
                            {selectedListing && mapReady && !mapError && (
                                <button
                                    type="button"
                                    style={styles.mapButton}
                                    onClick={() => navigate(`/student/accommodation/${selectedListing.id}`)}
                                >
                                    Open listing
                                </button>
                            )}
                        </div>
                    </aside>
                </section>
            </div>
            </div>
        </div>
    );
}

const glassPanel = {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "24px",
    boxShadow: "0 28px 70px rgba(15, 23, 42, 0.15)",
    backdropFilter: "blur(14px)",
};

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        paddingBottom: "48px",
        background: "linear-gradient(180deg, #e0f2fe 0%, #f8fafc 60%, #ffffff 100%)",
    },
    hero: {
        padding: "48px clamp(24px, 6vw, 80px) 0",
    },
    heroContent: {
        maxWidth: "720px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },
    heroBadge: {
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        fontSize: "12px",
        fontWeight: 700,
        color: "#0f172a",
    },
    title: {
        margin: 0,
        fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
        fontWeight: 700,
        color: "#0f172a",
    },
    subtitle: {
        margin: 0,
        fontSize: "1.05rem",
        lineHeight: 1.6,
        color: "#475569",
        maxWidth: "640px",
    },
    heroMetrics: {
        display: "flex",
        gap: "18px",
        flexWrap: "wrap",
    },
    heroMetricCard: {
        ...glassPanel,
        padding: "16px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        color: "#0f172a",
    },
    contentWrapper: {
        display: "flex",
        flexWrap: "wrap",
        gap: "28px",
        alignItems: "stretch",
        padding: "0 clamp(24px, 6vw, 80px)",
    },
    filterPanel: {
        ...glassPanel,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "sticky",
        top: "24px",
        maxHeight: "calc(100vh - 80px)",
        overflowY: "auto",
        flex: "0 1 340px",
        minWidth: "280px",
    },
    panelHeader: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    searchField: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    searchInputWrapper: {
        position: "relative",
    },
    suggestionList: {
        position: "absolute",
        inset: "100% 0 auto",
        margin: 0,
        padding: "8px 0",
        listStyle: "none",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.15)",
        zIndex: 10,
    },
    suggestionItem: {
        padding: "10px 16px",
        cursor: "pointer",
        fontSize: "14px",
        color: "#1f2937",
    },
    filterGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "14px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontSize: "13px",
        color: "#1f2937",
    },
    inputControl: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "12px",
        border: "1px solid rgba(148, 163, 184, 0.4)",
        fontSize: "14px",
        background: "#ffffff",
        outline: "none",
        boxShadow: "inset 0 1px 0 rgba(148, 163, 184, 0.08)",
        color: "#0f172a",
    },
    actions: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
    },
    primaryButton: {
        padding: "12px 18px",
        borderRadius: "12px",
        border: "none",
        background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 18px 45px rgba(37, 99, 235, 0.35)",
    },
    secondaryButton: {
        padding: "12px 18px",
        borderRadius: "12px",
        border: "1px solid rgba(148, 163, 184, 0.4)",
        background: "#fff",
        color: "#1f2937",
        fontWeight: 600,
        cursor: "pointer",
    },
    chipRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
    },
    chip: {
        padding: "6px 12px",
        borderRadius: "999px",
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        color: "#1d4ed8",
        fontSize: "13px",
        fontWeight: 600,
    },
    resultsAndMap: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
        gap: "24px",
        alignItems: "stretch",
        flex: "1 1 600px",
        minWidth: "320px",
    },
    resultsPanel: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    resultsHeader: {
        ...glassPanel,
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
    },
    toolbar: {
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    sortControl: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontSize: "14px",
    },
    viewModeToggle: {
        display: "flex",
        backgroundColor: "rgba(148, 163, 184, 0.15)",
        padding: "4px",
        borderRadius: "999px",
        gap: "4px",
    },
    viewModeButton: {
        padding: "8px 16px",
        borderRadius: "999px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontWeight: 600,
        color: "#475569",
    },
    viewModeButtonActive: {
        backgroundColor: "#1d4ed8",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
    },
    analyticsStrip: {
        ...glassPanel,
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px",
        alignItems: "stretch",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },
    card: {
        ...glassPanel,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
    },
    cardList: {
        ...glassPanel,
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        gap: "24px",
        alignItems: "center",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
    },
    cardSelected: {
        transform: "translateY(-6px)",
        boxShadow: "0 32px 80px rgba(37, 99, 235, 0.24)",
        border: "1px solid rgba(37, 99, 235, 0.25)",
    },
    cardHeader: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    statusBadge: {
        alignSelf: "flex-start",
        padding: "4px 12px",
        borderRadius: "999px",
        backgroundColor: "rgba(16, 185, 129, 0.16)",
        color: "#047857",
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
    },
    cardTitle: {
        margin: 0,
        fontSize: "24px",
    },
    cardSubtitle: {
        margin: 0,
        color: "#475569",
    },
    tagRow: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
    },
    tag: {
        padding: "6px 10px",
        borderRadius: "12px",
        backgroundColor: "rgba(15, 118, 110, 0.12)",
        color: "#0f766e",
        fontSize: "12px",
        fontWeight: 600,
    },
    featureList: {
        margin: 0,
        paddingLeft: "18px",
        color: "#1e293b",
        lineHeight: 1.6,
    },
    landlordBlock: {
        marginTop: "auto",
        display: "flex",
        justifyContent: "space-between",
        gap: "18px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    landlordName: {
        margin: 0,
        fontWeight: 600,
    },
    landlordEmail: {
        margin: "4px 0 0",
        color: "#1d4ed8",
        fontSize: "14px",
    },
    viewButton: {
        padding: "10px 18px",
        borderRadius: "999px",
        border: "none",
        backgroundColor: "#1e40af",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
    },
    error: {
        padding: "16px",
        borderRadius: "18px",
        backgroundColor: "rgba(239, 68, 68, 0.12)",
        color: "#b91c1c",
    },
    loading: {
        padding: "12px",
        borderRadius: "18px",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        color: "#1d4ed8",
    },
    emptyState: {
        ...glassPanel,
        padding: "48px",
        textAlign: "center",
    },
    mapPanel: {
        position: "relative",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 28px 80px rgba(15, 23, 42, 0.2)",
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        minHeight: "520px",
        background: "linear-gradient(135deg, rgba(30, 64, 175, 0.15), rgba(14, 165, 233, 0.1))",
    },
    mapOverlay: {
        position: "absolute",
        bottom: "16px",
        left: "16px",
        right: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "18px",
        borderRadius: "20px",
        background: "rgba(15, 23, 42, 0.78)",
        color: "#f8fafc",
        backdropFilter: "blur(8px)",
    },
    mapBadge: {
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        fontSize: "11px",
        color: "rgba(186, 230, 253, 0.85)",
    },
    mapListingDetails: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        fontSize: "14px",
    },
    mapPlaceholder: {
        margin: 0,
        fontSize: "14px",
        color: "rgba(226, 232, 240, 0.8)",
    },
    mapError: {
        margin: 0,
        fontSize: "14px",
        color: "#fecaca",
    },
    mapButton: {
        alignSelf: "flex-start",
        padding: "10px 18px",
        borderRadius: "999px",
        border: "1px solid rgba(186, 230, 253, 0.6)",
        backgroundColor: "rgba(37, 99, 235, 0.25)",
        color: "#e0f2fe",
        fontWeight: 600,
        cursor: "pointer",
    },
};

export default SearchAccommodation;
