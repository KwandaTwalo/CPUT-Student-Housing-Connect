import React, { useMemo, useState } from "react";
import { FaCheckCircle, FaClock, FaEnvelope, FaPlusCircle, FaSearch, FaShieldAlt, FaUserPlus } from "react-icons/fa";

const pageStyles = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f7f9fc 0%, #eef2f9 100%)",
    padding: "48px 32px",
    fontFamily: '"Segoe UI", sans-serif',
    color: "#1f2a44",
};

const sectionTitleStyles = {
    fontSize: "22px",
    marginBottom: "12px",
    fontWeight: 600,
    color: "#1e293b",
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
    fontWeight: 500,
};

const inputStyles = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5f5",
    fontSize: "15px",
    color: "#0f172a",
    backgroundColor: "#f9fbff",
};

const buttonStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 18px",
    background: "linear-gradient(135deg, #3056d3, #5b8dff)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
};
function AdminSignUp() {
    const [inviteForm, setInviteForm] = useState({
        name: "",
        email: "",
        role: "Operations Admin",
        note: "",
        department: "",
    });
    const [currentAdmins, setCurrentAdmins] = useState([
        {
            id: "A-001",
            name: "Agnes Moyo",
            email: "agnes.moyo@cputstudenthousing.co.za",
            role: "Super Admin",
            joinedOn: "2022-02-14",
            lastActive: "2024-05-05 09:20",
        },
        {
            id: "A-002",
            name: "Ethan Jacobs",
            email: "ethan.jacobs@cputstudenthousing.co.za",
            role: "Operations Admin",
            joinedOn: "2023-10-02",
            lastActive: "2024-05-06 14:12",
        },
    ]);
    const [pendingRequests, setPendingRequests] = useState([
        {
            id: "REQ-3021",
            name: "Lerato Maseko",
            email: "lerato.maseko@cput.ac.za",
            department: "Student Housing",
            roleRequested: "Verification Admin",
            submittedOn: "2024-05-04 16:40",
            status: "Pending",
        },
        {
            id: "REQ-3022",
            name: "Neo Daniels",
            email: "neo.daniels@cput.ac.za",
            department: "Facilities",
            roleRequested: "Operations Admin",
            submittedOn: "2024-05-06 08:10",
            status: "Pending",
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [feedback, setFeedback] = useState(null);

    const filteredAdmins = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
            return currentAdmins;
        }

        return currentAdmins.filter((admin) =>
            [admin.name, admin.email, admin.role, admin.id]
                .join(" ")
                .toLowerCase()
                .includes(term)
        );
    }, [currentAdmins, searchTerm]);

    const handleInviteChange = (event) => {
        const { name, value } = event.target;
        setInviteForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleInviteSubmit = (event) => {
        event.preventDefault();

        if (!inviteForm.name || !inviteForm.email) {
            setFeedback({
                type: "error",
                message: "Please provide both a full name and email address before sending an invite.",
            });
            return;
        }

        const newRequest = {
            id: `REQ-${Math.floor(Math.random() * 9000 + 1000)}`,
            name: inviteForm.name,
            email: inviteForm.email,
            department: inviteForm.department || "N/A",
            roleRequested: inviteForm.role,
            submittedOn: new Date().toLocaleString(),
            status: "Invited",
            note: inviteForm.note.trim(),
        };

        setPendingRequests((previous) => [newRequest, ...previous]);
        setInviteForm({ name: "", email: "", role: "Operations Admin", note: "", department: "" });
        setFeedback({
            type: "success",
            message: `Invite sent to ${newRequest.name}. They will receive an email with the next steps.`,
        });
    };

    const updateRequestStatus = (requestId, nextStatus) => {
        setPendingRequests((previous) =>
            previous.map((request) =>
                request.id === requestId
                    ? {
                        ...request,
                        status: nextStatus,
                        resolvedOn: new Date().toLocaleString(),
                    }
                    : request
            )
        );
    };

    const promoteRequestToAdmin = (requestId) => {
        setPendingRequests((previous) => previous.filter((request) => request.id !== requestId));

        const approvedRequest = pendingRequests.find((request) => request.id === requestId);
        if (!approvedRequest) {
            return;
        }

        setCurrentAdmins((previous) => [
            {
                id: `A-${String(previous.length + 1).padStart(3, "0")}`,
                name: approvedRequest.name,
                email: approvedRequest.email,
                role: approvedRequest.roleRequested,
                joinedOn: new Date().toISOString().slice(0, 10),
                lastActive: "Just approved",
            },
            ...previous,
        ]);

        setFeedback({
            type: "success",
            message: `${approvedRequest.name} now has ${approvedRequest.roleRequested} access.`,
        });
    };

    const handleApprove = (requestId) => {
        promoteRequestToAdmin(requestId);
    };

    const handleReject = (requestId) => {
        updateRequestStatus(requestId, "Declined");
        const declined = pendingRequests.find((request) => request.id === requestId);
        setFeedback({
            type: "info",
            message: `${declined?.name ?? "The request"} has been declined.`,
        });
    };

    const handleRemind = (requestId) => {
        updateRequestStatus(requestId, "Reminder Sent");
        const reminded = pendingRequests.find((request) => request.id === requestId);
        setFeedback({
            type: "info",
            message: `Reminder email sent to ${reminded?.name ?? "the requester"}.`,
        });
    };

    const renderStatusBadge = (status) => {
        const normalized = status.toLowerCase();
        let background = "rgba(59, 130, 246, 0.15)";
        let color = "#1d4ed8";
        let icon = <FaClock size={13} />;

        if (normalized.includes("declined")) {
            background = "rgba(239, 68, 68, 0.15)";
            color = "#b91c1c";
            icon = <FaEnvelope size={13} />;
        } else if (normalized.includes("reminder")) {
            background = "rgba(249, 115, 22, 0.18)";
            color = "#c2410c";
            icon = <FaEnvelope size={13} />;
        } else if (normalized.includes("invited")) {
            background = "rgba(16, 185, 129, 0.15)";
            color = "#0f766e";
            icon = <FaPlusCircle size={13} />;
        }

        return (
            <span style={{ ...badgeStyles, background, color }}>
        {icon}
                {status}
      </span>
        );
    };

    return (
        <div style={pageStyles}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
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
                        <div style={{ ...badgeStyles, background: "rgba(96, 165, 250, 0.15)", color: "#1e3a8a" }}>
                            <FaShieldAlt size={14} />
                            Admin Control Centre
                        </div>
                        <h1
                            style={{
                                fontSize: "32px",
                                margin: "16px 0 8px",
                                fontWeight: 700,
                            }}
                        >
                            Manage Administrative Access
                        </h1>
                        <p style={{ maxWidth: "560px", lineHeight: 1.6, color: "#475569" }}>
                            Invite trusted colleagues, approve pending escalation requests, and keep track of
                            everyone who can make high-impact decisions on the CPUT Student Housing Connect platform.
                        </p>
                    </div>
                    <div style={{ ...cardStyles, width: "min(320px, 100%)", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <FaUserPlus size={22} color="#3056d3" />
                            <div>
                                <strong style={{ fontSize: "26px", display: "block" }}>{currentAdmins.length}</strong>
                                <span style={{ color: "#64748b", fontSize: "14px" }}>Active administrators</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <small style={{ color: "#94a3b8" }}>Pending approvals</small>
                                <div style={{ fontSize: "18px", fontWeight: 600 }}>{pendingRequests.length}</div>
                            </div>
                            <div>
                                <small style={{ color: "#94a3b8" }}>Last update</small>
                                <div style={{ fontSize: "14px" }}>{new Date().toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {feedback && (
                    <div
                        style={{
                            ...cardStyles,
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            borderLeft: feedback.type === "success" ? "6px solid #16a34a" : feedback.type === "error" ? "6px solid #dc2626" : "6px solid #0f172a",
                        }}
                    >
                        <FaEnvelope
                            size={20}
                            color={feedback.type === "success" ? "#16a34a" : feedback.type === "error" ? "#dc2626" : "#0f172a"}
                        />
                        <div>
                            <strong style={{ display: "block", marginBottom: "4px" }}>
                                {feedback.type === "success" && "Action completed"}
                                {feedback.type === "error" && "Action required"}
                                {feedback.type === "info" && "Heads up"}
                            </strong>
                            <span style={{ color: "#475569" }}>{feedback.message}</span>
                        </div>
                    </div>
                )}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px",
                    }}
                >
                    <section style={cardStyles}>
                        <h2 style={sectionTitleStyles}>Invite a new administrator</h2>
                        <p style={{ color: "#64748b", marginBottom: "20px" }}>
                            Send a secure invitation email. Invites expire automatically after 72 hours for extra security.
                        </p>
                        <form onSubmit={handleInviteSubmit} style={{ display: "grid", gap: "16px" }}>
                            <div style={{ display: "grid", gap: "10px" }}>
                                <label style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>Full name</label>
                                <input
                                    style={inputStyles}
                                    name="name"
                                    placeholder="e.g. Khanya Dlamini"
                                    value={inviteForm.name}
                                    onChange={handleInviteChange}
                                />
                            </div>
                            <div style={{ display: "grid", gap: "10px" }}>
                                <label style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>Email address</label>
                                <input
                                    style={inputStyles}
                                    type="email"
                                    name="email"
                                    placeholder="e.g. khanya.dlamini@cput.ac.za"
                                    value={inviteForm.email}
                                    onChange={handleInviteChange}
                                />
                            </div>
                            <div style={{ display: "grid", gap: "10px" }}>
                                <label style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>Role</label>
                                <select
                                    name="role"
                                    value={inviteForm.role}
                                    onChange={handleInviteChange}
                                    style={{ ...inputStyles, appearance: "none" }}
                                >
                                    <option>Operations Admin</option>
                                    <option>Verification Admin</option>
                                    <option>Super Admin</option>
                                </select>
                            </div>
                            <div style={{ display: "grid", gap: "10px" }}>
                                <label style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>Department (optional)</label>
                                <input
                                    style={inputStyles}
                                    name="department"
                                    placeholder="e.g. Student Housing"
                                    value={inviteForm.department ?? ""}
                                    onChange={handleInviteChange}
                                />
                            </div>
                            <div style={{ display: "grid", gap: "10px" }}>
                                <label style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>Personal note (optional)</label>
                                <textarea
                                    style={{ ...inputStyles, minHeight: "90px", resize: "vertical" }}
                                    name="note"
                                    placeholder="Any context to include with the invite"
                                    value={inviteForm.note}
                                    onChange={handleInviteChange}
                                />
                            </div>
                            <button type="submit" style={buttonStyles}>
                                <FaUserPlus size={18} /> Send invite
                            </button>
                        </form>
                    </section>

                    <section style={cardStyles}>
                        <h2 style={sectionTitleStyles}>Pending approvals &amp; reminders</h2>
                        <p style={{ color: "#64748b", marginBottom: "16px" }}>
                            Review promotion requests and follow up on outstanding invitations.
                        </p>
                        <div style={{ display: "grid", gap: "16px" }}>
                            {pendingRequests.length === 0 ? (
                                <div
                                    style={{
                                        padding: "30px",
                                        textAlign: "center",
                                        border: "1px dashed rgba(148, 163, 184, 0.45)",
                                        borderRadius: "16px",
                                        color: "#64748b",
                                    }}
                                >
                                    <FaCheckCircle size={24} color="#16a34a" />
                                    <p style={{ marginTop: "12px", fontWeight: 600 }}>All caught up!</p>
                                    <p style={{ margin: 0 }}>No pending admin requests at the moment.</p>
                                </div>
                            ) : (
                                pendingRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        style={{
                                            border: "1px solid rgba(148, 163, 184, 0.25)",
                                            borderRadius: "16px",
                                            padding: "18px",
                                            display: "grid",
                                            gap: "10px",
                                            backgroundColor: "#f8fbff",
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <strong>{request.name}</strong>
                                            {renderStatusBadge(request.status)}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#475569" }}>
                                            <div>{request.email}</div>
                                            <div style={{ marginTop: "2px" }}>Requested role: <strong>{request.roleRequested}</strong></div>
                                            <div style={{ marginTop: "2px", color: "#94a3b8" }}>Submitted: {request.submittedOn}</div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "12px",
                                                marginTop: "6px",
                                            }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleApprove(request.id)}
                                                style={{
                                                    ...buttonStyles,
                                                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                                    flex: "1 1 130px",
                                                }}
                                            >
                                                Approve access
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemind(request.id)}
                                                style={{
                                                    ...buttonStyles,
                                                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                                                    flex: "1 1 130px",
                                                }}
                                            >
                                                Send reminder
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleReject(request.id)}
                                                style={{
                                                    ...buttonStyles,
                                                    background: "linear-gradient(135deg, #dc2626, #f87171)",
                                                    flex: "1 1 130px",
                                                }}
                                            >
                                                Decline request
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                <section style={cardStyles}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: "16px",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <h2 style={sectionTitleStyles}>Active administrator directory</h2>
                            <p style={{ color: "#64748b", margin: 0 }}>
                                Track who has access and when they last signed in.
                            </p>
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
                            <FaSearch size={16} color="#64748b" />
                            <input
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    outline: "none",
                                    fontSize: "14px",
                                    color: "#0f172a",
                                    minWidth: "220px",
                                }}
                                placeholder="Search by name, email or role"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: "auto", marginTop: "24px" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: "640px",
                            }}
                        >
                            <thead>
                            <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: "13px", textTransform: "uppercase" }}>
                                <th style={{ padding: "12px 16px" }}>Admin ID</th>
                                <th style={{ padding: "12px 16px" }}>Name</th>
                                <th style={{ padding: "12px 16px" }}>Email</th>
                                <th style={{ padding: "12px 16px" }}>Role</th>
                                <th style={{ padding: "12px 16px" }}>Joined</th>
                                <th style={{ padding: "12px 16px" }}>Last active</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredAdmins.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "#64748b" }}>
                                        No administrators match your search just yet.
                                    </td>
                                </tr>
                            ) : (
                                filteredAdmins.map((admin) => (
                                    <tr
                                        key={admin.id}
                                        style={{
                                            borderTop: "1px solid rgba(226, 232, 240, 0.8)",
                                            backgroundColor: "rgba(248, 250, 255, 0.4)",
                                        }}
                                    >
                                        <td style={{ padding: "16px" }}>{admin.id}</td>
                                        <td style={{ padding: "16px", fontWeight: 600 }}>{admin.name}</td>
                                        <td style={{ padding: "16px", color: "#2563eb" }}>{admin.email}</td>
                                        <td style={{ padding: "16px" }}>{admin.role}</td>
                                        <td style={{ padding: "16px" }}>{admin.joinedOn}</td>
                                        <td style={{ padding: "16px" }}>{admin.lastActive}</td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
    </div>
  );
}

export default AdminSignUp;
