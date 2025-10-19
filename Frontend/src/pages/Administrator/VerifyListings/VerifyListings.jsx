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
            { name: "Municipal clearance", status: "Verified" },
            { name: "Photos & floor plans", status: "Verified" },
        ],
        status: "Rejected",
        riskRating: "High",
        reviewer: "Agnes Moyo",
        reviewedOn: "2024-04-22 10:42",
        notes: "Rejected due to overcrowding complaints and unresolved maintenance issues.",
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

    const openDecisionPanel = (listingId, type) => {
        setDecisionPanel({
            open: true,
            listingId,
            type,
            note:
                type === "approve"
                    ? "Approved after confirming compliance documentation and inspection reports."
                    : "Provide a clear explanation so the landlord can resolve issues before resubmitting.",
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
            setFeedback({ type: "error", message: "Please provide a reason when rejecting a listing." });
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

    const pendingCount = listings.filter((listing) => listing.status === "Pending" || listing.status === "Needs Info").length;
    const approvedCount = listings.filter((listing) => listing.status === "Approved").length;

    return (
        <main className="admin-page-shell">
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
                                <span style={{ fontSize: "13px", color: "#94a3b8" }}>Awaiting action</span>
                                <h3 style={{ margin: "4px 0", fontSize: "26px" }}>{pendingCount}</h3>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b" }}>
                            <span>Approved this month</span>
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
                            Download inspection checklist
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
                            <strong style={{ display: "block", marginBottom: "4px" }}>
                                {feedback.type === "success" ? "Decision recorded" : "Action needed"}
                            </strong>
                            <span style={{ color: "#475569" }}>{feedback.message}</span>
                        </div>
                    </div>
                )}

                <section style={cardStyles}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(148, 163, 184, 0.35)",
                                    backgroundColor: "#f8fbff",
                                }}
                            >
                                <FaSearch size={15} color="#64748b" />
                                <input
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        outline: "none",
                                        fontSize: "14px",
                                        color: "#0f172a",
                                        minWidth: "220px",
                                    }}
                                    placeholder="Search by listing, landlord or suburb"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 16px",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(148, 163, 184, 0.35)",
                                    backgroundColor: "#f8fbff",
                                }}
                            >
                                <FaFilter size={15} color="#64748b" />
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        outline: "none",
                                        fontSize: "14px",
                                        color: "#0f172a",
                                        fontWeight: 600,
                                    }}
                                >
                                    <option value="All">All statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Needs Info">Needs info</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                        <span style={{ color: "#94a3b8", fontSize: "13px" }}>
              {filteredListings.length} results shown
            </span>
                    </div>

                    <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
                        {filteredListings.length === 0 ? (
                            <div
                                style={{
                                    padding: "32px",
                                    textAlign: "center",
                                    border: "1px dashed rgba(148, 163, 184, 0.4)",
                                    borderRadius: "16px",
                                    color: "#64748b",
                                }}
                            >
                                No listings match your filters just yet.
                            </div>
                        ) : (
                            filteredListings.map((listing) => (
                                <div
                                    key={listing.id}
                                    style={{
                                        border: selectedListingId === listing.id ? "2px solid #2563eb" : "1px solid rgba(148, 163, 184, 0.25)",
                                        borderRadius: "18px",
                                        padding: "18px",
                                        background: selectedListingId === listing.id ? "rgba(37, 99, 235, 0.06)" : "rgba(248, 250, 255, 0.7)",
                                        display: "grid",
                                        gap: "12px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedListingId(listing.id)}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <strong style={{ fontSize: "16px" }}>{listing.name}</strong>
                                            <div style={{ color: "#475569", fontSize: "13px" }}>Landlord: {listing.landlord}</div>
                                        </div>
                                        {renderStatusBadge(listing.status)}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "13px", color: "#475569" }}>
                    <span>
                      <FaMapMarkerAlt size={12} style={{ marginRight: "6px", color: "#2563eb" }} />
                        {listing.location}
                    </span>
                                        <span>{listing.distanceToCampusKm} km from campus</span>
                                        <span>R{listing.monthlyRent.toLocaleString()} p/m</span>
                                        <span>{listing.capacity} beds</span>
                                        <span>{listing.occupancy}</span>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        {listing.amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                style={{
                                                    ...badgeStyles,
                                                    background: "rgba(59, 130, 246, 0.12)",
                                                    color: "#2563eb",
                                                    fontSize: "12px",
                                                }}
                                            >
                        <FaWifi size={11} style={{ marginRight: "4px" }} />
                                                {amenity}
                      </span>
                                        ))}
                                    </div>
                                    <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{listing.notes}</p>
                                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openDecisionPanel(listing.id, "approve");
                                            }}
                                            style={{
                                                border: "none",
                                                borderRadius: "12px",
                                                padding: "10px 16px",
                                                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openDecisionPanel(listing.id, "reject");
                                            }}
                                            style={{
                                                border: "none",
                                                borderRadius: "12px",
                                                padding: "10px 16px",
                                                background: "linear-gradient(135deg, #dc2626, #f87171)",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {selectedListing && (
                    <section style={{ ...cardStyles, display: "grid", gap: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: "22px" }}>Listing details</h2>
                                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                    Review compliance evidence, facilities and overall student readiness.
                                </p>
                            </div>
                            <div style={{ ...badgeStyles, background: "rgba(37, 99, 235, 0.12)", color: "#1d4ed8" }}>
                                <FaHome size={14} /> {selectedListing.name}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "18px",
                            }}
                        >
                            <div style={{ border: "1px solid rgba(148, 163, 184, 0.35)", borderRadius: "16px", padding: "18px", display: "grid", gap: "12px" }}>
                                <strong>Location &amp; access</strong>
                                <span style={{ fontSize: "13px", color: "#475569" }}>{selectedListing.location}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>{selectedListing.distanceToCampusKm} km from main campus</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Submitted on {selectedListing.submittedOn}</span>
                            </div>
                            <div style={{ border: "1px solid rgba(148, 163, 184, 0.35)", borderRadius: "16px", padding: "18px", display: "grid", gap: "12px" }}>
                                <strong>Capacity &amp; pricing</strong>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Monthly rent: R{selectedListing.monthlyRent.toLocaleString()}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Capacity: {selectedListing.capacity} beds</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Occupancy type: {selectedListing.occupancy}</span>
                            </div>
                            <div style={{ border: "1px solid rgba(148, 163, 184, 0.35)", borderRadius: "16px", padding: "18px", display: "grid", gap: "12px" }}>
                                <strong>Risk notes</strong>
                                <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>{selectedListing.notes}</p>
                                {selectedListing.reviewer && (
                                    <span style={{ fontSize: "13px", color: "#475569" }}>
                    Reviewed by {selectedListing.reviewer} on {selectedListing.reviewedOn}
                  </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>Supporting documentation</h3>
                            <div style={{ display: "grid", gap: "12px" }}>
                                {selectedListing.documents.map((document) => (
                                    <div
                                        key={document.name}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "14px 18px",
                                            borderRadius: "14px",
                                            border: "1px solid rgba(148, 163, 184, 0.3)",
                                            background: "rgba(248, 250, 255, 0.8)",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <FaBed size={18} color="#2563eb" />
                                            <span style={{ fontSize: "14px", fontWeight: 600 }}>{document.name}</span>
                                        </div>
                                        <span
                                            style={{
                                                ...badgeStyles,
                                                background:
                                                    document.status === "Verified" ? "rgba(16, 185, 129, 0.16)" : "rgba(249, 115, 22, 0.18)",
                                                color: document.status === "Verified" ? "#0f766e" : "#c2410c",
                                            }}
                                        >
                      {document.status}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {decisionPanel.open && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(15, 23, 42, 0.55)",
                            display: "grid",
                            placeItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div style={{ ...cardStyles, maxWidth: "520px", width: "90%", display: "grid", gap: "18px" }}>
                            <h3 style={{ margin: 0 }}>
                                {decisionPanel.type === "approve" ? "Approve listing" : "Reject listing"}
                            </h3>
                            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                {decisionPanel.type === "approve"
                                    ? "Confirm that the listing meets CPUT standards. Students will be notified once it goes live."
                                    : "Provide clear feedback so the landlord understands what to fix before resubmitting."}
                            </p>
                            <textarea
                                style={{
                                    width: "100%",
                                    minHeight: "120px",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(148, 163, 184, 0.35)",
                                    padding: "14px",
                                    fontSize: "14px",
                                    color: "#0f172a",
                                    resize: "vertical",
                                    background: "#f8fbff",
                                }}
                                value={decisionPanel.note}
                                onChange={(event) => setDecisionPanel((previous) => ({ ...previous, note: event.target.value }))}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", flexWrap: "wrap" }}>
                                <button
                                    type="button"
                                    onClick={closeDecisionPanel}
                                    style={{
                                        padding: "10px 16px",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(148, 163, 184, 0.35)",
                                        background: "transparent",
                                        color: "#475569",
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
                                        borderRadius: "12px",
                                        border: "none",
                                        background:
                                            decisionPanel.type === "approve"
                                                ? "linear-gradient(135deg, #16a34a, #22c55e)"
                                                : "linear-gradient(135deg, #dc2626, #f87171)",
                                        color: "#ffffff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    {decisionPanel.type === "approve" ? "Approve listing" : "Reject listing"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}

export default VerifyListings;
