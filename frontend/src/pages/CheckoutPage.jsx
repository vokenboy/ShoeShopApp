import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingBag")) || [];
    setItems(storedItems);

    const calculatedTotal = storedItems.reduce((sum, item) => sum + item.price, 0);
    setTotal(calculatedTotal);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Billing Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postal Code"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <Box key={index} my={2} px={2} py={1} sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                    <Typography variant="body1" fontWeight="">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Brand: {item.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Color: {item.selectedColor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.selectedSize}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography textAlign="center" sx={{ mt: 2 }}>
                  Your bag is empty.
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" fontWeight="bold">
                <Typography>Total</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="Save card details for future purchases"
          />
          <TextField
            label="Card Number"
            fullWidth
            required
            variant="outlined"
            sx={{ my: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiration Date"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" size="large">Back</Button>
        <Button variant="contained" size="large" color="primary">Place Order</Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
