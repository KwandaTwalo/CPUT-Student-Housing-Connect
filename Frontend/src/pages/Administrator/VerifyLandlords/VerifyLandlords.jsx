import React, { useMemo, useState } from "react";
import {
    FaCheckCircle,
    FaEnvelopeOpen,
    FaExclamationTriangle,
    FaFileAlt,
    FaFilter,
    FaSearch,
    FaShieldAlt,
    FaUserTie,
} from "react-icons/fa";

const pageStyles = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f9 100%)",
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

const statusColours = {
    Pending: { bg: "rgba(59, 130, 246, 0.15)", colour: "#1d4ed8" },
    Approved: { bg: "rgba(16, 185, 129, 0.16)", colour: "#0f766e" },
    Rejected: { bg: "rgba(239, 68, 68, 0.16)", colour: "#b91c1c" },
    "On Hold": { bg: "rgba(249, 115, 22, 0.18)", colour: "#c2410c" },
};

const initialLandlords = [
    {
        id: "REQ-3022",
        name: "Neo Daniels",
        email: "neo.daniels@cput.ac.za",
        phone: "+27 82 111 4588",
        company: "Neo Daniels Holdings",
        address: "Unit 12, Observatory Square, Cape Town",
        submittedOn: "2024-05-06 08:10",
        propertyCount: 18,
        documents: [
            { name: "ID document", status: "Verified" },
            { name: "Proof of ownership", status: "Pending" },
            { name: "CIPC registration", status: "Verified" },
        ],
        riskLevel: "Medium",
        status: "Pending",
        notes: "Awaiting updated proof of ownership with municipal stamp.",
    },
    {
        id: "REQ-3021",
        name: "Lerato Maseko",
        email: "lerato.maseko@cput.ac.za",
        phone: "+27 72 883 9088",
        company: "Maseko Student Housing",
        address: "45 Palm Grove, Bellville",
        submittedOn: "2024-05-04 16:40",
        propertyCount: 12,
        documents: [
            { name: "ID document", status: "Verified" },
            { name: "Proof of ownership", status: "Verified" },
            { name: "CIPC registration", status: "Verified" },
        ],
        riskLevel: "Low",
        status: "Approved",
        reviewer: "Agnes Moyo",
        reviewedOn: "2024-05-05 10:22",
        notes: "Passed enhanced due diligence. ",
    },
    {
        id: "REQ-3017",
        name: "Khanyisa Properties",
        email: "info@khanyisa-properties.co.za",
        phone: "+27 21 447 9831",
        company: "Khanyisa Properties",
        address: "101 Loop Street, Cape Town",
        submittedOn: "2024-05-03 11:18",
        propertyCount: 32,
        documents: [
            { name: "ID document", status: "Verified" },
            { name: "Proof of ownership", status: "Verified" },
            { name: "Safety certificate", status: "Pending" },
        ],
        riskLevel: "High",
        status: "On Hold",
        notes: "Needs updated safety certificate for Observatory residence.",
    },
    {
        id: "REQ-3009",
        name: "Gerald Smith",
        email: "gerald.smith@urbanstay.co.za",
        phone: "+27 81 555 2201",
        company: "UrbanStay",
        address: "8 Stadler Road, Bloubergstrand",
        submittedOn: "2024-04-28 09:55",
        propertyCount: 6,
        documents: [
            { name: "ID document", status: "Verified" },
            { name: "Proof of ownership", status: "Verified" },
            { name: "CIPC registration", status: "Verified" },
        ],
        riskLevel: "Low",
        status: "Rejected",
        reviewer: "Ethan Jacobs",
        reviewedOn: "2024-04-29 13:10",
        notes: "Rejected due to unresolved complaints from students in 2023.",
    },
];

