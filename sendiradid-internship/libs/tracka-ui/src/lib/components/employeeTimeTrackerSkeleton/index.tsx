import {Container, Skeleton, Box} from '@mui/material';

export const TimeTrackerSkeleton = () => {
    return(
        <Container
        sx={{
          width: '512px',
          height: '409px',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{display:'flex', pt:3, gap: 30}}>
        <Skeleton sx={{flexGrow:1, width:100, height:40}}/>
        <Skeleton sx={{flexGrow:1, width:100, height:20}}/> 
        </Box>
        <Box sx={{display:'flex', pt:3, gap:40}}> 
        <Skeleton sx={{flexGrow:1, width:60, height:20}}/>
        <Skeleton sx={{flexGrow:1, width:60, height:20}}/> 
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', gap:2, alignContent:'flex-start', pt:1.5}}>
          <Box sx={{display:'flex', flexDirection:'row', gap:2}}>
            <Skeleton variant='circular' sx={{width:40, height:40}}/>
            <Box sx={{display:'flex', flexDirection:'row', gap:23}}>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Skeleton variant='text' sx={{width:140, height:25}}/>
            <Skeleton variant='text' sx={{width:70, height:15}}/>
            </Box>
            <Skeleton variant='text' sx={{width:55, height:25}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', gap:2}}>
            <Skeleton variant='circular' sx={{width:40, height:40}}/>
            <Box sx={{display:'flex', flexDirection:'row', gap:23}}>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Skeleton variant='text' sx={{width:140, height:25}}/>
            <Skeleton variant='text' sx={{width:70, height:15}}/>
            </Box>
            <Skeleton variant='text' sx={{width:55, height:25}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', gap:2}}>
            <Skeleton variant='circular' sx={{width:40, height:40}}/>
            <Box sx={{display:'flex', flexDirection:'row', gap:23}}>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Skeleton variant='text' sx={{width:140, height:25}}/>
            <Skeleton variant='text' sx={{width:70, height:15}}/>
            </Box>
            <Skeleton variant='text' sx={{width:55, height:25}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', gap:2}}>
            <Skeleton variant='circular' sx={{width:40, height:40}}/>
            <Box sx={{display:'flex', flexDirection:'row', gap:23}}>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Skeleton variant='text' sx={{width:140, height:25}}/>
            <Skeleton variant='text' sx={{width:70, height:15}}/>
            </Box>
            <Skeleton variant='text' sx={{width:55, height:25}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', gap:2}}>
            <Skeleton variant='circular' sx={{width:40, height:40}}/>
            <Box sx={{display:'flex', flexDirection:'row', gap:23}}>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
            <Skeleton variant='text' sx={{width:140, height:25}}/>
            <Skeleton variant='text' sx={{width:70, height:15}}/>
            </Box>
            <Skeleton variant='text' sx={{width:55, height:25}}/>
            </Box>
          </Box>
        </Box>
      </Container>
    )

};