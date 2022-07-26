import { Container, Skeleton, Box } from '@mui/material';

export const GoalTrackerSkeleton = () => {
  return (
    <Container
      sx={{
        width: 792,
        height: 409,
        mr: 5,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        borderRadius: '5px',
      }}
    >
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" sx={{ width: 100, height: 30 }} />
        <Skeleton variant="text" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Box>
          <Skeleton variant="circular" width={130} height={130} />
          <Skeleton variant="text" sx={{ mt: 3 }} />
          <Skeleton variant="text" sx={{ width: 60 }} />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            width={330}
            height={200}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>
    </Container>
  );
};
