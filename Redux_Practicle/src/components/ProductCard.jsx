import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ShoppingCart } from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: 480,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
  },
}));

const ProductCard = ({ product, addToCart, isInCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="250"
        image={product.thumbnail}
        alt={product.title}
        sx={{ borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>

        {product.discountPercentage && (
          <Chip
            label={`-${product.discountPercentage}% Off`}
            color="success"
            sx={{ mb: 1 }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            ${product.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={isInCart || isLoading}
            startIcon={<ShoppingCart />}
            sx={{
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {isInCart ? "In Cart" : isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;