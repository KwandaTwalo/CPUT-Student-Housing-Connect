import React, { useEffect, useMemo, useState } from "react";
import {
    FaBed,
    FaCheckCircle,
    FaExclamationTriangle,
    FaFilter,
    FaHome,
    FaMapMarkerAlt,
    FaSearch,
    FaShieldAlt,
    FaWifi,
} from "react-icons/fa";
import AdminNavigation from "../../../components/admin/AdminNavigation";

const pageStyles = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f8fc 0%, #e9eef9 100%)",
    padding: "48px 32px",
    fontFamily: '"Segoe UI", sans-serif',
    color: "#1f2937",
};

const cardStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
    padding: "28px",
    border: "1px solid rgba(148, 163, 184, 0.25)",
};

const badgeStyles = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
};

const statusPalette = {
    Pending: { bg: "rgba(59, 130, 246, 0.15)", color: "#1d4ed8" },
    Approved: { bg: "rgba(16, 185, 129, 0.16)", color: "#0f766e" },
    Rejected: { bg: "rgba(239, 68, 68, 0.16)", color: "#b91c1c" },
    "Needs Info": { bg: "rgba(249, 115, 22, 0.18)", color: "#c2410c" },
};

const statusOptions = ["All", "Pending", "Needs Info", "Approved", "Rejected"];

const currencyFormatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
});

const initialListings = [
    {
        id: "LIST-441",
        name: "Maverick Residences",
        landlord: "Neo Daniels",
        submittedOn: "2024-05-05 19:14",
        location: "1 Park Lane, Salt River",
        distanceToCampusKm: 3.2,
        monthlyRent: 4200,
        occupancy: "Single rooms",
        capacity: 45,
        amenities: ["High-speed WiFi", "Biometric access", "Study pods"],
        documents: [
            { name: "Safety certificate", status: "Verified" },
            { name: "Municipal clearance", status: "Pending" },
            { name: "Photos & floor plans", status: "Verified" },
        ],
        status: "Pending",
        riskRating: "Low",
        notes: "Awaiting municipal clearance letter with latest utility stamp.",
    },
    {
        id: "LIST-437",
        name: "Belhar Village Loft 21",
        landlord: "Khanyisa Properties",
        submittedOn: "2024-05-03 14:28",
        location: "21 Beroma Street, Belhar",
        distanceToCampusKm: 0.9,
        monthlyRent: 3800,
        occupancy: "Shared rooms",
        capacity: 72,
        amenities: ["24/7 security", "Dedicated study area", "Shuttle service"],
        documents: [
            { name: "Safety certificate", status: "Pending" },
            { name: "Fire inspection report", status: "Pending" },
            { name: "Photos & floor plans", status: "Verified" },
        ],
        status: "Needs Info",
        riskRating: "Medium",
        notes: "Fire inspection scheduled for 9 May. Follow up required.",
    },
    {
        id: "LIST-432",
        name: "Atlantic View 204",
        landlord: "UrbanStay",
        submittedOn: "2024-04-29 09:55",
        location: "204 Beach Road, Mouille Point",
        distanceToCampusKm: 6.8,
        monthlyRent: 5200,
        occupancy: "Single rooms",
        capacity: 20,
        amenities: ["Laundry service", "Gym access", "Ocean view"],
        documents: [
            { name: "Safety certificate", status: "Verified" },
            { name: "Municipal clearance", status: "Verified" },
            { name: "Photos & floor plans", status: "Verified" },
        ],
        status: "Approved",
        riskRating: "Low",
        reviewer: "Ethan Jacobs",
        reviewedOn: "2024-04-30 12:05",
        notes: "Approved after resolving outstanding student complaints from 2023.",
    },
    {
        id: "LIST-420",
        name: "Oakdene Gardens",
        landlord: "Maseko Student Housing",
        submittedOn: "2024-04-20 16:50",
        location: "18 Oakdene Road, Rondebosch",
        distanceToCampusKm: 1.5,
        monthlyRent: 3500,
        occupancy: "Shared rooms",
        capacity: 60,
        amenities: ["Study centre", "Laundry", "Backup power"],
        documents: [
            { name: "Safety certificate", status: "Verified" },
            { name: "Fire inspection report", status: "Verified" },
            { name: "Photos & floor plans", status: "Verified" },
        ],
        status: "Approved",
        riskRating: "Low",
        reviewer: "Agnes Moyo",
        reviewedOn: "2024-04-21 10:30",
        notes: "Approved after verifying electrical compliance documents.",
    },
];