function VerifyLandlords() {
    const [landlords, setLandlords] = useState(initialLandlords);
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLandlordId, setSelectedLandlordId] = useState(initialLandlords[0].id);
    const [decisionPanel, setDecisionPanel] = useState({ open: false, landlordId: null, type: "approve", note: "" });
    const [feedback, setFeedback] = useState(null);

    const filteredLandlords = useMemo(() => {
        return landlords.filter((landlord) => {
            const matchesStatus = statusFilter === "All" || landlord.status === statusFilter;
            const term = searchTerm.trim().toLowerCase();
            const matchesSearch =
                term.length === 0 ||
                [landlord.name, landlord.email, landlord.company, landlord.id]
                    .join(" ")
                    .toLowerCase()
                    .includes(term);
            return matchesStatus && matchesSearch;
        });
    }, [landlords, searchTerm, statusFilter]);

    const selectedLandlord = useMemo(
        () => landlords.find((landlord) => landlord.id === selectedLandlordId) ?? landlords[0],
        [landlords, selectedLandlordId]
    );

    const pendingCount = landlords.filter((landlord) => landlord.status === "Pending" || landlord.status === "On Hold").length;
    const approvedCount = landlords.filter((landlord) => landlord.status === "Approved").length;

    const openDecisionPanel = (landlordId, type) => {
        setDecisionPanel({
            open: true,
            landlordId,
            type,
            note:
                type === "approve"
                    ? "Approved after manual verification of supporting documents."
                    : "Please provide additional context for the rejection.",
        });
    };

    const closeDecisionPanel = () => {
        setDecisionPanel({ open: false, landlordId: null, type: "approve", note: "" });
    };

    const applyDecision = () => {
        if (!decisionPanel.landlordId) {
            return;
        }

        if (decisionPanel.type === "reject" && decisionPanel.note.trim().length === 0) {
            setFeedback({ type: "error", message: "Please provide a reason when rejecting a landlord application." });
            return;
        }

        setLandlords((previous) =>
            previous.map((landlord) =>
                landlord.id === decisionPanel.landlordId
                    ? {
                        ...landlord,
                        status: decisionPanel.type === "approve" ? "Approved" : "Rejected",
                        reviewer: "Ethan Jacobs",
                        reviewedOn: new Date().toLocaleString(),
                        notes: decisionPanel.note.trim(),
                    }
                    : landlord
            )
        );

        const decidedLandlord = landlords.find((landlord) => landlord.id === decisionPanel.landlordId);
        setFeedback({
            type: "success",
            message:
                decisionPanel.type === "approve"
                    ? `${decidedLandlord?.name ?? "The landlord"} has been approved. Welcome email scheduled.`
                    : `${decidedLandlord?.name ?? "The landlord"} was rejected and has been notified.`,
        });

        closeDecisionPanel();
    };

    const renderStatusBadge = (status) => {
        const palette = statusColours[status] ?? statusColours.Pending;
        const icon =
            status === "Approved" ? (
                <FaCheckCircle size={13} />
            ) : status === "Rejected" ? (
                <FaExclamationTriangle size={13} />
            ) : (
                <FaEnvelopeOpen size={13} />
            );

        return (
            <span style={{ ...badgeStyles, background: palette.bg, color: palette.colour }}>
                {icon}
                {status}
            </span>
        );
    };

    return (
        <div>
            <div style={pageStyles}>
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
                            <FaShieldAlt size={14} /> Identity &amp; compliance checks
                        </div>
                        <h1 style={{ fontSize: "32px", margin: "16px 0 8px", fontWeight: 700 }}>Verify landlord partners</h1>
                        <p style={{ maxWidth: "560px", lineHeight: 1.6, color: "#475569" }}>
                            Review supporting documents, capture due diligence notes, and approve trusted accommodation
                            partners for CPUT students.
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
                                <FaUserTie size={22} color="#2563eb" />
                            </div>
                            <div>
                                <span style={{ fontSize: "13px", color: "#94a3b8" }}>Pending reviews</span>
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
                            View verification policy
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
                                    placeholder="Search by name, email or company"
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
                                    <option value="On Hold">On hold</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                        <span style={{ color: "#94a3b8", fontSize: "13px" }}>
              {filteredLandlords.length} results shown
            </span>
                    </div>

                    <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
                        {filteredLandlords.length === 0 ? (
                            <div
                                style={{
                                    padding: "32px",
                                    textAlign: "center",
                                    border: "1px dashed rgba(148, 163, 184, 0.4)",
                                    borderRadius: "16px",
                                    color: "#64748b",
                                }}
                            >
                                No landlord records match your filters just yet.
                            </div>
                        ) : (
                            filteredLandlords.map((landlord) => (
                                <div
                                    key={landlord.id}
                                    style={{
                                        border: selectedLandlordId === landlord.id ? "2px solid #2563eb" : "1px solid rgba(148, 163, 184, 0.25)",
                                        borderRadius: "18px",
                                        padding: "18px",
                                        background: selectedLandlordId === landlord.id ? "rgba(37, 99, 235, 0.06)" : "rgba(248, 250, 255, 0.7)",
                                        display: "grid",
                                        gap: "12px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedLandlordId(landlord.id)}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <strong style={{ fontSize: "16px" }}>{landlord.name}</strong>
                                            <div style={{ color: "#475569", fontSize: "13px" }}>{landlord.company}</div>
                                        </div>
                                        {renderStatusBadge(landlord.status)}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "13px", color: "#475569" }}>
                                        <span>{landlord.email}</span>
                                        <span>{landlord.phone}</span>
                                        <span>{landlord.propertyCount} managed properties</span>
                                        <span>Submitted {landlord.submittedOn}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{landlord.notes}</p>
                                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openDecisionPanel(landlord.id, "approve");
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
                                                openDecisionPanel(landlord.id, "reject");
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

                {selectedLandlord && (
                    <section style={{ ...cardStyles, display: "grid", gap: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: "22px" }}>Detailed review</h2>
                                <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                    Capture due diligence notes and confirm supporting documentation.
                                </p>
                            </div>
                            <div style={{ ...badgeStyles, background: "rgba(37, 99, 235, 0.12)", color: "#1d4ed8" }}>
                                <FaUserTie size={14} /> {selectedLandlord.name}
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
                                <strong>Contact</strong>
                                <span style={{ fontSize: "13px", color: "#475569" }}>{selectedLandlord.email}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>{selectedLandlord.phone}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>{selectedLandlord.address}</span>
                            </div>
                            <div style={{ border: "1px solid rgba(148, 163, 184, 0.35)", borderRadius: "16px", padding: "18px", display: "grid", gap: "12px" }}>
                                <strong>Application metadata</strong>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Submitted on {selectedLandlord.submittedOn}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Managed properties: {selectedLandlord.propertyCount}</span>
                                <span style={{ fontSize: "13px", color: "#475569" }}>Risk level: {selectedLandlord.riskLevel}</span>
                                {selectedLandlord.reviewer && (
                                    <span style={{ fontSize: "13px", color: "#475569" }}>
                    Reviewed by {selectedLandlord.reviewer} on {selectedLandlord.reviewedOn}
                  </span>
                                )}
                            </div>
                            <div style={{ border: "1px solid rgba(148, 163, 184, 0.35)", borderRadius: "16px", padding: "18px", display: "grid", gap: "12px" }}>
                                <strong>Notes</strong>
                                <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>{selectedLandlord.notes}</p>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>Submitted documentation</h3>
                            <div style={{ display: "grid", gap: "12px" }}>
                                {selectedLandlord.documents.map((document) => (
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
                                            <FaFileAlt size={18} color="#2563eb" />
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
                                {decisionPanel.type === "approve" ? "Approve landlord access" : "Reject landlord application"}
                            </h3>
                            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                                {decisionPanel.type === "approve"
                                    ? "Confirm that all supporting documents have been reviewed and verified. A welcome email will be dispatched automatically."
                                    : "Provide a clear reason so that the landlord can address any issues before reapplying."}
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
                                    {decisionPanel.type === "approve" ? "Approve landlord" : "Reject landlord"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default VerifyLandlords;
