import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import AppName from '../../components/shared/AppName';

function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
        py: 6,
        background: "linear-gradient(to right, #f0f4f8, #ffffff)",
        textAlign: "center",
      }}
    >
      {/* App Name logo */}
      <Box mb={4}>
        <AppName />
      </Box>

      {/* Welcome message */}
      <Typography
        variant="h4"
        fontWeight="500"
        color="text.primary"
        mb={2}
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Welcome to CPUT Student Housing Connect
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mb={5}
        sx={{ maxWidth: 500 }}
      >
        Helping students find reliable and safe accommodation. Join now to
        connect with verified landlords and fellow students.
      </Typography>

      {/* Login / Sign Up Buttons */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#0055aa" },
            px: 4,
            py: 1.5,
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="outlined"
          size="large"
          sx={{
            color: "#003366",
            borderColor: "#003366",
            "&:hover": {
              backgroundColor: "#003366",
              color: "#fff",
              borderColor: "#0055aa",
            },
            px: 4,
            py: 1.5,
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}

export default LandingPage;
