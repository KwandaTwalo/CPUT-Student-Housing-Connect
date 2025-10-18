import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const defaultUnderlineColors = ["#0A4EAF", "#FF6700", "#C0C0C0", "#3A6EA5", "#004E98"];

function AppName({ color = "#1a1a1a", iconColor = "#2563eb", underlinePalette }) {
    const underlineColors = underlinePalette && underlinePalette.length > 0 ? underlinePalette : defaultUnderlineColors;

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
                        color,
                        transition: "color 0.3s ease",
                        "&:hover": { color: iconColor },
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
                    {underlineColors.map((paletteColor, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box
                            key={index}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: paletteColor,
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
                    color: iconColor,
                    fontSize: 28,
                    transition: "transform 0.2s ease, color 0.3s ease",
                    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))",
                    "&:hover": {
                        color,
                        transform: "scale(1.1)",
                        cursor: "default",
                    },
                }}
                aria-label="Verified"
            />
        </Box>
    );
}

AppName.propTypes = {
    color: PropTypes.string,
    iconColor: PropTypes.string,
    underlinePalette: PropTypes.arrayOf(PropTypes.string),
};

export default AppName;
