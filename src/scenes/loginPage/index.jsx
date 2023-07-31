import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //https://youtu.be/K8YELRmUb5o?t=10281
    //m is margin
    //rem: root em: base on the root size of the font
    //  benefit is so consistency across browsers and font sizes
    //mb: margin bottom
    return <Box>
        <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center">
            <Typography fontWeight="bold" fontSize="32px" color="primary">
                Sociopedia
            </Typography>
        </Box>

        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography
                fontWeight="500"
                variant="h5"
                sx={{
                    mb: "1.5rem"
                }}
            >
                Welcome to Sociopedia, the Social Media for Sociopath!
            </Typography>
            <Form />
        </Box>

    </Box>;
}

export default LoginPage;