package co.za.cput.util;

import co.za.cput.domain.business.Accommodation;
import co.za.cput.domain.business.Booking;
import co.za.cput.domain.business.Review;
import co.za.cput.domain.business.Verification;
import co.za.cput.domain.users.Administrator;
import co.za.cput.domain.users.Landlord;
import co.za.cput.domain.users.Student;
import co.za.cput.repository.business.AccommodationRepository;
import co.za.cput.repository.users.LandLordRepository;
import co.za.cput.repository.users.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//This Helper is used for storing methods that links Student, Accommodation, and Booking together.
@Component
public class LinkingEntitiesHelper {


    private static AccommodationRepository accommodationRepository;

    @Autowired
    public LinkingEntitiesHelper(AccommodationRepository accommodationRepository) {
        LinkingEntitiesHelper.accommodationRepository = accommodationRepository;
    }

    //NOTE CODE YOUR HELPER METHODS UNDER YOUR NAME.

    //Kwanda

    /*It creates new booking records, and for each one, it adds a link back to the student.
    It then creates a new student record that includes these updated bookings.
    Finally, it saves the student with all the bookings correctly connected to them.*/
    /*public static Student setStudentInBookings(Student student) {
        if (student == null || student.getBookings() == null) {
            return student;
        }

        List<Booking> updatedBookings = new ArrayList<>();

        for (Booking booking : student.getBookings()) {
            Booking updatedBooking = new Booking.Builder()
                    .copy(booking)
                    .setStudent(student)  // Set the student reference here
                    .build();
            updatedBookings.add(updatedBooking);
        }

        return new Student.Builder()
                .copy(student)
                .setBookings(updatedBookings)
                .build();
    }
*/
    public static Student setStudentInBookings(Student student) {
        if (student == null || student.getBookings() == null) {
            return student;
        }

        List<Booking> updatedBookings = new ArrayList<>();

        for (Booking booking : student.getBookings()) {
            // Step 1: Handle the Accommodation
            Accommodation accommodation = booking.getAccommodation();
            Accommodation persistedAccommodation = null;

            if (accommodation != null) {
                if (accommodation.getAccommodationID() == null) {
                    // New Accommodation – save it first
                    persistedAccommodation = accommodationRepository.save(accommodation);
                } else {
                    // Existing – re-fetch to ensure it's managed
                    persistedAccommodation = accommodationRepository.findById(accommodation.getAccommodationID())
                            .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));
                }
            }

            // Step 2: Build updated booking
            Booking updatedBooking = new Booking.Builder()
                    .copy(booking)
                    .setStudent(student)
                    .setAccommodation(persistedAccommodation)
                    .build();

