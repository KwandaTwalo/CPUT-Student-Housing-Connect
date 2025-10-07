import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAccommodations } from "../../../services/accommodationService";

const initialFilters = {
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

const cardStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 18px 45px rgba(15, 37, 64, 0.12)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
};

const booleanOptions = [
    { value: "any", label: "Any" },
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
];
function SearchAccommodation() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const normaliseBoolean = useCallback((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return undefined;
    }, []);

    const buildPayload = useCallback(() => {
        const payload = {};

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const payload = buildPayload();
        loadResults(payload);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        loadResults();
    };

    const filterChips = useMemo(() => {
        return [
            filters.city && `City: ${filters.city}`,
            filters.suburb && `Suburb: ${filters.suburb}`,
            filters.roomType && `Room: ${filters.roomType}`,
            filters.bathroomType && `Bathroom: ${filters.bathroomType}`,
            filters.minRent && `Min rent: R${filters.minRent}`,
            filters.maxRent && `Max rent: R${filters.maxRent}`,
            filters.maxDistanceFromCampus && `≤ ${filters.maxDistanceFromCampus} km from campus`,
            normaliseBoolean(filters.wifiAvailable) !== undefined && `Wi-Fi: ${filters.wifiAvailable === "true" ? "Yes" : "No"}`,
            normaliseBoolean(filters.furnished) !== undefined && `Furnished: ${filters.furnished === "true" ? "Yes" : "No"}`,
            normaliseBoolean(filters.utilitiesIncluded) !== undefined && `Utilities: ${filters.utilitiesIncluded === "true" ? "Included" : "Excluded"}`,
        ].filter(Boolean);
    }, [filters, normaliseBoolean]);
  return (
      <div style={styles.page}>
          <div style={styles.hero}>
              <div>
                  <h1 style={styles.title}>Find accommodation near your campus</h1>
                  <p style={styles.subtitle}>
                      Use the filters below to discover available accommodation that matches your preferences.
                  </p>
              </div>
          </div>

          <form style={styles.filterCard} onSubmit={handleSearch}>
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
                      {loading ? "Searching..." : "Search"}
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

          <section style={styles.resultsSection}>
              {error && <div style={styles.error}>{error}</div>}
              {!error && loading && <div style={styles.loading}>Loading available accommodation...</div>}
              {!loading && !error && results.length === 0 && (
                  <div style={styles.emptyState}>
                      <h3>No accommodation found</h3>
                      <p>Adjust your filters and try again. New listings are added regularly.</p>
                  </div>
              )}

              <div style={styles.grid}>
                  {results.map((item) => (
                      <article key={item.id} style={cardStyles}>
                          <div>
                              <h2 style={styles.cardTitle}>R{item.rent.toFixed(2)} / month</h2>
                              <p style={styles.cardSubtitle}>
                                  {item.streetAddress || "Address on request"}
                                  {item.suburb ? `, ${item.suburb}` : ""}
                                  {item.city ? `, ${item.city}` : ""}
                              </p>
                          </div>
                          <div style={styles.tagRow}>
                              <span style={styles.tag}>{item.roomType?.replace("_", " ")}</span>
                              <span style={styles.tag}>{item.bathroomType} bathroom</span>
                              <span style={styles.tag}>Status: {item.status}</span>
                          </div>
                          <ul style={styles.featureList}>
                              <li>Wi-Fi: {item.wifiAvailable ? "Included" : "Not included"}</li>
                              <li>Furnished: {item.furnished ? "Yes" : "No"}</li>
                              <li>Utilities: {item.utilitiesIncluded ? "Included" : "Excluded"}</li>
                              <li>{item.distanceFromCampus.toFixed(1)} km from campus</li>
                          </ul>
                          <div style={styles.landlordBlock}>
                              <p style={{ margin: 0, fontWeight: 600 }}>Listed by {item.landlordName || "Verified landlord"}</p>
                              {item.landlordEmail && <p style={styles.landlordEmail}>{item.landlordEmail}</p>}
                          </div>
                          <button
                              type="button"
                              style={styles.viewButton}
                              onClick={() => navigate(`/student/accommodation/${item.id}`)}
                          >
                              View details
                          </button>
                      </article>
                  ))}
              </div>
          </section>
    </div>
  );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f6f8fc 0%, #eef3fb 100%)",
        padding: "48px 32px 72px",
        color: "#1e293b",
        fontFamily: "'Segoe UI', sans-serif",
    },
    hero: {
        maxWidth: "960px",
        margin: "0 auto 32px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    title: {
        fontSize: "32px",
        margin: 0,
    },
    subtitle: {
        margin: 0,
        color: "#475569",
    },
    filterCard: {
        maxWidth: "960px",
        margin: "0 auto 40px",
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    filterGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "18px",
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
        alignItems: "center",
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
        border: "1px solid #cbd5f5",
        backgroundColor: "#fff",
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
    resultsSection: {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
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
        backgroundColor: "rgba(241, 245, 249, 0.6)",
        padding: "12px",
        borderRadius: "12px",
    },
    landlordEmail: {
        margin: "4px 0 0",
        color: "#475569",
        fontSize: "14px",
    },
    viewButton: {
        marginTop: "8px",
        alignSelf: "flex-start",
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
        borderRadius: "12px",
        backgroundColor: "rgba(239, 68, 68, 0.12)",
        color: "#b91c1c",
    },
    loading: {
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        color: "#1d4ed8",
    },
    emptyState: {
        textAlign: "center",
        padding: "48px",
        backgroundColor: "#fff",
        borderRadius: "18px",
        border: "1px dashed rgba(148, 163, 184, 0.5)",
    },
};

export default SearchAccommodation;