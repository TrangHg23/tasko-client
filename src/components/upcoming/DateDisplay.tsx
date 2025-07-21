import { Typography } from '@mui/material';
import { format, isToday, isTomorrow } from 'date-fns';

export const DateDisplay = ({ date }: { date: Date }) => {
  const parts: string[] = [];

  parts.push(format(date, 'dd MMM'));

  if (isToday(date)) {
    parts.push('Today');
  } else if (isTomorrow(date)) {
    parts.push('Tomorrow');
  }

  parts.push(format(date, 'EEEE'));

  return (
    <Typography fontWeight={600} color="#808080">
      {parts.map((part, i) => (
        <span key={i}>
          {i !== 0 && <span style={{ margin: '0 4px' }}>·</span>}
          {part}
        </span>
      ))}
    </Typography>
  );
};
