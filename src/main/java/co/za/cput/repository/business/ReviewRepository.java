package co.za.cput.repository.business;

import co.za.cput.domain.business.Review;
import co.za.cput.dto.AccommodationRatingSummary;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("""
            SELECT new co.za.cput.dto.AccommodationRatingSummary(
                b.accommodation.accommodationID,
                AVG(r.rating),
                COUNT(r),
                MAX(r.reviewDate),
                SUM(CASE WHEN r.rating >= 4 THEN 1 ELSE 0 END)
            )
            FROM Review r
            JOIN r.booking b
            WHERE b.accommodation.accommodationID = :accommodationId
            GROUP BY b.accommodation.accommodationID
            """)
    Optional<AccommodationRatingSummary> findSummaryByAccommodationId(@Param("accommodationId") Long accommodationId);

    @Query("""
            SELECT new co.za.cput.dto.AccommodationRatingSummary(
                b.accommodation.accommodationID,
                AVG(r.rating),
                COUNT(r),
                MAX(r.reviewDate),
                SUM(CASE WHEN r.rating >= 4 THEN 1 ELSE 0 END)
            )
            FROM Review r
            JOIN r.booking b
            GROUP BY b.accommodation.accommodationID
            ORDER BY AVG(r.rating) DESC, COUNT(r) DESC
            """)
    List<AccommodationRatingSummary> findTopRatedSummaries(Pageable pageable);
}