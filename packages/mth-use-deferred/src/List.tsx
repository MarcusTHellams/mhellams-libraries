import {
  Button,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';
import { useState } from 'react';

;

type ListProps = {
  allowDelete: () => Promise<boolean>;
};

const data = ['Task 1', 'Task 2', 'Task 3'];

const List = ({ allowDelete }: ListProps) => {
  const [tasks, setTasks] = useState(data);

  const handleRemove = async (task: string) => {
    const canDelete = await allowDelete();
    if (!canDelete) return;

    const newTasks = tasks.filter((innerTask) => innerTask !== task);
    setTasks(newTasks);
  };

  return (
    <UnorderedList>
      {tasks.map((task, i) => (
        <ListItem key={i} style={{ marginBottom: 10 }}>
          <span>{task}</span>
          <Button style={{ marginLeft: 10 }} onClick={() => handleRemove(task)}>
            Remove
          </Button>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default List;
