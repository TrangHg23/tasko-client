import TaskListController from '@components/Task/TaskListController';
import { useCategories } from '@hooks/useCategory';
import { useTaskDefaults, useTasks } from '@hooks/useTask';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

type CategoryParams = {
  slug: string;
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const { slug } = useParams<CategoryParams>();
  if (!slug) return null;
  const [name, id] = slug.split('~');
  const { data: tasksByCategory } = useTasks({ categoryId: id });
  const { data: categories } = useCategories();
  const defaultValues = useTaskDefaults({ context: 'category', categoryId: id });

  const currentCategory = categories?.find((category) => category.id === id);

  useEffect(() => {
    if (categories && !currentCategory) {
      navigate('/inbox', { replace: true });
    }
  }, [categories, currentCategory, navigate]);

  if (!categories || !currentCategory) return null;

  return (
    <div>
      <Typography variant="h1">{name}</Typography>
      <TaskListController
        tasks={tasksByCategory}
        defaultFormValues={defaultValues}
        showDueDate={true}
      />
    </div>
  );
}
