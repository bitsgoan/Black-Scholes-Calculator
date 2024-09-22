"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

const optionTypes = ["ce", "pe"];
const priceRange = Array.from({ length: 25 }, (_, i) => 14000 + i * 500);

export default function OptionCalculatorForm() {
  const [formData, setFormData] = useState({
    stockPrice: 26000,
    strikePrice: 23000,
    daysLeft: 115,
    volatility: 20.7,
    optionType: "pe",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      volatility: formData.volatility / 100,
    };
    const response = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });
    const data = await response.json();
    setResult(data.price);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="stockPrice-label">Nifty Price</InputLabel>
        <Select
          labelId="stockPrice-label"
          id="stockPrice"
          name="stockPrice"
          value={formData.stockPrice}
          label="Nifty Price"
          onChange={handleChange}
        >
          {priceRange.map((price) => (
            <MenuItem key={price} value={price}>
              {price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="strikePrice-label">Strike Price</InputLabel>
        <Select
          labelId="strikePrice-label"
          id="strikePrice"
          name="strikePrice"
          value={formData.strikePrice}
          label="Strike Price"
          onChange={handleChange}
        >
          {priceRange.map((price) => (
            <MenuItem key={price} value={price}>
              {price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        label="Volatility (%) (IndiaVIX)"
        name="volatility"
        type="number"
        inputProps={{ step: 0.1 }}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Calculate Price
      </Button>

      {result !== null && (
        <Typography variant="h6" component="p" gutterBottom>
          Option Price: {result.toFixed(1)}
        </Typography>
      )}
    </Box>
  );
}
