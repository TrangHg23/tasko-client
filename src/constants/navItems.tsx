import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const navItems = [
  { label: 'Inbox', icon: <InboxIcon />, to: '/inbox', key: 'inbox', showCount: true },
  { label: 'Today', icon: <TodayIcon />, to: '/today', key: 'today', showCount: true },
  {
    label: 'Upcoming',
    icon: <CalendarMonthIcon />,
    to: '/upcoming',
    key: 'upcoming',
    showCount: false,
  },
  {
    label: 'Completed',
    icon: <CheckCircleOutlineIcon />,
    to: '/completed',
    key: 'completed',
    showCount: false,
  },
];
