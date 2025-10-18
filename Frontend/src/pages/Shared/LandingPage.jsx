import React from "react";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import AppName from "../../components/shared/AppName";

const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#workflow" },
    { label: "Support", href: "#support" },
    { label: "FAQs", href: "#faqs" },
];

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

const partnerOrganisations = [
    { name: "CPUT Housing Office", caption: "Policy & accreditation" },
    { name: "City of Cape Town", caption: "Local compliance" },
    { name: "Student Wellness", caption: "Wellbeing support" },
    { name: "Safety & Security", caption: "Emergency integration" },
];

const complianceBadges = ["DHET aligned", "POPIA compliant", "Emergency ready"];

const platformPillars = [
    {
        title: "Rigorous verification",
        description:
            "Landlords are audited with identity checks, property inspections and compliance reviews before they can list.",
        icon: WorkspacePremiumRoundedIcon,
    },
    {
        title: "Student-first safeguards",
        description:
            "Security protocols, live guard integrations and smart alerts keep every resident protected on and off campus.",
        icon: SecurityRoundedIcon,
    },
    {
        title: "Guided discovery",
        description:
            "Rich neighbourhood data, commute insights and interactive maps help students shortlist the right fit instantly.",
        icon: MapRoundedIcon,
    },
    {
        title: "Operational transparency",
        description:
            "Dashboards surface accreditation progress, maintenance logs and feedback trends for administrators in real-time.",
        icon: InsightsRoundedIcon,
    },
];

const workflowSteps = [
    {
        title: "Discover verified listings",
        description:
            "Search the curated directory with confidence filters, sustainability ratings and real-time room availability.",
    },
    {
        title: "Submit a complete application",
        description:
            "Upload supporting documents securely, get instant validation prompts and monitor progress at each milestone.",
    },
    {
        title: "Collaborate with landlords",
        description:
            "Chat in-app, schedule tours and receive digital tenancy agreements with clear expectations for both parties.",
    },
    {
        title: "Move-in with assurance",
        description:
            "Orientation checklists, wellness resources and 24/7 support ensure a professional welcome to your new home.",
    },
];

const supportChannels = [
    {
        title: "Dedicated housing advisors",
        description:
            "Schedule a consultation with a trained advisor to match listings to your academic schedule and lifestyle needs.",
        icon: SupportAgentRoundedIcon,
        action: { label: "Talk to an advisor", href: "#contact", type: "anchor" },
    },
    {
        title: "Transparent accreditation",
        description:
            "Understand how quality checks are performed with shared audit trails and compliance documentation.",
        icon: FactCheckRoundedIcon,
        action: { label: "View accreditation guide", href: "/help", type: "route" },
    },
    {
        title: "Flexible onboarding",
        description:
            "Workshops keep landlords, student leaders and administrators aligned on expectations and service standards.",
        icon: CalendarMonthRoundedIcon,
        action: { label: "Browse onboarding dates", href: "#contact", type: "anchor" },
    },
];

const faqs = [
    {
        question: "How do you verify landlords before they can list?",
        answer:
            "Every partner provides proof of ownership, safety compliance certificates and passes a site inspection conducted with the CPUT housing office.",
    },
    {
        question: "Can international students apply before arriving in Cape Town?",
        answer:
            "Yes. The digital application flow supports international documentation, remote video tours and allows you to sign pre-arrival agreements securely.",
    },
    {
        question: "What happens if I need urgent assistance after hours?",
        answer:
            "Our escalation playbook connects you with on-call campus security and housing advisors. Emergency contacts are visible in every dashboard.",
    },
    {
        question: "Do landlords receive tools to manage compliance renewals?",
        answer:
            "Automated reminders, document storage and annual accreditation checklists are provided to keep every listing in good standing.",
    },
];

