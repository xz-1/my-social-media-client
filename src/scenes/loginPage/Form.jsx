//this will be I will do all the register functionnality (FrontEnd wise)
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//for form library:
//  Note: is good emample
//  this import line gives me this error: Attempted import error: 'formik' does not contain a default export (imported as 'Formik').
//          import Formik from "formik";
//  What I should do is this
//          import { Formik } from "formik";
import { Formik } from "formik";
//for validation library
import * as yup from "yup";
//I need to navigate when user register and login
import { useNavigate } from "react-router-dom";
//use Redux to store use information
import { useDispatch } from "react-redux";
//When user passed the log in page
import { setLogin } from "state";
//so, user can drop a file/let user put a image to upload
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

//Create Yup validation schema
//this going to determining the shape of
//how the form library is going to be saving information
//This is Yup for register form
const registerSchema = yup.object().shape({
    //passing in all the value for the schema:
    //note: do the research on some kind of boiler plate Yup form validation later
    //     and use it as the standard becuase it is somewhat a tedoius things to do
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

//This is Yup for Login form:
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});



//set up the initial values for register form values:
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

//set up the initial values for login form values:
const initialValuesLogin = {
    email: "",
    password: "",
};


//Creating form components:
const Form = () => {
    //Creating States:
    //Note: pageType can be LogIn or Regsiter and I display the the different form using
    //useState() in this case it is LogIn: useState*("login")
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    //this values parameter: from handleFromSubmit
    const register = async (values, onSubmitProps) => {
        //because of the image/picture upload field
        //use FormData() for JS Api
        //      this allows us to send from information with image
        //      formData is an Object type (n/s)
        //      https://youtu.be/K8YELRmUb5o?t=12221 ?
        const formData = new FormData();
        //Loop throught the values parameter:
        for (let value in values) {
            //https://youtu.be/K8YELRmUb5o?t=12243 ?
            //why the values[value] 
            //      (maybe it is the actual content but then 
            //          that mean value is just an index or some sort 
            //          of key for key and value pair) 
            //      : Note : it is a syntax question
            formData.append(value, values[value]);
        }
        //Note: values.picture.name : this is the actual picture file name
        //      of the uploaded picture
        //      for example in this case, server/public/asset/info2.jpeg 
        //Picture has to be appended mannually
        formData.append('picturePath', values.picture.name);

        //this is where front end make contact back end logic
        //port 3001 is set in server/.env file
        //http://localhost:3001/auth/register URL
        // /auth/register is from /server/index.js LINE 82 
        //Note: this is API call.
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        //save what I got back from backend logic as JSON format
        const savedUser = await savedUserResponse.json();
        //This is the reason why that onSubmitProps
        //is passing to all the form function
        //it is esential to reset the form
        onSubmitProps.resetForm();

        //Once user registered then change the form to Log In
        if (savedUser) {
            setPageType("login");
        }
    };//End of register()

    //this values parameter: from handleFromSubmit
    const login = async (values, onSubmitProps) => {

        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //bacause it is already fommat into JSON already from the back end
                body: JSON.stringify(values),
            }
        );




        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();



        if (loggedIn) {
            //console.log("this is from loginPage: line: 159: " + loggedInResponse);
            dispatch(
                //this is from Redux state /src/state/index.js LINE 24
                //https://youtu.be/K8YELRmUb5o?t=12504 ?
                // pass in into Redux's payload, I have to pass it in the desinated object like, 
                //      in this case, user amd token, which are already define in
                //      /src/state/index.js LINE 26 and 27 
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
            //Finished the Login and Register Front End here:
            //https://youtu.be/K8YELRmUb5o?t=12541
            //Note: remember to run the server:
            //  navigate to server folder and then:
            //  npm run start
            //https://youtu.be/K8YELRmUb5o?t=12617
        }
    };//End of login()

    //js async function (just to remind myself)
    //Note the arguments values and onSubmitProps
    //Note: parameter values is passed from the, 
    //      for example: value={values.email}, 
    //      property of the TextField: 
    const handleFormSubmit = async (values, onSubmitProps) => {
        //this is where the backend logic for Login and Register is called
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    }
    //Return Statement: Start
    //this return belong to const Form = () => { LINE: 69
    //returning Formik component
    return (
        //Note: this from import Formik from "formik";
        //https://youtu.be/K8YELRmUb5o?t=11020
        //Note: this is what Formik is doing:
        //01: Scraping 'handleFormSubmit' from onSubmit={handleFormSubmit}
        //02: Pass it into the wieid Formik syntax {({handleSubmit, etc}) => () } 
        //03: then pass it onto <form onSubmit={handleSubmit}> function
        <Formik
            onSubmit={handleFormSubmit}
            //determine weather it is Login or Register then set the initial values approrietely
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            //similar to above line but for validation schemas
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {/* This is Formik Syntax */}
            {({
                //https://youtu.be/K8YELRmUb5o?t=11020: ?
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        //this is saying that
                        //spliting the grip into 4 sections: with minimum of 0; otherwise,
                        //it will split into the equal factions of 4
                        //https://youtu.be/K8YELRmUb5o?t=11129 ?
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            //This means that targeting 'div' inside the <Box>
                            //as a child component/class: meaning that
                            //anything below this point as div will has the following properties
                            //https://youtu.be/K8YELRmUb5o?t=11205: good explaination on the layout
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        {/* is it is register form: https://youtu.be/K8YELRmUb5o?t=11390 */}
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    //this is the short hand for border
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        //Callback on how I process the file
                                        onDrop={(acceptedFiles) =>
                                            //since this is different from the textfields
                                            //since being the picture (Formik input)
                                            //so, I use the 'setFieldValue' to the picture
                                            //https://youtu.be/K8YELRmUb5o?t=11594 ?
                                            setFieldValue("picture", acceptedFiles[0]
                                            )}
                                    >
                                        {/* this belong to DropZone */}
                                        {({
                                            getRootProps, getInputProps
                                        }) => (
                                            //this is: jsx
                                            <Box
                                                //this is require in DropZone
                                                {...getRootProps()}

                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>
                                                        Add Picture Here
                                                    </p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )} {/* This is the end of Register form */}

                        {/* this section will be for be both LogIn and Register: Start */}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* this section will be for be both LogIn and Register: End */}
                    </Box>

                    {/* Button and Link section: Start */}
                    <Box>
                        <Button
                            fullWidth
                            //this will handle <form onSubmit={handleSubmit}> LINE: 113 and the Logic in LINE 84
                            //https://youtu.be/K8YELRmUb5o?t=12094
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                //Note: it is supposed to be this: 
                                //      color: palette.primary.alt,
                                //but the text is not visible (properly because its font color is the
                                //same with the button backgroud color)
                                //so, I have to use:
                                //      color: palette.primary.light,      
                                color: palette.primary.light,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                //clean the inputs set that was there from the previous form
                                //console.log(`isRegister: ${isRegister}`);
                                //console.log(`isLogin: ${isLogin}`);
                                //console.log(`pageType: ${pageType}`);
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up Here."
                                : "Already have an account? Login here."}
                        </Typography>

                        {/* Button and Link section: End */}
                    </Box>
                </form>
            )}

        </Formik>
    ); // End of Return Statement

}

export default Form;