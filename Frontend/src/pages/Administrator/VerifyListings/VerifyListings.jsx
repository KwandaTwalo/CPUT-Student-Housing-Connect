import React, { useMemo, useState } from "react";
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
    Pending: { bg: "rgba(59, 130, 246, 0.15)", colour: "#1d4ed8" },
    Approved: { bg: "rgba(16, 185, 129, 0.16)", colour: "#0f766e" },
    Rejected: { bg: "rgba(239, 68, 68, 0.16)", colour: "#b91c1c" },
    "Needs Info": { bg: "rgba(249, 115, 22, 0.18)", colour: "#c2410c" },
};

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

    const selectedListing = useMemo(
        () => listings.find((listing) => listing.id === selectedListingId) ?? listings[0],
        [listings, selectedListingId]
    );

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
                    : "Please specify the issues that must be addressed before approval.",
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

        const decidedListing = listings.find((listing) => listing.id === decisionPanel.listingId);
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
            <span style={{ ...badgeStyles, background: palette.bg, color: palette.colour }}>
                {icon}
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
                                Confirm compliance documentation, ensure facilities meet safety requirements and approve
                                high-quality accommodation options for CPUT students.
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
                            <div>
                                <strong style={{
