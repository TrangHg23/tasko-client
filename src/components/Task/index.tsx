import type { ITask } from '@app-types/task';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Checkbox, Divider, ListItem, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

function TaskItem({ ...task }: ITask) {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleChange = () => {
    setChecked(true);
    setTimeout(() => setVisible(false), 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <ListItem sx={{ py: 0.5 }}>
              <Checkbox
                icon={<RadioButtonUnchecked />}
                checked={checked}
                checkedIcon={<CheckCircle sx={{ color: 'success.main' }} />}
                onChange={handleChange}
                slotProps={{
                  input: {
                    'aria-label': 'controlled',
                  },
                }}
              />
              <Typography>{task.title}</Typography>
            </ListItem>
            <Divider />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskItem;
