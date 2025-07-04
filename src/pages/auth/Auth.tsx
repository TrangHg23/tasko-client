import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { Box } from '@mui/material';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '@components/common/LoadingSpinner';
import LoginForm from '@components/auth/LoginForm';
import { useLocation } from 'react-router';

const variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
  transition: { duration: 0.25, ease: easeOut },
};

const RegisterForm = lazy(() => import('@components/auth/RegisterForm'));

export default function Auth() {
  const location = useLocation();
  const mode = location.pathname === '/auth/login' ? 'login' : 'signup';

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        minHeight: 400,
        mx: 'auto',
        px: 2,
      }}
    >
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <motion.div
            key="login"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={variants.transition}
          >
            <LoginForm />
          </motion.div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <motion.div
              key="signup"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={variants.transition}
            >
              <RegisterForm />
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </Box>
  );
}
