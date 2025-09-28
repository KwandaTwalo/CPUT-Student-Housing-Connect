import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AppName() {

  const underlineColors = ["#0A4EAF", "#FF6700", "#C0C0C0", "#3A6EA5", "#004E98"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        userSelect: "none",
        cursor: "default",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            fontFamily: "'Roboto', sans-serif",
            userSelect: "none",
            paddingBottom: "8px",
            color: "#1a1a1a",
            transition: "color 0.3s ease",
            "&:hover": { color: "#0A4EAF" }, 
          }}
        >
          STUDENT HOUSING CONNECT
        </Typography>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            gap: "4px",
            height: 6,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgb(0 0 0 / 0.1)",
          }}
          aria-hidden="true"
        >
          {underlineColors.map((color, i) => (
            <Box
              key={i}
              sx={{
                flexGrow: 1,
                backgroundColor: color,
                borderRadius: 0,
                transition: "background-color 0.3s ease",
                "&:hover": {
                  filter: "brightness(1.1)",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <CheckCircleIcon
        sx={{
          color: "#ffffff",
          fontSize: 28,
          transition: "transform 0.2s ease, color 0.3s ease",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))",
          "&:hover": {
            color: "#FF6700",
            transform: "scale(1.1)",
            cursor: "default",
          },
        }}
        aria-label="Verified"
      />
    </Box>
  );
}

export default AppName;
