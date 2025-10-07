import co.za.cput.dto.AdminDashboardStats;
import co.za.cput.service.analytics.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping("/overview")
    public ResponseEntity<AdminDashboardStats> getOverview() {
        AdminDashboardStats stats = adminDashboardService.buildOverview();
        return ResponseEntity.ok(stats);
    }
}