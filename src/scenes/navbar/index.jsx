import { useState } from "react";
//Navbar: import
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
//where to get ICONS:
//https://youtu.be/K8YELRmUb5o?t=8540
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";



const NavBar = () => {
    //Navbar: Start
    //isMobileMenuToggled: its value is use to check if to open up mobile menu when it is in small screen
    //setIsMobileMenuToggled: is used to toggled it on and off
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    //it is used to distpatch action from the "reducer"
    const dispatch = useDispatch();

    const navigate = useNavigate();
    //grasping user information
    const user = useSelector((state) => state.user);

    //this a "hook" build in to Material UI:
    //that let me determine: if the current screen side:
    // < min width or > min width
    //it is a easy way to use media query inside React
    //https://youtu.be/K8YELRmUb5o?t=8722
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //it let me to go to the src.theme.js
    //and use its themeSetting() method that is already set
    //in which it returns JSON (something similar to the it) object
    const theme = useTheme();
    //like so:
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    //This jsx (React): <FlexBetween>: Note this is from components/FlexBetween.js
    //https://youtu.be/K8YELRmUb5o?t=8901
    //Good: frontend Navbar structure explaination
    //https://youtu.be/K8YELRmUb5o?t=8998

    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography
                fontWeight="bold"
                //Note: clamp() is CSS method that let me let the min, prefer, max value for the font
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                //when user click this logo: they will be navigate to the Home Page
                //by React Router
                onClick={() => navigate("/home")}
                //sx: this is where I can put CSS properties:
                //passing in the psudo properties: ?
                //https://youtu.be/K8YELRmUb5o?t=9115
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}
            >
                Sociopedia
            </Typography>
            {/*  
                on the Line: isNonMobileScreens
                    if it is non mobile screen: we will give it a search bar

                padding (short hand): first paraemter: top and buttom
                                      second parameter: left and right
            */}
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        {/*  //https://youtu.be/K8YELRmUb5o?t=9239 ? */}
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>

        {/* Desktop Nav: Dedicate for Non Mobile Screen */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                {/* 
                    This the button for Light and Dark Modes
                    'setMode' is the Action from state/index.js (Redux)
                    if it is the first time then: it will change from light to dark
                    from its 'initialState' then from Dark to Light, Light to Dark and so on 

                    Note: I am using Redux to switch Light and Dark Modes
                */}
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                {/* This is the DropDown on the top right 
                where I can see poeple as the Login as well as the LogOut button

                This "p: "0.25rem 1rem" is also short for Padding

                https://youtu.be/K8YELRmUb5o?t=9504 ?
                & means 'select with in certain CSS class' to do this
                I have to target class name in this case in Material UI (Mui)
                I find it by going into the "Inspector" (I assume Browser's inspector)
                and see which CSS class that I want to target                
                */}
                <FormControl variant="standard" value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        //https://youtu.be/K8YELRmUb5o?t=9561 ?
                        input={<InputBase />}
                    >
                        {/* these are button within the dropdown, 
                        in which the only thing user can select is
                        LogOut that take user to the other page */}
                        <MenuItem value={fullName}>
                            <Typography>
                                {fullName}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>) : (

            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                {/* This will Pop Up as Icon Menu: when use is small screen 
                which is what it is doing on the line:112 at isNonMobileScreens*/}
                <Menu />
            </IconButton>)
        }

        {/* Mobile Nav: https://youtu.be/K8YELRmUb5o?t=9717 */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* Close Icon: https://youtu.be/K8YELRmUb5o?t=9768 ? */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>

                {/* Menu Items: https://youtu.be/K8YELRmUb5o?t=9822 ? Begin */}
                {/* Flex Up and Down instead of Left and Right */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton
                        onClick={() => dispatch(setMode())}
                        sx={{ fontSize: "25px" }}
                    >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>
                                    {fullName}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>

                {/* Menu Items: End */}

            </Box>
        )}
    </FlexBetween>;
}

export default NavBar;