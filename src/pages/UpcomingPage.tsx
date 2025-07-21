import DatePickerButton from '@components/upcoming/DatePickerButton';
import HorizontalDateList from '@components/upcoming/HorizontalDateList';
import VerticalCalendar from '@components/upcoming/VerticalCalendar';

import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { startOfToday } from 'date-fns';
import { useState } from 'react';

function UpcomingPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  return (
    <div>
      <Typography variant="h1">Upcoming</Typography>
      <Box alignItems="center" gap={2} mb={2}>
        <DatePickerButton selectedDate={selectedDate} onChange={setSelectedDate} />
        <HorizontalDateList selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </Box>
      <Divider />
      <VerticalCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
    </div>
  );
}

export default UpcomingPage;
