import CategoryFilter from '../components/CategoryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Paper } from '@mui/material';
import ProductCard from '../components/ProductCard';
import CustomPagination from '../components/Pagination';
import { fetchProducts } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products = [], error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems); 

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
  };

  const filteredProducts = products.filter((product) =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container sx={{ padding: 4, minHeight: '100vh'}}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
          Explore Our Products
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Find the best products that suit your needs
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          handleCategoryChange={setSelectedCategory} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {error ? (
          <Typography color="error" sx={{ mx: 'auto' }}>{error}</Typography>
        ) : paginatedProducts.length === 0 ? (
          <Box sx={{ mx: 'auto', textAlign: 'center' }}>
            <Typography>No products found.</Typography>
          </Box>
        ) : (
          paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard 
                product={product} 
                addToCart={handleAddToCart}   
                isInCart={cartItems.some((item) => item.id === product.id)} 
              />
            </Grid>
          ))
        )}
      </Grid>

      {products.length === 0 && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CustomPagination
          page={page}
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
};

export default HomePage;