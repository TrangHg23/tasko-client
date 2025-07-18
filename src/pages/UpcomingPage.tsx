import DatePickerButton from '@components/upcoming/DatePickerButton';
import HorizontalDateList from '@components/upcoming/HorizontalDateList';
import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { startOfToday } from 'date-fns';
import { useState } from 'react';

function UpcomingPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  return (
    <div>
      <Box alignItems="center" gap={2} mb={2}>
        <DatePickerButton selectedDate={selectedDate} onChange={setSelectedDate} />
        <HorizontalDateList selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </Box>
      <Divider />
    </div>
  );
}

export default UpcomingPage;