function VerifyListings() {
    const [listings, setListings] = useState(initialListings);
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedListingId, setSelectedListingId] = useState(initialListings[0].id);
    const [decisionPanel, setDecisionPanel] = useState({ open: false, listingId: null, type: "approve", note: "" });
    const [feedback, setFeedback] = useState(null);

    const filteredListings = useMemo(() => {
        return listings.filter((listing) => {
            const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
            const term = searchTerm.trim().toLowerCase();
            const matchesSearch =
                term.length === 0 ||
                [listing.name, listing.landlord, listing.location, listing.id]
                    .join(" ")
                    .toLowerCase()
                    .includes(term);
            return matchesStatus && matchesSearch;
        });
    }, [listings, searchTerm, statusFilter]);

    useEffect(() => {
        if (filteredListings.length === 0) {
            setSelectedListingId(null);
            return;
        }

        if (!selectedListingId || !filteredListings.some((listing) => listing.id === selectedListingId)) {
            setSelectedListingId(filteredListings[0].id);
        }
    }, [filteredListings, selectedListingId]);

    const selectedListing = useMemo(() => {
        if (!selectedListingId) {
            return null;
        }

        return listings.find((listing) => listing.id === selectedListingId) ?? null;
    }, [listings, selectedListingId]);

    const pendingCount = listings.filter((listing) => listing.status === "Pending" || listing.status === "Needs Info").length;
    const approvedCount = listings.filter((listing) => listing.status === "Approved").length;

    const openDecisionPanel = (listingId, type) => {
        setDecisionPanel({
            open: true,
            listingId,
            type,
            note:
                type === "approve"
                    ? "Approved after confirming compliance with safety and municipal regulations."
                    : "",
        });
    };

    const closeDecisionPanel = () => {
        setDecisionPanel({ open: false, listingId: null, type: "approve", note: "" });
    };

    const applyDecision = () => {
        if (!decisionPanel.listingId) {
            return;
        }

        if (decisionPanel.type === "reject" && decisionPanel.note.trim().length === 0) {
            setFeedback({ type: "error", message: "Please provide feedback when rejecting a listing." });
            return;
        }

        const decidedListing = listings.find((listing) => listing.id === decisionPanel.listingId);

        setListings((previous) =>
            previous.map((listing) =>
                listing.id === decisionPanel.listingId
                    ? {
                        ...listing,
                        status: decisionPanel.type === "approve" ? "Approved" : "Rejected",
                        reviewer: "Ethan Jacobs",
                        reviewedOn: new Date().toLocaleString(),
                        notes: decisionPanel.note.trim(),
                    }
                    : listing
            )
        );

        setFeedback({
            type: "success",
            message:
                decisionPanel.type === "approve"
                    ? `${decidedListing?.name ?? "The listing"} has been approved and is ready to go live.`
                    : `${decidedListing?.name ?? "The listing"} has been rejected and the landlord has been notified.`,
        });

        closeDecisionPanel();
    };

    const renderStatusBadge = (status) => {
        const palette = statusPalette[status] ?? statusPalette.Pending;
        const icon = status === "Approved" ? <FaCheckCircle size={13} /> : <FaExclamationTriangle size={13} />;
        return (
            <span style={{ ...badgeStyles, background: palette.bg, color: palette.color }}>
                {icon}
                {status}
            </span>
        );
    };

    const renderDocumentStatus = (status) => {
        const normalized = status.toLowerCase();
        const isVerified = normalized === "verified";
        return (
            <span
                style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: isVerified ? "rgba(22, 163, 74, 0.16)" : "rgba(217, 119, 6, 0.16)",
                    color: isVerified ? "#15803d" : "#b45309",
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="admin-page-shell">
            <AdminNavigation />
            <main className="admin-page-content" style={pageStyles}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "28px" }}>
                    <header
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "20px",
                        }}
                    >
                        <div>
                            <div style={{ ...badgeStyles, background: "rgba(96, 165, 250, 0.18)", color: "#1e3a8a" }}>
                                <FaShieldAlt size={14} /> Listing verification workflow
                            </div>
                            <h1 style={{ fontSize: "32px", margin: "16px 0 8px", fontWeight: 700 }}>Review accommodation listings</h1>
                            <p style={{ maxWidth: "560px", lineHeight: 1.6, color: "#475569" }}>
                                Confirm compliance documentation, ensure facilities meet safety requirements and approve high-quality
                                accommodation options for CPUT students.
                            </p>
                        </div>
                        <div style={{ ...cardStyles, width: "min(320px, 100%)", display: "grid", gap: "14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div
                                    style={{
                                        width: "46px",
                                        height: "46px",
                                        borderRadius: "14px",
                                        background: "rgba(37, 99, 235, 0.12)",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <FaHome size={22} color="#2563eb" />
                                </div>
                                <div>
                                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>Listings pending action</span>
                                    <h3 style={{ margin: "4px 0", fontSize: "26px" }}>{pendingCount}</h3>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b" }}>
                                <span>Approved this week</span>
                                <strong style={{ color: "#16a34a" }}>{approvedCount}</strong>
                            </div>
                            <button
                                type="button"
                                style={{
                                    padding: "10px 14px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(37, 99, 235, 0.35)",
                                    background: "rgba(59, 130, 246, 0.08)",
                                    color: "#1d4ed8",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                View listing criteria
                            </button>
                        </div>
                    </header>

                    {feedback && (
                        <div
                            style={{
                                ...cardStyles,
                                borderLeft: feedback.type === "success" ? "6px solid #16a34a" : "6px solid #dc2626",
                                display: "flex",
                                gap: "16px",
                                alignItems: "center",
                            }}
                        >
                            {feedback.type === "success" ? (
                                <FaCheckCircle size={22} color="#16a34a" />
                            ) : (
                                <FaExclamationTriangle size={22} color="#dc2626" />
                            )}
                            <div style={{ flex: 1 }}>
                                <strong style={{ display: "block", fontSize: "15px", marginBottom: "4px" }}>
                                    {feedback.type === "success" ? "Action completed" : "Action required"}
                                </strong>
                                <span style={{ fontSize: "14px", color: "#475569" }}>{feedback.message}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFeedback(null)}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#1d4ed8",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Dismiss
                            </button>
                        </div>
                    )}

                    <div
                        style={{
                            display: "grid",
                            gap: "24px",
                            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                        }}
                    >
                        <section style={{ ...cardStyles, display: "grid", gap: "18px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    gap: "12px",
                                    alignItems: "center",
                                }}
                            >
                                <h2 style={{ margin: 0, fontSize: "20px" }}>Verification queue</h2>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b" }}>
                                    <FaFilter size={12} /> Filter results
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "12px",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                                }}
                            >
                                <label style={{ display: "grid", gap: "6px", fontSize: "13px", color: "#475569" }}>
                                    Search
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "10px 12px",
                                            borderRadius: "12px",
                                            border: "1px solid rgba(148, 163, 184, 0.35)",
                                            background: "#f8fafc",
                                        }}
                                    >
                                        <FaSearch size={14} color="#64748b" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                            placeholder="Listing, landlord or ID"
                                            style={{
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                fontSize: "14px",
                                                color: "#0f172a",
                                            }}
                                        />
                                    </div>
                                </label>
                                <label style={{ display: "grid", gap: "6px", fontSize: "13px", color: "#475569" }}>
                                    Status
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "10px 12px",
                                            borderRadius: "12px",
                                            border: "1px solid rgba(148, 163, 184, 0.35)",
                                            background: "#f8fafc",
                                        }}
                                    >
                                        <select
                                            value={statusFilter}
                                            onChange={(event) => setStatusFilter(event.target.value)}
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                fontSize: "14px",
                                                color: "#0f172a",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </label>
                            </div>

                            <div style={{ display: "grid", gap: "12px" }}>
                                {filteredListings.length === 0 ? (
                                    <div
                                        style={{
                                            padding: "18px",
                                            borderRadius: "14px",
                                            background: "rgba(148, 163, 184, 0.12)",
                                            color: "#475569",
                                            textAlign: "center",
                                            fontWeight: 500,
                                        }}
                                    >
                                        No listings match the current filters.
                                    </div>
                                ) : (
                                    filteredListings.map((listing) => {
                                        const isSelected = listing.id === selectedListingId;
                                        return (
                                            <button
                                                key={listing.id}
                                                type="button"
                                                onClick={() => setSelectedListingId(listing.id)}
                                                style={{
                                                    display: "grid",
                                                    gap: "10px",
                                                    textAlign: "left",
                                                    padding: "16px",
                                                    borderRadius: "16px",
                                                    border: isSelected
                                                        ? "2px solid rgba(37, 99, 235, 0.6)"
                                                        : "1px solid rgba(148, 163, 184, 0.3)",
                                                    background: isSelected
                                                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(96, 165, 250, 0.12))"
                                                        : "linear-gradient(135deg, rgba(248, 250, 255, 0.85), rgba(229, 236, 255, 0.65))",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                                                    <div>
                                                        <strong style={{ fontSize: "15px", display: "block" }}>{listing.name}</strong>
                                                        <span style={{ fontSize: "13px", color: "#64748b" }}>by {listing.landlord}</span>
                                                    </div>
                                                    {renderStatusBadge(listing.status)}
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", fontSize: "13px" }}>
                                                    <FaMapMarkerAlt size={13} />
                                                    <span>{listing.location}</span>
                                                </div>
                                                <div style={{ fontSize: "13px", color: "#475569", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                                        <FaBed size={13} /> {listing.occupancy}
                                                    </span>
                                                    <span>Capacity {listing.capacity}</span>
                                                    <span>{currencyFormatter.format(listing.monthlyRent)}/month</span>
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        <section style={{ ...cardStyles, display: "grid", gap: "18px" }}>
                            {selectedListing ? (
                                <>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "14px" }}>
                                        <div style={{ display: "grid", gap: "6px" }}>
                                            <h2 style={{ margin: 0, fontSize: "22px" }}>{selectedListing.name}</h2>
                                            <span style={{ fontSize: "13px", color: "#64748b" }}>Submitted on {selectedListing.submittedOn}</span>
                                            <span style={{ fontSize: "13px", color: "#64748b" }}>Landlord: {selectedListing.landlord}</span>
                                        </div>
                                        <div style={{ display: "grid", gap: "8px", justifyItems: "end" }}>
                                            {renderStatusBadge(selectedListing.status)}
                                            <span style={{ fontSize: "12px", color: "#64748b" }}>Risk rating: {selectedListing.riskRating}</span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "12px",
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(248, 250, 255, 0.9)",
                                            border: "1px solid rgba(148, 163, 184, 0.25)",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1e3a8a", fontWeight: 600 }}>
                                            <FaMapMarkerAlt size={14} /> {selectedListing.location}
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "13px", color: "#475569" }}>
                                            <span>{selectedListing.distanceToCampusKm}km to campus</span>
                                            <span>Capacity {selectedListing.capacity}</span>
                                            <span>{currencyFormatter.format(selectedListing.monthlyRent)}/month</span>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                            {selectedListing.amenities.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        padding: "6px 12px",
                                                        borderRadius: "999px",
                                                        background: "rgba(37, 99, 235, 0.08)",
                                                        color: "#1d4ed8",
                                                        fontSize: "12px",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <FaWifi size={12} />
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: "grid", gap: "12px" }}>
                                        <h3 style={{ margin: 0, fontSize: "18px" }}>Submitted documents</h3>
                                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
                                            {selectedListing.documents.map((document) => (
                                                <li
                                                    key={document.name}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "12px 16px",
                                                        borderRadius: "14px",
                                                        background: "rgba(241, 245, 249, 0.8)",
                                                    }}
                                                >
                                                    <span style={{ fontSize: "14px", color: "#1f2937" }}>{document.name}</span>
                                                    {renderDocumentStatus(document.status)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ display: "grid", gap: "8px" }}>
                                        <h3 style={{ margin: 0, fontSize: "18px" }}>Reviewer notes</h3>
                                        <p style={{ margin: 0, lineHeight: 1.6, color: "#475569" }}>{selectedListing.notes}</p>
                                        {selectedListing.reviewer && selectedListing.reviewedOn && (
                                            <span style={{ fontSize: "12px", color: "#64748b" }}>
                                                Last reviewed by {selectedListing.reviewer} on {selectedListing.reviewedOn}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                        <button
                                            type="button"
                                            onClick={() => openDecisionPanel(selectedListing.id, "approve")}
                                            style={{
                                                padding: "12px 18px",
                                                borderRadius: "12px",
                                                border: "none",
                                                background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Approve listing
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openDecisionPanel(selectedListing.id, "reject")}
                                            style={{
                                                padding: "12px 18px",
                                                borderRadius: "12px",
                                                border: "1px solid rgba(220, 38, 38, 0.5)",
                                                background: "rgba(254, 226, 226, 0.7)",
                                                color: "#b91c1c",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Reject listing
                                        </button>
                                    </div>

                                    {decisionPanel.open && decisionPanel.listingId === selectedListing.id && (
                                        <div
                                            style={{
                                                display: "grid",
                                                gap: "12px",
                                                padding: "18px",
                                                borderRadius: "16px",
                                                background: "rgba(248, 113, 113, 0.08)",
                                                border: "1px solid rgba(220, 38, 38, 0.3)",
                                            }}
                                        >
                                            <h3 style={{ margin: 0, fontSize: "18px" }}>
                                                {decisionPanel.type === "approve" ? "Confirm approval" : "Provide rejection details"}
                                            </h3>
                                            <textarea
                                                value={decisionPanel.note}
                                                onChange={(event) =>
                                                    setDecisionPanel((previous) => ({ ...previous, note: event.target.value }))
                                                }
                                                placeholder={
                                                    decisionPanel.type === "approve"
                                                        ? "Add context for the approval (optional)."
                                                        : "Explain why the listing cannot be approved."
                                                }
                                                style={{
                                                    width: "100%",
                                                    minHeight: "120px",
                                                    borderRadius: "12px",
                                                    border: "1px solid rgba(148, 163, 184, 0.4)",
                                                    padding: "12px",
                                                    fontFamily: '"Segoe UI", sans-serif',
                                                    fontSize: "14px",
                                                    resize: "vertical",
                                                    color: "#0f172a",
                                                    background: "#ffffff",
                                                }}
                                            />
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "flex-end" }}>
                                                <button
                                                    type="button"
                                                    onClick={closeDecisionPanel}
                                                    style={{
                                                        padding: "10px 16px",
                                                        borderRadius: "10px",
                                                        border: "1px solid rgba(148, 163, 184, 0.4)",
                                                        background: "#ffffff",
                                                        color: "#1f2937",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={applyDecision}
                                                    style={{
                                                        padding: "10px 16px",
                                                        borderRadius: "10px",
                                                        border: "none",
                                                        background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                                                        color: "#ffffff",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Confirm decision
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div
                                    style={{
                                        display: "grid",
                                        gap: "12px",
                                        alignItems: "center",
                                        justifyItems: "center",
                                        padding: "32px 16px",
                                        textAlign: "center",
                                        color: "#475569",
                                        background: "rgba(248, 250, 255, 0.85)",
                                        borderRadius: "16px",
                                        border: "1px dashed rgba(148, 163, 184, 0.4)",
                                    }}
                                >
                                    <FaHome size={32} color="#cbd5f5" />
                                    <div>
                                        <strong style={{ display: "block", marginBottom: "6px" }}>No listing selected</strong>
                                        <span style={{ fontSize: "14px" }}>Choose a listing from the queue to review its details.</span>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default VerifyListings;