const contactMethods = [
    {
        label: "Call us directly",
        value: "+27 21 959 6000",
        icon: PhoneInTalkRoundedIcon,
        href: "tel:+27219596000",
        type: "anchor",
    },
    {
        label: "Email the housing desk",
        value: "housing@cput.ac.za",
        icon: MailRoundedIcon,
        href: "mailto:housing@cput.ac.za",
        type: "anchor",
    },
    {
        label: "Visit the help centre",
        value: "Weekdays 08:00 – 16:30, Administration Building, Bellville Campus",
        icon: LocationCityRoundedIcon,
        href: "/help",
        type: "route",
    },
];

const getInitials = (name) => name.match(/\b\w/g)?.join("").slice(0, 2).toUpperCase() || "";

function LandingPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background:
                    "linear-gradient(130deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 145, 178, 0.88) 45%, rgba(14, 165, 233, 0.75) 100%)",
                color: "#f8fafc",
                overflowX: "hidden",
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

            <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(15, 23, 42, 0.72)",
                        borderBottom: "1px solid rgba(148, 197, 255, 0.25)",
                        backdropFilter: "blur(14px)",
                    }}
                >
                    <Toolbar
                        disableGutters
                        sx={{
                            width: "100%",
                            px: { xs: 3, md: 10 },
                            py: { xs: 2, md: 2.5 },
                            display: "flex",
                            flexWrap: "wrap",
                            gap: { xs: 2, md: 3 },
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <AppName
                            color="#f8fafc"
                            iconColor="#38bdf8"
                            underlinePalette={["#38bdf8", "#2563eb", "#1e293b", "#0ea5e9", "#93c5fd"]}
                        />

                        <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
                            {navLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    component="a"
                                    href={link.href}
                                    sx={{
                                        color: "rgba(226, 232, 240, 0.85)",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        borderRadius: "999px",
                                        px: 2.5,
                                        "&:hover": {
                                            backgroundColor: "rgba(148, 197, 255, 0.18)",
                                            color: "#f8fafc",
                                        },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Stack>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { xs: "stretch", sm: "center" } }}>
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                sx={{
                                    borderColor: "rgba(191, 219, 254, 0.45)",
                                    color: "#e2e8f0",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    px: 3,
                                    borderRadius: "999px",
                                    "&:hover": {
                                        borderColor: "#fff",
                                        backgroundColor: "rgba(226, 232, 240, 0.14)",
                                    },
                                }}
                            >
                                Sign in
                            </Button>
                            <Button
                                component="a"
                                href="#contact"
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    px: 3.5,
                                    borderRadius: "999px",
                                    boxShadow: "0 18px 45px rgba(37, 99, 235, 0.4)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                                        boxShadow: "0 22px 55px rgba(37, 99, 235, 0.55)",
                                    },
                                }}
                            >
                                Book a consultation
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 6, md: 8 },
                        pb: { xs: 6, md: 10 },
                    }}
                >
                    <Box
                        id="hero"
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                            columnGap: { xs: 3, md: 6 },
                            rowGap: { xs: 4, md: 0 },
                            px: { xs: 3, md: 10 },
                            pt: { xs: 6, md: 8 },
                        }}
                    >
                        <Stack spacing={3} sx={{ maxWidth: 620 }}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
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
                                <Chip
                                    label="Professional tenancy platform"
                                    sx={{
                                        bgcolor: "rgba(15, 23, 42, 0.55)",
                                        color: "#bae6fd",
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                    }}
                                />
                            </Stack>

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
                                Browse beautiful listings, explore interactive maps of Cape Town and secure your perfect space with
                                transparent support from the housing team.
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
                                                p: 2.2,
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

                        <Paper
                            elevation={0}
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
                        </Paper>
                    </Box>

                    <Box
                        id="partners"
                        sx={{
                            px: { xs: 3, md: 10 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Trusted across campus partnerships
                        </Typography>
                        <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.78)", maxWidth: 640 }}>
                            Our platform is designed with the CPUT housing office and strategic municipal partners to uphold the
                            highest standards of student safety, wellbeing and landlord professionalism.
                        </Typography>
                        <Grid container spacing={3}>
                            {partnerOrganisations.map((partner) => {
                                const initials = getInitials(partner.name);
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={partner.name}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                height: "100%",
                                                borderRadius: "24px",
                                                bgcolor: "rgba(15, 23, 42, 0.55)",
                                                border: "1px solid rgba(148, 197, 255, 0.15)",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1.5,
                                            }}
                                        >
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "rgba(148, 197, 255, 0.18)",
                                                        color: "#e0f2fe",
                                                        fontWeight: 700,
                                                        width: 46,
                                                        height: 46,
                                                    }}
                                                >
                                                    {initials}
                                                </Avatar>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                    {partner.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)" }}>
                                                {partner.caption}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Stack direction="row" spacing={1.5} flexWrap="wrap">
                            {complianceBadges.map((badge) => (
                                <Chip
                                    key={badge}
                                    label={badge}
                                    sx={{
                                        bgcolor: "rgba(191, 219, 254, 0.14)",
                                        color: "#dbeafe",
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box
                        id="platform"
                        sx={{
                            px: { xs: 3, md: 10 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        <Stack spacing={1.5}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                Platform pillars
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Professional workflows for students, landlords and administrators
                            </Typography>
                            <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.8)", maxWidth: 720 }}>
                                The Student Housing Connect experience is crafted with enterprise-grade tooling, ensuring every
                                interaction feels polished, reliable and ready for scale.
                            </Typography>
                        </Stack>
                        <Grid container spacing={3}>
                            {platformPillars.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <Grid item xs={12} sm={6} md={3} key={pillar.title}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                height: "100%",
                                                borderRadius: "24px",
                                                bgcolor: "rgba(15, 23, 42, 0.55)",
                                                border: "1px solid rgba(148, 197, 255, 0.15)",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1.5,
                                            }}
                                        >
                                            <Icon sx={{ fontSize: 34, color: "#38bdf8" }} />
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {pillar.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)", lineHeight: 1.6 }}>
                                                {pillar.description}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>

                    <Box
                        id="workflow"
                        sx={{
                            px: { xs: 3, md: 10 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        <Stack spacing={1.5}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                How it works
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, maxWidth: 700 }}>
                                A guided journey from discovery to move-in day
                            </Typography>
                        </Stack>
                        <Grid container spacing={3}>
                            {workflowSteps.map((step, index) => (
                                <Grid item xs={12} md={6} key={step.title}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: "24px",
                                            bgcolor: "rgba(15, 23, 42, 0.55)",
                                            border: "1px solid rgba(148, 197, 255, 0.15)",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                            height: "100%",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: "rgba(148, 197, 255, 0.85)", fontWeight: 700, letterSpacing: "0.08em" }}
                                        >
                                            Step {index + 1}
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)", lineHeight: 1.6 }}>
                                            {step.description}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box
                        id="support"
                        sx={{
                            px: { xs: 3, md: 10 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        <Stack spacing={1.5}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                Concierge-level support
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, maxWidth: 680 }}>
                                Expert teams ready to assist every stakeholder
                            </Typography>
                            <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.8)", maxWidth: 720 }}>
                                From application advice to compliance coaching, our multidisciplinary support squads keep your housing
                                journey professional, transparent and stress-free.
                            </Typography>
                        </Stack>
                        <Grid container spacing={3}>
                            {supportChannels.map((channel) => {
                                const Icon = channel.icon;
                                const actionProps =
                                    channel.action.type === "route"
                                        ? { component: Link, to: channel.action.href }
                                        : { component: "a", href: channel.action.href };
                                return (
                                    <Grid item xs={12} md={4} key={channel.title}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                borderRadius: "24px",
                                                bgcolor: "rgba(15, 23, 42, 0.55)",
                                                border: "1px solid rgba(148, 197, 255, 0.15)",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1.5,
                                                height: "100%",
                                            }}
                                        >
                                            <Icon sx={{ fontSize: 34, color: "#38bdf8" }} />
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {channel.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.7)", lineHeight: 1.6 }}>
                                                {channel.description}
                                            </Typography>
                                            <Button
                                                {...actionProps}
                                                variant="text"
                                                sx={{
                                                    mt: "auto",
                                                    alignSelf: "flex-start",
                                                    color: "#bae6fd",
                                                    fontWeight: 600,
                                                    textTransform: "none",
                                                    px: 0,
                                                    "&:hover": { color: "#fff" },
                                                }}
                                            >
                                                {channel.action.label}
                                            </Button>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>

                    <Box
                        id="faqs"
                        sx={{
                            px: { xs: 3, md: 10 },
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <Stack spacing={1.5}>
                            <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                Frequently asked questions
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Answers before you even have to ask
                            </Typography>
                            <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.8)", maxWidth: 720 }}>
                                We document our processes end-to-end so students, landlords and administrators always know what to
                                expect at each stage of the housing journey.
                            </Typography>
                        </Stack>
                        <Stack spacing={2}>
                            {faqs.map((item) => (
                                <Accordion
                                    key={item.question}
                                    disableGutters
                                    sx={{
                                        bgcolor: "rgba(15, 23, 42, 0.55)",
                                        borderRadius: "20px !important",
                                        border: "1px solid rgba(148, 197, 255, 0.15)",
                                        "&:before": { display: "none" },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#bae6fd" }} />}
                                        sx={{
                                            px: 3,
                                            py: 2,
                                            color: "#f8fafc",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.question}
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, color: "rgba(226, 232, 240, 0.78)", lineHeight: 1.7 }}>
                                        {item.answer}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Box>

                    <Box
                        id="contact"
                        sx={{
                            px: { xs: 3, md: 10 },
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: "28px",
                                bgcolor: "rgba(15, 23, 42, 0.6)",
                                border: "1px solid rgba(148, 197, 255, 0.2)",
                            }}
                        >
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={2}>
                                        <Typography variant="overline" sx={{ letterSpacing: "0.2em", color: "#bae6fd" }}>
                                            Let's collaborate
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                            Partner with the CPUT housing experience team
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "rgba(226, 232, 240, 0.82)" }}>
                                            Whether you are a landlord looking to onboard properties, a student needing tailored guidance or
                                            an administrator planning the next intake cycle, we are ready to help.
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.5}>
                                        {contactMethods.map((method) => {
                                            const Icon = method.icon;
                                            const actionProps =
                                                method.type === "route"
                                                    ? { component: Link, to: method.href }
                                                    : { component: "a", href: method.href };
                                            return (
                                                <Button
                                                    key={method.label}
                                                    {...actionProps}
                                                    startIcon={<Icon />}
                                                    variant="contained"
                                                    sx={{
                                                        justifyContent: "flex-start",
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        borderRadius: "18px",
                                                        py: 1.5,
                                                        px: 3,
                                                        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.9), rgba(37, 99, 235, 0.9))",
                                                        color: "#f8fafc",
                                                        boxShadow: "0 18px 40px rgba(37, 99, 235, 0.35)",
                                                        "&:hover": {
                                                            background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                                                            boxShadow: "0 20px 48px rgba(37, 99, 235, 0.45)",
                                                        },
                                                    }}
                                                >
                                                    <Stack alignItems="flex-start" spacing={0.5}>
                                                        <Typography component="span" variant="body1" sx={{ fontWeight: 700 }}>
                                                            {method.label}
                                                        </Typography>
                                                        <Typography component="span" variant="body2" sx={{ color: "rgba(241, 245, 249, 0.92)" }}>
                                                            {method.value}
                                                        </Typography>
                                                    </Stack>
                                                </Button>
                                            );
                                        })}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Box>

                <Box
                    component="footer"
                    sx={{
                        px: { xs: 3, md: 10 },
                        py: { xs: 4, md: 5 },
                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                        borderTop: "1px solid rgba(148, 197, 255, 0.25)",
                    }}
                >
                    <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ color: "rgba(226, 232, 240, 0.78)", maxWidth: 520 }}>
                                Built with care for CPUT students, landlords and administrators working together to create exceptional
                                housing experiences across Cape Town.
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
                    <Divider sx={{ my: 3, borderColor: "rgba(148, 197, 255, 0.2)" }} />
                    <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.6)" }}>
                        © {new Date().getFullYear()} Cape Peninsula University of Technology. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;
