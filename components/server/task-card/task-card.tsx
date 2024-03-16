import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TaskCardProps {
  task: {
    title: string;
    tasks: string[];
    assignees: {
      id: number;
      name: string;
      avatar: string;
    }[];
  };
}
export async function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="w-full transition hover:shadow-xl">
      <CardHeader className="relative p-0 w-full space-y-0 rounded-t-xl justify-center items-center flex p-3">
        <h2 className="text-lg font-bold text-ellipsis overflow-hidden">
          {task.title}
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2 p-3">
        <div>
          <RadioGroup defaultValue="comfortable">
            {task.tasks.map((task, index) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={task} id={`${task}${index}`} />
                <Label htmlFor="r1">{task}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        Assignees
        <div className="flex flex-row gap-1">
          {task.assignees.map((assignee) => (
            <Avatar key={assignee.id}>
              <AvatarImage
                src={assignee.avatar}
                alt={assignee.name}
                className="w-8 h-8 rounded-full"
              />
              <AvatarFallback>{assignee.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
