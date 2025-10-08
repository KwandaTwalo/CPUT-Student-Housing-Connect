import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAccommodations } from "../../../services/accommodationService";

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

function SearchAccommodation() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [sortOrder, setSortOrder] = useState("RECOMMENDED");
    const [viewMode, setViewMode] = useState("grid");

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

    const handleQueryChange = (value) => {
        setFilters((prev) => ({ ...prev, query: value }));
        if (!value) {
            setSuggestions([]);
            return;
        }
        const lowerValue = value.toLowerCase();
        const matches = searchOptions
            .filter((option) => option.toLowerCase().includes(lowerValue))
            .slice(0, 6);
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

    const firstListing = sortedResults[0];
    const mapAddress = firstListing
        ? [
            firstListing.streetAddress,
            firstListing.suburb,
            firstListing.city,
            firstListing.postalCode,
        ]
            .filter(Boolean)
            .join(" ")
        : "Cape Town, South Africa";
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;

    return (
        <div style={styles.page}>
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <span style={styles.heroBadge}>Discover • Match • Move</span>
                    <h1 style={styles.title}>Your personalised CPUT housing hub</h1>
                    <p style={styles.subtitle}>
                        Curated accommodation listings with rich amenities, live analytics and immersive map previews. Save time and move in
                        with confidence.
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

            <div style={styles.layout}>
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
                                placeholder={"Try \"Observatory studio\" or \"Bellville\""}
                                autoComplete="off"
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
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Room type</label>
                            <select name="roomType" value={filters.roomType} onChange={handleInputChange}>
                                <option value="">Any</option>
                                <option value="SINGLE">Single</option>
                                <option value="DOUBLE">Double</option>
                                <option value="SHARED">Shared</option>
                                <option value="EN_SUITE">En-suite</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Bathroom</label>
                            <select name="bathroomType" value={filters.bathroomType} onChange={handleInputChange}>
                                <option value="">Any</option>
                                <option value="PRIVATE">Private</option>
                                <option value="SHARED">Shared</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Wi-Fi included</label>
                            <select name="wifiAvailable" value={filters.wifiAvailable} onChange={handleInputChange}>
                                {booleanOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Furnished</label>
                            <select name="furnished" value={filters.furnished} onChange={handleInputChange}>
                                {booleanOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Utilities included</label>
                            <select name="utilitiesIncluded" value={filters.utilitiesIncluded} onChange={handleInputChange}>
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

                <section style={styles.resultsPanel}>
                    <header style={styles.resultsHeader}>
                        <div>
                            <h2>Results</h2>
                            <p>{sortedResults.length} curated listings that match your preferences.</p>
                        </div>
                        <div style={styles.toolbar}>
                            <div style={styles.sortControl}>
                                <label>Sort by</label>
                                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
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

                    <div style={styles.mapPreview}>
                        <iframe
                            title="map-preview"
                            src={mapUrl}
                            style={styles.mapIframe}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div style={styles.mapLegend}>
                            <h3>Live neighbourhood preview</h3>
                            <p>
                                We centre the map on your top recommendation. Zoom around to explore commuting routes, coffee spots and study
                                hubs nearby.
                            </p>
                            {firstListing && (
                                <button
                                    type="button"
                                    style={styles.mapButton}
                                    onClick={() => navigate(`/student/accommodation/${firstListing.id}`)}
                                >
                                    View spotlight listing →
                                </button>
                            )}
                        </div>
                    </div>

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
                        {sortedResults.map((item) => (
                            <article key={item.id} style={viewMode === "grid" ? styles.card : styles.cardList}>
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
                                    <li>Utilities: {item.utilitiesIncluded || item.isUtilitiesIncluded ? "Included" : "Excluded"}</li>
                                </ul>
                                <div style={styles.landlordBlock}>
                                    <div>
                                        <p style={styles.landlordName}>Listed by {item.landlordName || item.landlord?.landlordFirstName}</p>
                                        {item.landlordEmail || item.landlord?.contact?.email ? (
                                            <p style={styles.landlordEmail}>{item.landlordEmail || item.landlord?.contact?.email}</p>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        style={styles.viewButton}
                                        onClick={() => navigate(`/student/accommodation/${item.id}`)}
                                    >
                                        View details
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

const glassPanel = {
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    borderRadius: "24px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "var(--shadow-floating)",
    backdropFilter: "blur(18px)",
};

const styles = {
    page: {
        minHeight: "100vh",
        padding: "40px clamp(24px, 4vw, 64px) 80px",
        background: "linear-gradient(180deg, rgba(241, 245, 249, 0.8) 0%, rgba(226, 232, 240, 0.9) 70%, rgba(248, 250, 252, 0.95) 100%)",
        color: "#0f172a",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    hero: {
        margin: "0 auto 40px",
        maxWidth: "1120px",
    },
    heroContent: {
        ...glassPanel,
        padding: "32px clamp(24px, 5vw, 48px)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    heroBadge: {
        alignSelf: "flex-start",
        padding: "6px 14px",
        borderRadius: "999px",
        background: "rgba(37, 99, 235, 0.12)",
        color: "#1d4ed8",
        fontSize: "13px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 600,
    },
    title: {
        margin: 0,
        fontSize: "clamp(2rem, 4vw, 3rem)",
        letterSpacing: "-0.01em",
    },
    subtitle: {
        margin: 0,
        color: "#475569",
        fontSize: "1.05rem",
        lineHeight: 1.7,
        maxWidth: "720px",
    },
    heroMetrics: {
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
    },
    heroMetricCard: {
        ...glassPanel,
        padding: "18px 22px",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        backgroundColor: "rgba(15, 23, 42, 0.05)",
    },
    layout: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)",
        gap: "32px",
        alignItems: "flex-start",
        maxWidth: "1240px",
        margin: "0 auto",
    },
    filterPanel: {
        ...glassPanel,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        position: "sticky",
        top: "24px",
    },
    panelHeader: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    searchField: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "relative",
    },
    searchInputWrapper: {
        position: "relative",
    },
    suggestionList: {
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        margin: 0,
        padding: 0,
        listStyle: "none",
        boxShadow: "var(--shadow-floating)",
        zIndex: 10,
        maxHeight: "240px",
        overflowY: "auto",
    },
    suggestionItem: {
        padding: "12px 16px",
        cursor: "pointer",
    },
    filterGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontSize: "14px",
    },
    actions: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
    },
    primaryButton: {
        padding: "12px 22px",
        borderRadius: "999px",
        border: "none",
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        color: "#fff",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
    },
    secondaryButton: {
        padding: "12px 22px",
        borderRadius: "999px",
        border: "1px solid rgba(148, 163, 184, 0.35)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "#1e293b",
        fontSize: "15px",
        fontWeight: 500,
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
    mapPreview: {
        ...glassPanel,
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        gap: "0",
        overflow: "hidden",
    },
    mapIframe: {
        width: "100%",
        minHeight: "320px",
        border: "none",
    },
    mapLegend: {
        padding: "24px",
        background: "rgba(15, 23, 42, 0.75)",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    mapButton: {
        marginTop: "auto",
        alignSelf: "flex-start",
        padding: "10px 18px",
        borderRadius: "999px",
        border: "1px solid rgba(186, 230, 253, 0.6)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        color: "#e0f2fe",
        cursor: "pointer",
        fontWeight: 600,
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
    },
    cardList: {
        ...glassPanel,
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
        gap: "24px",
        alignItems: "center",
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
};

export default SearchAccommodation;
