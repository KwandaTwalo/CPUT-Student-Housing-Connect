import React, { useMemo } from "react";
import StudentNavigation from "../../../components/student/StudentNavigation";
import { getCurrentUser } from "../../../services/authService";

function StudentProfile() {
    const user = useMemo(() => getCurrentUser(), []);

    return (
        <div className="student-dashboard-page">
            <StudentNavigation />
            <main className="student-dashboard-content">
                <section className="student-profile-card">
                    <h1>My housing profile</h1>
                    <p>
                        Keep your contact information, study details and preferences current to make it easier for
                        landlords to approve your application.
                    </p>

                    <div className="student-profile-grid" role="list">
                        <div className="student-profile-field" role="listitem">
                            <span className="student-profile-label">Full name</span>
                            <span className="student-profile-value">{user?.name || "Not provided"}</span>
                        </div>
                        <div className="student-profile-field" role="listitem">
                            <span className="student-profile-label">Email address</span>
                            <span className="student-profile-value">{user?.email || "student@cput.ac.za"}</span>
                        </div>
                        <div className="student-profile-field" role="listitem">
                            <span className="student-profile-label">Current status</span>
                            <span className="student-profile-value">Registered student</span>
                        </div>
                        <div className="student-profile-field" role="listitem">
                            <span className="student-profile-label">Verification</span>
                            <span className="student-profile-value">{user?.verified ? "Documents verified" : "Pending"}</span>
                        </div>
                    </div>
                </section>

                <section className="student-next-steps" aria-label="Profile actions">
                    <div className="student-next-steps-card">
                        <h2>Update my details</h2>
                        <ul>
                            <li>Upload proof of registration and identification.</li>
                            <li>Add emergency contact information.</li>
                            <li>Select preferred campus and transport options.</li>
                        </ul>
                    </div>
                    <div className="student-next-steps-card">
                        <h2>Privacy & notifications</h2>
                        <p>
                            Choose who can view your application history and which updates you want to receive about new
                            listings and viewing appointments.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentProfile;
