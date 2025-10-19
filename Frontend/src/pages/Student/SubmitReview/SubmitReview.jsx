import React from "react";
import { FaPaperPlane, FaStar } from "react-icons/fa";
import StudentNavigation from "../../../components/student/StudentNavigation";

function SubmitReview() {
    return (
        <div className="student-dashboard-page">
            <StudentNavigation />
            <main className="student-dashboard-content">
                <section className="student-welcome-panel">
                    <p className="student-badge">Share your experience</p>
                    <h1>Help other students make confident choices</h1>
                    <p>
                        Provide honest feedback about your stay, the landlord and the surrounding community. Reviews
                        help the CPUT housing team maintain high standards across every listing.
                    </p>
                </section>

                <section className="student-review-card" aria-label="Submit a review">
                    <header>
                        <FaStar aria-hidden="true" />
                        <div>
                            <h2>Submit a residence review</h2>
                            <p>Select the property and let us know how your stay has been so far.</p>
                        </div>
                    </header>
                    <form className="student-review-form">
                        <label>
                            <span>Which accommodation are you reviewing?</span>
                            <select>
                                <option>Belhar Village Lofts</option>
                                <option>Observatory Studios</option>
                                <option>District Six Residence</option>
                                <option>Other accommodation</option>
                            </select>
                        </label>
                        <label>
                            <span>How would you rate your overall experience?</span>
                            <div className="student-rating-input">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button type="button" key={value} aria-label={`${value} star rating`}>
                                        <FaStar aria-hidden="true" />
                                    </button>
                                ))}
                            </div>
                        </label>
                        <label>
                            <span>Your comments</span>
                            <textarea rows={5} placeholder="Describe the accommodation, landlord communication and neighbourhood." />
                        </label>
                        <button type="submit" className="student-primary">
                            <FaPaperPlane aria-hidden="true" />
                            Submit review
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default SubmitReview;
