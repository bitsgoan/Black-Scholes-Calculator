import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import OptionCalculatorForm from "../../components/OptionCalculator";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
          >
            Option Price Calculator
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Calculate a fair price for Illiquid Strikes
          </Typography>
          <OptionCalculatorForm />
        </Paper>
      </Container>
    </Box>
  );
}
