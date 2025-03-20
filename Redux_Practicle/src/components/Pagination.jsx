import React from 'react';
import { Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: theme.spacing(1),
    transition: 'background-color 0.3s, transform 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'scale(1.1)',
    },
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const CustomPagination = ({ page, count, onChange }) => {
  return (
    <Stack spacing={2} sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <StyledPagination 
        count={count} 
        page={page} 
        onChange={onChange} 
        color="primary" 
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default CustomPagination;