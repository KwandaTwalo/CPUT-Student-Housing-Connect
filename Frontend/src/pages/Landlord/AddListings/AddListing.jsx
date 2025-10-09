import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandlordLayout from "../../../components/landlord/LandlordLayout";
import { createAccommodation } from "../../../services/accommodationService";
import { getCurrentUser } from "../../../services/authService";

const initialForm = {
  rent: "",
  distanceFromCampus: "",
  roomType: "SINGLE",
  bathroomType: "PRIVATE",
  status: "AVAILABLE",
  wifiAvailable: true,
  furnished: false,
  utilitiesIncluded: true,
  streetNumber: "",
  streetName: "",
  suburb: "",
  city: "",
  postalCode: "",
};

const roomTypeOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE", label: "Double" },
  { value: "SHARED", label: "Shared" },
  { value: "EN_SUITE", label: "En-suite" },
];

const bathroomTypeOptions = [
  { value: "PRIVATE", label: "Private" },
  { value: "SHARED", label: "Shared" },
];

const statusOptions = [
  { value: "AVAILABLE", label: "Available" },
  { value: "FULL", label: "Fully occupied" },
];

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const toInteger = (value, fallback = null) => {
  if (value === "" || value === null || value === undefined) {
    return fallback;
  }
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export default function AddListing() {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [formData, setFormData] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "landlord") {
      navigate("/landlord/login", {
        replace: true,
        state: { message: "Please sign in as a landlord to create a listing." },
      });
    }
  }, [currentUser, navigate]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((previous) => ({ ...previous, [name]: checked }));
  };

  const buildPayload = () => {
    const landlordId = currentUser?.userId;
    if (!landlordId) {
      throw new Error("Your landlord profile could not be resolved. Please sign in again.");
    }

    return {
      rent: toNumber(formData.rent),
      distanceFromCampus: toNumber(formData.distanceFromCampus),
      roomType: formData.roomType,
      bathroomType: formData.bathroomType,
      accommodationStatus: formData.status,
      wifiAvailable: Boolean(formData.wifiAvailable),
      furnished: Boolean(formData.furnished),
      utilitiesIncluded: Boolean(formData.utilitiesIncluded),
      address: {
        streetNumber: formData.streetNumber?.trim() || null,
        streetName: formData.streetName?.trim() || null,
        suburb: formData.suburb?.trim() || null,
        city: formData.city?.trim() || null,
        postalCode: toInteger(formData.postalCode),
      },
      landlord: {
        landlordID: landlordId,
      },
    };
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const payload = buildPayload();
      const response = await createAccommodation(payload);
      const listingId = response?.accommodationID ?? response?.id;

      setFeedback({
        type: "success",
        message: `Listing ${listingId ? `#${listingId} ` : ""}created successfully.`,
      });

      setTimeout(() => {
        resetForm();
        navigate("/my-listings", { replace: true });
      }, 1500);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "We could not create the listing. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <LandlordLayout
          title="Create a new listing"
          description="Share the essentials about your accommodation to start receiving quality applications."
          actions={(handleLogout) => (
              <button type="button" className="btn-secondary" onClick={handleLogout}>
                Sign out
              </button>
          )}
      >
        <section className="form-card light">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-grid two-column">
              <label className="form-field">
                <span>Monthly rent (ZAR)</span>
                <input
                    type="number"
                    name="rent"
                    min="0"
                    step="50"
                    className="input"
                    value={formData.rent}
                    onChange={handleFieldChange}
                    required
                />
              </label>
              <label className="form-field">
                <span>Distance from campus (km)</span>
                <input
                    type="number"
                    name="distanceFromCampus"
                    min="0"
                    step="0.1"
                    className="input"
                    value={formData.distanceFromCampus}
                    onChange={handleFieldChange}
                    required
                />
              </label>
              <label className="form-field">
                <span>Room type</span>
                <select
                    name="roomType"
                    className="select"
                    value={formData.roomType}
                    onChange={handleFieldChange}
                    required
                >
                  {roomTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                <span>Bathroom type</span>
                <select
                    name="bathroomType"
                    className="select"
                    value={formData.bathroomType}
                    onChange={handleFieldChange}
                    required
                >
                  {bathroomTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                <span>Listing status</span>
                <select
                    name="status"
                    className="select"
                    value={formData.status}
                    onChange={handleFieldChange}
                    required
                >
                  {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
              </label>
              <div className="form-field">
                <span>Amenities</span>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        type="checkbox"
                        name="wifiAvailable"
                        checked={formData.wifiAvailable}
                        onChange={handleCheckboxChange}
                    />
                    <span>Wi-Fi included</span>
                  </label>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        type="checkbox"
                        name="furnished"
                        checked={formData.furnished}
                        onChange={handleCheckboxChange}
                    />
                    <span>Fully furnished</span>
                  </label>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        type="checkbox"
                        name="utilitiesIncluded"
                        checked={formData.utilitiesIncluded}
                        onChange={handleCheckboxChange}
                    />
                    <span>Utilities included</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-grid two-column">
              <label className="form-field">
                <span>Street number</span>
                <input
                    type="text"
                    name="streetNumber"
                    className="input"
                    value={formData.streetNumber}
                    onChange={handleFieldChange}
                    placeholder="12A"
                    required
                />
              </label>
              <label className="form-field">
                <span>Street name</span>
                <input
                    type="text"
                    name="streetName"
                    className="input"
                    value={formData.streetName}
                    onChange={handleFieldChange}
                    placeholder="Durban Road"
                    required
                />
              </label>
              <label className="form-field">
                <span>Suburb</span>
                <input
                    type="text"
                    name="suburb"
                    className="input"
                    value={formData.suburb}
                    onChange={handleFieldChange}
                    placeholder="Bellville"
                    required
                />
              </label>
              <label className="form-field">
                <span>City</span>
                <input
                    type="text"
                    name="city"
                    className="input"
                    value={formData.city}
                    onChange={handleFieldChange}
                    placeholder="Cape Town"
                    required
                />
              </label>
              <label className="form-field">
                <span>Postal code</span>
                <input
                    type="number"
                    name="postalCode"
                    className="input"
                    value={formData.postalCode}
                    onChange={handleFieldChange}
                    placeholder="7530"
                    required
                />
              </label>
            </div>

            {feedback && <div className={`alert ${feedback.type}`}>{feedback.message}</div>}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving listing..." : "Save listing"}
              </button>
            </div>
          </form>
        </section>
      </LandlordLayout>
  );
}
