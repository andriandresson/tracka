import { FC, useState } from 'react';
import { Popover, Button, Typography, Divider, Box } from '@mui/material';
import { DateRange, Range } from 'react-date-range';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import * as timeUtils from './timeUtils';
interface Props {
  state: Range[];
  onApply: (item: { startDate: Date; endDate?: Date }) => void;
}

const StyledButton = styled(Button)({
  '&&': {
    background: 'none',
  },
});
const StyledTypo = styled(Typography)({
  '&&': {
    color: '#FFF',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '2px solid rgba(255,255,255,0)',
  },
  ':hover': {
    borderBottom: '2px solid #278BFC',
  },
});

export const CustomDateRangePicker: FC<Props> = ({ state, onApply }) => {
  const [customDateRangeState, setCustomDateRangeState] =
    useState<Range[]>(state);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const setToLastWeek = () => {
    setCustomDateRangeState((prevState) => {
      const newState = [...prevState];
      newState[0].startDate = timeUtils.weekAgoDate();
      newState[0].endDate = timeUtils.today();
      return newState;
    });
  };

  const setToLast30Days = () => {
    setCustomDateRangeState((prevState) => {
      const newState = [...prevState];
      newState[0].startDate = timeUtils.monthAgoDate();
      newState[0].endDate = timeUtils.today();
      return newState;
    });
  };
  const setToPreviousMonth = () => {
    setCustomDateRangeState((prevState) => {
      const newState = [...prevState];
      newState[0].startDate = timeUtils.previousMonthStartDate();
      newState[0].endDate = timeUtils.previousMonthEndDate();
      return newState;
    });
  };

  const setToThisMonth = () => {
    setCustomDateRangeState((prevState) => {
      const newState = [...prevState];
      newState[0].startDate = timeUtils.thisMonthStartDate();
      newState[0].endDate = timeUtils.thisMonthEndDate();
      return newState;
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('CLOSING');
    setAnchorEl(null);
    const startDate = customDateRangeState[0]?.startDate || new Date();
    const endDate = customDateRangeState[0]?.endDate;
    onApply({ startDate, endDate });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      
      <Button
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          color: '#fff',
          fontSize:'0.688rem'
        }}
        startIcon={<CalendarTodayIcon sx={{ height: 16, m: 0 }} />}
        endIcon={<ArrowDropDownIcon />}
      >
        
        {state[0]?.startDate?.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: '2-digit',
        }) +
          ' - ' +
          (state[0].endDate
            ? state[0]?.endDate?.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
              })
            : 'Now')}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <StyledButton onClick={setToLastWeek}>
              <StyledTypo sx={{ fontSize: 12 }}>This Week</StyledTypo>
            </StyledButton>
            <Divider orientation="vertical" flexItem />
            <StyledButton onClick={setToLast30Days}>
              <StyledTypo sx={{ fontSize: 12 }}> Last 30 days</StyledTypo>
            </StyledButton>
            <StyledButton onClick={setToPreviousMonth}>
              <StyledTypo sx={{ fontSize: 12 }}> Last Month</StyledTypo>
            </StyledButton>
            <StyledButton onClick={setToThisMonth}>
              <StyledTypo sx={{ fontSize: 12 }}> This Month</StyledTypo>
            </StyledButton>
          </Box>
          {/* </StyledButtonGroup> */}
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setCustomDateRangeState([item['selection']])}
            moveRangeOnFirstSelection={false}
            ranges={customDateRangeState}
            rangeColors={['#278BFC']}
          />
        </Box>
      </Popover>
    </Box>
  );
};