            updatedBookings.add(updatedBooking);
        }

        return new Student.Builder()
                .copy(student)
                .setBookings(updatedBookings)
                .build();
    }

    /*The helper method takes the Booking and the two repositories it needs to check and persist linked entities.
    It returns a new Booking instance with managed (persisted) Student and Accommodation references.
    Your service calls this helper before saving the booking to avoid transient object exceptions.*/

    public static Booking prepareBookingWithLinkedEntities(Booking booking,
                                                           StudentRepository studentRepository,
                                                           AccommodationRepository accommodationRepository) {
        if (booking == null) return null;

        Student student = booking.getStudent();
        Accommodation accommodation = booking.getAccommodation();

        // Handle Student persistence
        Student persistedStudent = null;
        if (student != null) {
            if (student.getStudentID() == null) {
                persistedStudent = studentRepository.save(student);
            } else {
                persistedStudent = studentRepository.findById(student.getStudentID())
                        .orElseThrow(() -> new IllegalArgumentException("Student not found"));
            }
        }

        // Handle Accommodation persistence
        Accommodation persistedAccommodation = null;
        if (accommodation != null) {
            if (accommodation.getAccommodationID() == null) {
                persistedAccommodation = accommodationRepository.save(accommodation);
            } else {
                persistedAccommodation = accommodationRepository.findById(accommodation.getAccommodationID())
                        .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));
            }
        }

        // Build updated booking with managed entities
        return new Booking.Builder()
                .copy(booking)
                .setStudent(persistedStudent)
                .setAccommodation(persistedAccommodation)
                .build();
    }

    /*This ensures:
    If the Landlord is new (no ID), it’s saved first.
    The saved Landlord (with ID) is then used to build a correct Accommodation.*/

    public static Accommodation linkLandlord(Accommodation accommodation, LandLordRepository landLordRepository) {
        if (accommodation == null || accommodation.getLandlord() == null) {
            return accommodation;
        }

        Landlord landlord = accommodation.getLandlord();

        // Save the landlord if it doesn't have an ID yet
        if (landlord.getLandlordID() == null) {
            landlord = landLordRepository.save(landlord);
        }

        // Return a new Accommodation object with the linked landlord
        return new Accommodation.Builder()
                .copy(accommodation)
                .setLandlord(landlord)
                .build();
    }

    //Purpose: When creating the LandLord object the LandlordID in Accommodation Table does not show instead it is null,
    //Now this method below is linking Landlord to accommodation as our system says that accommodation belongs to Landlord.
    public static Landlord linkAccommodationsWithManagedLandlord(Landlord landlord, Landlord managedLandlord) {
        if (landlord.getAccommodationList() == null) return landlord;

        List<Accommodation> accommodationsWithManagedLandlord = landlord.getAccommodationList().stream()
                .map(acc -> new Accommodation.Builder()
                        .copy(acc)
                        .setLandlord(managedLandlord)  // IMPORTANT: use the managedLandlord instance here!
                        .build())
                .collect(Collectors.toList());

        return new Landlord.Builder()
                .copy(managedLandlord)            // start from the managed landlord (important)
                .setAccommodationList(accommodationsWithManagedLandlord)
                .build();
    }




    public static Booking setBookingInReview(Booking booking) {
        if (booking == null || booking.getReview() == null) {
            return booking;
        }

        Review review = new Review.Builder()
                .copy(booking.getReview())
                .setBooking(booking)
                .build();

        return new Booking.Builder()
                .copy(booking)
                .setReview(review)
                .build();
    }


    /*Save nested entities in order:
        # Save Contact for Administrator
        # Save Landlord (with Contact)
        # Save Address
        # Save Accommodation (with saved Landlord + Address)
        # Save Verification (with saved Accommodation)
        # Then build the Administrator with all saved parts.
        # Save the Administrator.*/
    public static Administrator prepareAdministratorForSave(
            Administrator administrator,
            AccommodationRepository accommodationRepository,
            LandLordRepository landLordRepository) {

        if (administrator == null || administrator.getVerifications() == null) {
            return administrator;
        }

        List<Verification> updatedVerifications = new ArrayList<>();

        for (Verification verification : administrator.getVerifications()) {
            Accommodation accommodation = verification.getAccommodation();

            if (accommodation != null) {
                // Persist landlord if necessary
                Landlord landlord = accommodation.getLandlord();
                if (landlord != null && landlord.getLandlordID() == null) {
                    landlord = landLordRepository.save(landlord);
                    accommodation = new Accommodation.Builder()
                            .copy(accommodation)
                            .setLandlord(landlord)
                            .build();
                }

                // Persist accommodation
                if (accommodation.getAccommodationID() == null) {
                    accommodation = accommodationRepository.save(accommodation);
                } else {
                    accommodation = accommodationRepository.findById(accommodation.getAccommodationID())
                            .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));
                }

                // Build verification with managed accommodation and administrator
                verification = new Verification.Builder()
                        .copy(verification)
                        .setAccommodation(accommodation)
                        .setAdministrator(administrator)
                        .build();
            }

            updatedVerifications.add(verification);
        }

        // Build updated Administrator with the new list of verifications
        return new Administrator.Builder()
                .copy(administrator)
                .setVerifications(updatedVerifications)
                .build();
    }




}
