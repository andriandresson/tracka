import { GoalTracker } from '@sendiradid-internship/tracka-ui';
import { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Container, Card, Typography } from '@mui/material';

interface Props {
  goalsArray: any[];
}

export const GoalTrackerWidget: FC<Props> = ({ goalsArray }) => {
  return (
    <Box sx={{ width: 600 }}>
      {goalsArray[0]?.goal.id ? (
        <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible>
          {goalsArray.map((goal) => {
            return <GoalTracker key={goal.id} goalData={goal} />;
          })}
        </Carousel>
      ) : (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{ width: 520, p: 4, display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="body2">
              Setting goals is the first step in turning the invisible into the
              visible. 🙈
            </Typography>
            <Typography variant="caption" sx={{ alignSelf: 'flex-end' }}>
              Tony Robinson
            </Typography>
          </Card>
        </Container>
      )}
    </Box>
  );
};
// import { GoalTracker } from "@sendiradid-internship/tracka-ui";
// import {FC} from "react";
// import Carousel from 'react-material-ui-carousel';
//
// interface Props {
//     goalsArray: any[]
// }
//
// export const GoalTrackerWidget: FC<Props> = ({goalsArray}) => {
//     return (
//         <Carousel>
//             {goalsArray.map((goal) => {
//                 return (
//                     <GoalTracker
//                         key={goal.id}
//                         goal={goal}
//                     />
//                 )
//             }
//             )}
//         </Carousel>
//     )
// }
//
// export default GoalTrackerWidget;
// import { GoalTracker } from "@sendiradid-internship/tracka-ui";
// import {FC} from "react";
// import Carousel from 'react-material-ui-carousel';
//
// interface Props {
//     goalsArray: any[]
// }
//
// export const GoalTrackerWidget: FC<Props> = ({goalsArray}) => {
//     return (
//         <Carousel>
//             {goalsArray.map((goal) => {
//                 return (
//                     <GoalTracker
//                         key={goal.id}
//                         goal={goal}
//                     />
//                 )
//             }
//             )}
//         </Carousel>
//     )
// }
//
// export default GoalTrackerWidget;
// import { GoalTracker } from "@sendiradid-internship/tracka-ui";
// import {FC} from "react";
// import Carousel from 'react-material-ui-carousel';
//
// interface Props {
//     goalsArray: any[]
// }
//
// export const GoalTrackerWidget:
