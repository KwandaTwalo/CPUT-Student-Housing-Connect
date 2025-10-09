import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandlordLayout from "../../components/landlord/LandlordLayout";
import { getCurrentUser } from "../../services/authService";
import { fetchLandlord, updateLandlord } from "../../services/landlordService";

const preferredContactOptions = [
    { value: "EMAIL", label: "Email" },
    { value: "PHONE", label: "Mobile phone" },
    { value: "ALTERNATE_PHONE", label: "Alternate phone" },
];

const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    preferredContactMethod: "EMAIL",
};

const resolveDisplayName = (profile) =>
    [profile?.landlordFirstName, profile?.landlordLastName].filter(Boolean).join(" ").trim();

export default function EditProfile() {
    const navigate = useNavigate();
    const currentUser = useMemo(() => getCurrentUser(), []);
    const [form, setForm] = useState(emptyForm);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (!currentUser || currentUser.role !== "landlord") {
            navigate("/landlord/login", {
                replace: true,
                state: { message: "Please sign in as a landlord to update your profile." },
            });
        }
    }, [currentUser, navigate]);

    const populateForm = useCallback((landlordProfile) => {
        if (!landlordProfile) {
            return;
        }

        setProfile(landlordProfile);
        setForm({
            firstName: landlordProfile.landlordFirstName ?? "",
            lastName: landlordProfile.landlordLastName ?? "",
            email: landlordProfile.contact?.email ?? "",
            phone: landlordProfile.contact?.phoneNumber ?? "",
            alternatePhone: landlordProfile.contact?.alternatePhoneNumber ?? "",
            preferredContactMethod: landlordProfile.contact?.preferredContactMethod ?? "EMAIL",
        });
    }, []);

    useEffect(() => {
        const loadProfile = async () => {
            if (!currentUser?.userId) {
                return;
            }

            setIsLoading(true);
            setFeedback(null);

            try {
                const landlordProfile = await fetchLandlord(currentUser.userId);
                populateForm(landlordProfile);
            } catch (error) {
                setFeedback({ type: "error", message: error.message || "Unable to load your profile." });
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [currentUser, populateForm]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!profile) {
            return;
        }

        setIsSaving(true);
        setFeedback(null);

        try {
            const payload = {
                ...profile,
                landlordFirstName: form.firstName.trim(),
                landlordLastName: form.lastName.trim(),
                contact: {
                    ...(profile.contact ?? {}),
                    email: form.email.trim(),
                    phoneNumber: form.phone.trim() || null,
                    alternatePhoneNumber: form.alternatePhone.trim() || null,
                    preferredContactMethod: form.preferredContactMethod,
                    isEmailVerified: profile.contact?.isEmailVerified ?? false,
                    isPhoneVerified: profile.contact?.isPhoneVerified ?? false,
                },
            };

            const updated = await updateLandlord(payload);
            populateForm(updated);
            setFeedback({ type: "success", message: "Your profile has been updated." });
        } catch (error) {
            setFeedback({ type: "error", message: error.message || "Unable to save changes." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <LandlordLayout
            title="Edit profile"
            description="Keep your contact details current so students and administrators can reach you without delay."
            actions={(handleLogout) => (
                <button type="button" className="btn-secondary" onClick={handleLogout}>
                    Sign out
                </button>
            )}
        >
            <section className="surface-card light" style={{ display: "grid", gap: 24 }}>
                <header className="auth-card-header" style={{ marginBottom: 0 }}>
                    <h2 style={{ margin: 0, fontSize: 24 }}>Profile settings</h2>
                    <p style={{ margin: "6px 0 0", color: "var(--color-slate-500)" }}>
                        Update your personal details and preferred contact method. These details are shared with approved
                        applicants.
                    </p>
                </header>

                {feedback && <div className={`alert ${feedback.type}`}>{feedback.message}</div>}

                {isLoading ? (
                    <p style={{ margin: 0 }}>Loading your information...</p>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div
                                className="profile-avatar"
                                aria-hidden="true"
                                style={{ width: 96, height: 96, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                {resolveDisplayName(profile)?.charAt(0)?.toUpperCase() || "L"}
                            </div>
                            <div>
                                <h3 style={{ margin: 0 }}>{resolveDisplayName(profile) || "Landlord"}</h3>
                                <p style={{ margin: "4px 0 0", color: "var(--color-slate-500)" }}>
                                    Member since {profile?.dateRegistered ?? "—"}
                                </p>
                            </div>
                        </div>

                        <div className="form-grid two-column">
                            <label className="form-field">
                                <span>First name</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="input"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Last name</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="input"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Email address</span>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="form-field">
                                <span>Mobile number</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-field">
                                <span>Alternate contact</span>
                                <input
                                    type="tel"
                                    name="alternatePhone"
                                    className="input"
                                    value={form.alternatePhone}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="form-field">
                                <span>Preferred contact method</span>
                                <select
                                    name="preferredContactMethod"
                                    className="select"
                                    value={form.preferredContactMethod}
                                    onChange={handleChange}
                                    required
                                >
                                    {preferredContactOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button type="submit" className="btn-primary" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </LandlordLayout>
    );
}
