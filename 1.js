// pages/index.js
import { useState } from "react";
import Head from "next/head";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const optionTypes = ["ce", "pe"];

export default function Home() {
  const [formData, setFormData] = useState({
    stockPrice: 20000,
    strikePrice: 23000,
    daysLeft: 115,
    volatility: 0.207,
    optionType: "pe",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResult(data.price);
  };

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Option Price Calculator</title>
        <meta
          name="description"
          content="Calculate option prices using the Black-Scholes model"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom>
        Option Price Calculator
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="stockPrice"
          label="Stock Price"
          name="stockPrice"
          type="number"
          value={formData.stockPrice}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="strikePrice"
          label="Strike Price"
          name="strikePrice"
          type="number"
          value={formData.strikePrice}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="daysLeft"
          label="Days Left"
          name="daysLeft"
          type="number"
          value={formData.daysLeft}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="volatility"
          label="Volatility"
          name="volatility"
          type="number"
          inputProps={{ step: 0.001 }}
          value={formData.volatility}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="option-type-label">Option Type</InputLabel>
          <Select
            labelId="option-type-label"
            id="optionType"
            name="optionType"
            value={formData.optionType}
            label="Option Type"
            onChange={handleChange}
          >
            {optionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Calculate Price
        </Button>
      </Box>

      {result !== null && (
        <Typography variant="h6" component="p" gutterBottom>
          Option Price: {result.toFixed(2)}
        </Typography>
      )}
    </Container>
  );
}
