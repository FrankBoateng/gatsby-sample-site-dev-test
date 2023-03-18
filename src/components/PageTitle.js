import React from "react"
import styled from "@mui/styled-engine";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const PageTitleGrid = styled(Grid)({
    display: "flex",
    marginTop: "1vh",
    marginBottom: "1vh",
});

const PageTitleBox = styled(Box)(({ backgroundColor = "#026eaa", borderRadius="0" }) => ({
    display: "flex",
    height: "100%",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor,
    borderRadius
}));

const PageTitle = ({ children, backgroundColor, borderRadius}) => (
    <PageTitleGrid item xs={12}>
        <PageTitleBox sx={{ width: {xs: "100%"}, pt: "1%", pb: "1%", pl: "1%", pr: "1%" }} backgroundColor={backgroundColor} borderRadius={borderRadius} >
            {children} 
        </PageTitleBox>
    </PageTitleGrid>
);

export default PageTitle;
 