import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Stack,
    Grid,
    Paper,
    Chip,
    Avatar,
    Divider,
} from "@mui/material";
import AppName from "../../components/shared/AppName";

const features = [
    {
        title: "Verified landlords",
        description:
            "Every landlord is vetted by the CPUT housing office, so you can focus on finding the right fit without second guessing the listing.",
    },
    {
        title: "Smart search",
        description:
            "Filter by distance, amenities, rent and more. Save your favourite homes and receive updates when something perfect is listed.",
    },
    {
        title: "Seamless applications",
        description:
            "Submit documentation, track your status and chat with landlords all in one place, across web and mobile.",
    },
];

const journeySteps = [
    {
        label: "1",
        title: "Create your profile",
        description:
            "Complete a beautiful profile so landlords understand your needs, budget and preferred move-in date.",
    },
    {
        label: "2",
        title: "Discover housing",
        description:
            "Use AI-assisted recommendations and interactive maps to compare residences by rent, travel time and amenities.",
    },
    {
        label: "3",
        title: "Move in with confidence",
        description:
            "Secure your place with digital agreements and transparent, student-friendly support from start to finish.",
    },
];

const testimonials = [
    {
        name: "Thando",
        role: "3rd year Information Technology",
        quote:
            "“I found a verified residence in less than a day. The new dashboard makes comparing rent, amenities and travel time effortless.”",
    },
    {
        name: "Amina",
        role: "1st year Design",
        quote:
            "“The smart filters are amazing. I set my budget, wanted Wi-Fi and a private bathroom – the perfect home popped right up.”",
    },
];

function LandingPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 132, 199, 0.85) 40%, rgba(14, 165, 233, 0.8) 100%)",
                color: "#f8fafc",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.35), transparent 45%)," +
                        "radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.28), transparent 55%)," +
                        "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.25), transparent 50%)",
                    filter: "blur(0px)",
                }}
            />

            <Box sx={{ position: "relative", zIndex: 1, flex: 1 }}>
                <Box
                    sx={{
                        px: { xs: 4, md: 10 },
                        py: { xs: 6, md: 10 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <AppName />
                        <Chip
                            color="primary"
                            label="Powered by CPUT Housing"
                            sx={{
                                bgcolor: "rgba(56, 189, 248, 0.12)",
                                color: "#bae6fd",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        />
                    </Stack>

                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Stack spacing={3}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: "2.2rem", md: "3.4rem" },
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    Modern housing discovery for every CPUT student.
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "1.05rem", md: "1.2rem" },
                                        color: "rgba(226, 232, 240, 0.8)",
                                        maxWidth: 520,
                                        fontWeight: 400,
                                    }}
                                >
                                    Explore verified student accommodation with immersive visuals, live availability
                                    and intelligent recommendations tailored to your studies.
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
                                            boxShadow: "0 18px 40px rgba(37, 99, 235, 0.45)",
                                            '&:hover': {
                                                background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                                                boxShadow: "0 20px 50px rgba(37, 99, 235, 0.55)",
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
                                            borderColor: "rgba(148, 197, 255, 0.7)",
                                            color: "#e2e8f0",
                                            fontWeight: 600,
                                            '&:hover': {
                                                borderColor: "#fff",
                                                backgroundColor: "rgba(226, 232, 240, 0.15)",
                                            },
                                        }}
                                    >
                                        Join the community
                                    </Button>
                                </Stack>

                                <Grid container spacing={2}>
                                    {["8k+ verified beds", "2 min average matching", "24/7 housing support"].map(
                                        (stat) => (
                                            <Grid item xs={12} sm={4} key={stat}>
                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        p: 2.5,
                                                        borderRadius: "20px",
                                                        bgcolor: "rgba(15, 23, 42, 0.55)",
                                                        color: "#e2e8f0",
                                                        backdropFilter: "blur(14px)",
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {stat}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        )
                                    )}
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Box
                                sx={{
                                    position: "relative",
                                    borderRadius: "28px",
                                    overflow: "hidden",
                                    boxShadow: "var(--shadow-elevated)",
                                    bgcolor: "rgba(30, 41, 59, 0.7)",
                                    backdropFilter: "blur(18px)",
                                    p: 4,
                                }}
                            >
                                <Stack spacing={3}>
                                    <Typography variant="subtitle2" sx={{ color: "#bae6fd", letterSpacing: "0.08em" }}>
                                        Spotlight listing
                                    </Typography>
                                    <Typography variant="h5" fontWeight={700}>
                                        Observatory Skylofts
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.85)" }}>
                                        Rooftop study lounges, fibre internet and a 5 minute shuttle to the Cape Town campus.
                                    </Typography>
                                    <Divider sx={{ borderColor: "rgba(148, 197, 255, 0.3)" }} />
                                    <Stack spacing={2}>
                                        {[
                                            "Private & shared studios",
                                            "Starting at R4 250 per month",
                                            "1.2 km from CPUT Cape Town",
                                        ].map((item) => (
                                            <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        bgcolor: "#38bdf8",
                                                    }}
                                                />
                                                <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.8)" }}>
                                                    {item}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ px: { xs: 4, md: 10 }, pb: { xs: 8, md: 12 } }}>
                    <Grid container spacing={4}>
                        {features.map((feature) => (
                            <Grid item xs={12} md={4} key={feature.title}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: "100%",
                                        borderRadius: "28px",
                                        bgcolor: "rgba(15, 23, 42, 0.72)",
                                        backdropFilter: "blur(18px)",
                                        color: "rgba(226, 232, 240, 0.88)",
                                        border: "1px solid rgba(148, 197, 255, 0.2)",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={700} mb={1.5}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ px: { xs: 4, md: 10 }, pb: { xs: 10, md: 14 } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 4,
                            fontWeight: 600,
                            fontSize: { xs: "1.8rem", md: "2.4rem" },
                        }}
                    >
                        Your housing journey, simplified
                    </Typography>
                    <Grid container spacing={4}>
                        {journeySteps.map((step) => (
                            <Grid item xs={12} md={4} key={step.title}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: "100%",
                                        borderRadius: "28px",
                                        bgcolor: "rgba(226, 232, 240, 0.12)",
                                        color: "#f8fafc",
                                        border: "1px solid rgba(148, 197, 255, 0.25)",
                                        backdropFilter: "blur(16px)",
                                    }}
                                >
                                    <Chip
                                        label={step.label}
                                        sx={{
                                            mb: 2,
                                            color: "#0f172a",
                                            bgcolor: "#e0f2fe",
                                            fontWeight: 700,
                                            width: 44,
                                            height: 44,
                                            fontSize: "1rem",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Typography variant="h6" fontWeight={700} mb={1.5}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                                        {step.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ px: { xs: 4, md: 10 }, pb: { xs: 10, md: 16 } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 4,
                            fontWeight: 600,
                            fontSize: { xs: "1.8rem", md: "2.4rem" },
                        }}
                    >
                        Students are already moving in
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((item) => (
                            <Grid item xs={12} md={6} key={item.name}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: "28px",
                                        bgcolor: "rgba(15, 23, 42, 0.7)",
                                        border: "1px solid rgba(148, 197, 255, 0.2)",
                                        color: "rgba(226, 232, 240, 0.88)",
                                        backdropFilter: "blur(14px)",
                                        height: "100%",
                                    }}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                        <Avatar sx={{ bgcolor: "rgba(148, 197, 255, 0.25)", color: "#f8fafc" }}>
                                            {item.name.slice(0, 1)}
                                        </Avatar>
                                        <Box>
                                            <Typography fontWeight={700}>{item.name}</Typography>
                                            <Typography variant="caption" sx={{ color: "rgba(203, 213, 225, 0.8)" }}>
                                                {item.role}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body1" sx={{ fontStyle: "italic", lineHeight: 1.7 }}>
                                        {item.quote}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;
