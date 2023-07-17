import { Box } from "@mui/material";
import { styled } from "@mui/system";



//that is called "style components": it is very, if I were to re-used CSS as the "COMPONENT" (I think I will like this syntax)
//I can name component, however I want as it is another component, hence 'FlexBetween'
//and then I pass CSS properties in, hence: display, justifyContent, alignItems, etc
//NOTE:
//by doing this allow me to re-use this set of CSS to different areas/classes/ as import (I think)
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export default FlexBetween;

//Note: this is: Sixth Commit: Finished setting code for Style Component CSS: components/FlexBetwwen.jsx
//Next Step is: navbar: src/scenes/navbar/index.jsx