"use client";

import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";

export default function Scenario1() {
  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
          >
            Scenario 2
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Content for Scenario 2 goes here.
          </Typography>
          {/* Add your Scenario 2 specific content here */}
        </Paper>
      </Container>
    </Box>
  );
}
