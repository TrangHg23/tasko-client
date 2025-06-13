import { motion, AnimatePresence, easeOut } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
  transition: { duration: 0.25, ease: easeOut }
};


export default function AuthForm() {
const location = useLocation();
const mode = location.pathname === '/signup' ? 'register' : 'login';

  return (
    <Box>
      <AnimatePresence mode="wait">
        {
          mode === 'login' ? (
            <motion.div
              key='login'
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={variants.transition}
            >
              <LoginForm/>
            </motion.div>

          ) : (
            <motion.div
              key='register'
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={variants.transition}
            >
              <RegisterForm/>
            </motion.div>
          )
        }
      </AnimatePresence>
    </Box> 
  )
}