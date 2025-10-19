import React from "react";
import { FaCheckCircle, FaClock, FaFileAlt } from "react-icons/fa";
import StudentNavigation from "../../../components/student/StudentNavigation";

const demoApplications = [
    {
        id: "APP-2024-001",
        listing: "Belhar Village Lofts",
        status: "Awaiting documents",
        submittedOn: "2024-05-01",
        nextStep: "Upload proof of registration",
    },
    {
        id: "APP-2024-002",
        listing: "Observatory Studios",
        status: "Under landlord review",
        submittedOn: "2024-05-04",
        nextStep: "Landlord will respond in 1 day",
    },
];

function MyApplications() {
    return (
        <div className="student-dashboard-page">
            <StudentNavigation />
            <main className="student-dashboard-content">
                <section className="student-welcome-panel">
                    <p className="student-badge">Application centre</p>
                    <h1>Track every step of your housing applications</h1>
                    <p>
                        Submit outstanding information, follow up with landlords and monitor upcoming viewing requests
                        from one place.
                    </p>
                </section>

                <section className="student-applications-card" aria-label="Application list">
                    <header>
                        <FaFileAlt aria-hidden="true" />
                        <div>
                            <h2>Current applications</h2>
                            <p>Your most recent submissions and their next actions.</p>
                        </div>
                    </header>

                    <div className="student-applications-table" role="table">
                        <div className="student-applications-row heading" role="row">
                            <span role="columnheader">Reference</span>
                            <span role="columnheader">Listing</span>
                            <span role="columnheader">Status</span>
                            <span role="columnheader">Submitted</span>
                            <span role="columnheader">Next step</span>
                        </div>
                        {demoApplications.map((application) => (
                            <div key={application.id} className="student-applications-row" role="row">
                                <span role="cell">{application.id}</span>
                                <span role="cell">{application.listing}</span>
                                <span role="cell" className="status">
                                    <FaClock aria-hidden="true" />
                                    {application.status}
                                </span>
                                <span role="cell">{application.submittedOn}</span>
                                <span role="cell">{application.nextStep}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="student-next-steps" aria-label="Application tips">
                    <div className="student-next-steps-card">
                        <h2>Improve your chances</h2>
                        <ul>
                            <li>Complete your profile and upload supporting documents.</li>
                            <li>Respond quickly to landlord requests for viewings.</li>
                            <li>Keep a record of your communication in the messages tab.</li>
                        </ul>
                    </div>
                    <div className="student-next-steps-card">
                        <h2>Recently approved</h2>
                        <p className="student-approved">
                            <FaCheckCircle aria-hidden="true" /> Belhar Village Lofts confirmed three new tenants this
                            week.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MyApplications;
