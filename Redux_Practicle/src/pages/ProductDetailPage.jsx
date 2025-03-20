import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  TextField,
  Chip,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { addToCart } from "../redux/actions/cartActions";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  marginTop: theme.spacing(15),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  borderRadius: theme.spacing(2),
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[10],
  },
}));

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id.toString() === id)
  );
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const initialQuantity =
    cartItems.find((item) => item.id.toString() === id)?.quantity || 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
  };

  if (!product) {
    return <Typography color="error">Product not found.</Typography>;
  }

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="400"
        image={product.thumbnail}
        alt={product.title}
        sx={{ borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit" }}
      />
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Chip label={`Brand: ${product.brand}`} sx={{ mr: 1 }} />
          <Chip label={`Category: ${product.category}`} sx={{ mr: 1 }} />
          <Chip label={`Price: $${product.price}`} color="primary" sx={{ mr: 1 }} />
          <Chip label={`Stock: ${product.stock}`} color="secondary" />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Reviews:</Typography>
          <List>
            {product.reviews.map((review, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        {review.reviewerName}
                        <Rating
                          value={review.rating}
                          readOnly
                          precision={0.5}
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                    secondary={review.comment}
                  />
                </ListItem>
                {index < product.reviews.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1, max: product.stock }}
            sx={{ width: "100px" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductDetailPage;
