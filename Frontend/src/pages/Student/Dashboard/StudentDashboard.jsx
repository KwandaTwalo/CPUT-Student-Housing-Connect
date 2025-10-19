import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaClock, FaHome, FaStar } from "react-icons/fa";
import StudentNavigation from "../../../components/student/StudentNavigation";

const summaryCards = [
    {
        icon: <FaHome aria-hidden="true" />,
        label: "Saved homes",
        value: 4,
        helper: "You last viewed Belhar Lofts 3 hours ago",
    },
    {
        icon: <FaClipboardList aria-hidden="true" />,
        label: "Active applications",
        value: 2,
        helper: "Landlords typically respond within 48 hours",
    },
    {
        icon: <FaClock aria-hidden="true" />,
        label: "Upcoming viewing",
        value: "10 May",
        helper: "Atlantic View Residence · 16:00",
    },
    {
        icon: <FaStar aria-hidden="true" />,
        label: "Reviews to share",
        value: 1,
        helper: "Tell others about Observatory Studios",
    },
];

function StudentDashboard() {
    return (
        <div className="student-dashboard-page">
            <StudentNavigation />
            <main className="student-dashboard-content">
                <section className="student-welcome-panel">
                    <p className="student-badge">Plan your next semester</p>
                    <h1>Welcome back! Let's find your ideal space.</h1>
                    <p>
                        Continue your applications, explore recommended listings close to your campus and keep your
                        profile up to date for faster approvals.
                    </p>
                    <div className="student-quick-actions">
                        <Link className="student-action-link" to="/student/search">
                            Browse new listings
                        </Link>
                        <Link className="student-action-link" to="/student/applications">
                            Track my applications
                        </Link>
                        <Link className="student-action-link" to="/student/profile">
                            Update my profile
                        </Link>
                    </div>
                </section>

                <section className="student-summary-grid" aria-label="Student overview">
                    {summaryCards.map((card) => (
                        <article key={card.label} className="student-summary-card">
                            <div className="student-summary-icon">{card.icon}</div>
                            <div className="student-summary-body">
                                <h2>{card.value}</h2>
                                <p className="student-summary-label">{card.label}</p>
                                <p className="student-summary-helper">{card.helper}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="student-next-steps" aria-label="Next steps">
                    <div className="student-next-steps-card">
                        <h2>Suggested next steps</h2>
                        <ul>
                            <li>Upload your proof of registration to speed up approvals.</li>
                            <li>Message landlords directly to arrange viewings.</li>
                            <li>Save listings that meet your budget for quick comparisons.</li>
                            <li>Share your experience after moving in to help other students.</li>
                        </ul>
                    </div>
                    <div className="student-next-steps-card">
                        <h2>Need assistance?</h2>
                        <p>
                            Visit the <Link to="/help">help centre</Link> for frequently asked questions or reach out to the
                            housing office for personalised support.
                        </p>
                        <p className="student-note">Our team typically responds within one business day.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentDashboard;
