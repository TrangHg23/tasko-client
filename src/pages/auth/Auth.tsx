import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '@components/common/LoadingSpinner';
import LoginForm from '@components/auth/LoginForm';
import { useLocation } from 'react-router';

const RegisterForm = lazy(() => import('@components/auth/RegisterForm'));
const ForgotPasswordForm = lazy(() => import('@components/auth/ForgotPassword'));
const ResetPasswordForm = lazy(() => import('@components/auth/ResetPassword'));

const variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
  transition: { duration: 0.25, ease: easeOut },
};

export default function Auth() {
  const { pathname } = useLocation();

  const mode = (() => {
    if (pathname.includes('login')) return 'login';
    if (pathname.includes('signup')) return 'signup';
    if (pathname.includes('forgot-password')) return 'forgot';
    if (pathname.includes('reset-password')) return 'reset';
    return 'login';
  })();

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <RegisterForm />
          </Suspense>
        );
      case 'forgot':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPasswordForm />
          </Suspense>
        );
      case 'reset':
        return (
          <Suspense fallback={<LoadingSpinner/>}>
            <ResetPasswordForm/>
          </Suspense>
        )
      
      default:
        return <LoginForm />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        minHeight: 400,
        mx: 'auto',
        mt: { xs: 2, md: 3 },
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={variants.transition}
        >
          {renderForm()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
