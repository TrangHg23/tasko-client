import InboxIcon from '@mui/icons-material/Inbox';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const navItems = [
  { label: 'Inbox', icon: <InboxIcon />, to: '/inbox' },
  { label: 'Today', icon: <TodayIcon />, to: '/today' },
  { label: 'Upcoming', icon: <CalendarMonthIcon />, to: '/upcoming' },
  { label: 'Completed', icon: <CheckCircleOutlineIcon />, to: '/completed' },
];
