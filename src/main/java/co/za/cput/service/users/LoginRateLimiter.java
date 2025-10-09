package co.za.cput.service.users;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LoginRateLimiter {

    private static final int MAX_ATTEMPTS = 5;
    private static final Duration LOCKOUT_DURATION = Duration.ofMinutes(15);

    private final Map<String, LoginAttempt> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String email) {
        LoginAttempt attempt = attempts.get(email);
        if (attempt == null) {
            return false;
        }

        if (attempt.lockExpiresAt != null) {
            if (Instant.now().isAfter(attempt.lockExpiresAt)) {
                attempts.remove(email);
                return false;
            }
            return true;
        }
        return false;
    }

    public void recordFailedAttempt(String email) {
        LoginAttempt attempt = attempts.computeIfAbsent(email, key -> new LoginAttempt());
        attempt.attempts++;
        if (attempt.attempts >= MAX_ATTEMPTS) {
            attempt.lockExpiresAt = Instant.now().plus(LOCKOUT_DURATION);
        }
    }

    public void resetAttempts(String email) {
        attempts.remove(email);
    }

    public Duration timeUntilUnlock(String email) {
        LoginAttempt attempt = attempts.get(email);
        if (attempt == null || attempt.lockExpiresAt == null) {
            return Duration.ZERO;
        }
        Instant now = Instant.now();
        if (now.isAfter(attempt.lockExpiresAt)) {
            attempts.remove(email);
            return Duration.ZERO;
        }
        return Duration.between(now, attempt.lockExpiresAt);
    }

    private static final class LoginAttempt {
        private int attempts;
        private Instant lockExpiresAt;
    }
}