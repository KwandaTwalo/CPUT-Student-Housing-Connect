import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import AppName from "../../components/shared/AppName";

const quickHighlights = [
    {
        title: "Curated & verified",
        description:
            "Every landlord is screened by the CPUT housing office so you can browse with complete confidence.",
    },
    {
        title: "Smarter discovery",
        description:
            "Powerful filters, live availability and intelligent suggestions surface the spaces that match your lifestyle.",
    },
    {
        title: "Always in sync",
        description:
            "Track applications, chat to landlords and manage your move-in from one polished dashboard across web and mobile.",
    },
];

const spotlightQuotes = [
    {
        name: "Thando – 3rd year IT",
        quote: "“I compared rent, Wi-Fi and travel time in minutes. Matching to verified homes has never been this quick.”",
    },
    {
        name: "Amina – 1st year Design",
        quote: "“The interactive map helped me pick a creative hub near campus and coffee shops. The process felt effortless.”",
    },
];

const impactMetrics = [
    { label: "Verified beds", value: "8 000+" },
    { label: "Avg. match time", value: "2 min" },
    { label: "Support hours", value: "24/7" },
    { label: "Neighbourhoods", value: "35" },
];

function LandingPage() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background:
                    "linear-gradient(130deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 145, 178, 0.88) 45%, rgba(14, 165, 233, 0.75) 100%)",
                color: "#f8fafc",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 12% 18%, rgba(59, 130, 246, 0.35), transparent 55%)," +
                        "radial-gradient(circle at 82% 12%, rgba(34, 211, 238, 0.25), transparent 52%)," +
                        "radial-gradient(circle at 50% 88%, rgba(56, 189, 248, 0.28), transparent 48%)",
                    filter: "blur(0px)",
                }}
            />

            <Box sx={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                        gridTemplateRows: { xs: "auto auto", md: "auto 1fr" },
                        columnGap: { xs: 4, md: 8 },
                        rowGap: { xs: 4, md: 6 },
                        px: { xs: 4, md: 10 },
                        py: { xs: 4, md: 6 },
                        alignItems: "center",
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ gridColumn: "1 / -1" }}>
                        <AppName />
                        <Chip
                            label="Powered by CPUT Housing"
                            sx={{
                                bgcolor: "rgba(191, 219, 254, 0.16)",
                                color: "#dbeafe",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}
                        />
                    </Stack>

                    <Stack spacing={3} sx={{ maxWidth: 560 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: "2.4rem", md: "3.3rem" },
                                fontWeight: 700,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Modern housing discovery designed for every CPUT student.
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: { xs: "1.05rem", md: "1.18rem" },
                                color: "rgba(226, 232, 240, 0.82)",
                                fontWeight: 400,
                            }}
                        >
                            Browse beautiful listings, explore interactive maps of Cape Town and secure your perfect space
                            with transparent support from the housing team.
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 5,
                                    py: 1.6,
                                    borderRadius: "999px",
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                                    boxShadow: "0 22px 55px rgba(37, 99, 235, 0.45)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                                        boxShadow: "0 26px 60px rgba(37, 99, 235, 0.6)",
                                    },
                                }}
                            >
                                Start exploring
                            </Button>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 5,
                                    py: 1.6,
                                    borderRadius: "999px",
                                    borderColor: "rgba(191, 219, 254, 0.6)",
                                    color: "#e2e8f0",
                                    fontWeight: 600,
                                    "&:hover": {
                                        borderColor: "#fff",
                                        backgroundColor: "rgba(226, 232, 240, 0.15)",
                                    },
                                }}
                            >
                                Join the community
                            </Button>
                        </Stack>

                        <Grid container spacing={2}>
                            {impactMetrics.map((metric) => (
                                <Grid item xs={6} sm={3} key={metric.label}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: "20px",
                                            bgcolor: "rgba(15, 23, 42, 0.55)",
                                            backdropFilter: "blur(12px)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {metric.value}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)" }}>
                                            {metric.label}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>

                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            bgcolor: "rgba(15, 23, 42, 0.58)",
                            borderRadius: "32px",
                            p: { xs: 3.5, md: 4 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            backdropFilter: "blur(16px)",
                        }}
                    >
                        <Stack spacing={2.5}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                Why students love it
                            </Typography>
                            {quickHighlights.map((item) => (
                                <Box key={item.title} sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)", lineHeight: 1.6 }}>
                                        {item.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Divider sx={{ borderColor: "rgba(148, 197, 255, 0.3)" }} />

                        <Stack spacing={2}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                Voices from campus
                            </Typography>
                            {spotlightQuotes.map((item) => (
                                <Box key={item.name} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography variant="body1" sx={{ fontStyle: "italic", lineHeight: 1.6 }}>
                                        {item.quote}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "rgba(226, 232, 240, 0.65)" }}>
                                        {item.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <Box
                    component="footer"
                    sx={{
                        px: { xs: 4, md: 10 },
                        py: { xs: 3, md: 3.5 },
                        backgroundColor: "rgba(15, 23, 42, 0.55)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <Grid container spacing={3} justifyContent="space-between">
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ color: "rgba(226, 232, 240, 0.78)" }}>
                                Built with care for CPUT students, landlords and administrators working together.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button component={Link} to="/login" color="inherit" sx={{ fontWeight: 600 }}>
                                    Sign in
                                </Button>
                                <Button component={Link} to="/signup" color="inherit" sx={{ fontWeight: 600 }}>
                                    Create account
                                </Button>
                                <Button component={Link} to="/student/search" color="inherit" sx={{ fontWeight: 600 }}>
                                    Browse listings
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;
