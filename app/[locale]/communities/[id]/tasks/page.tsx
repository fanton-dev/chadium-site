import { Card } from '@/components/ui/card';
import { TaskCard } from '@/components/server/task-card/task-card';
import { getCommunity } from '@/components/api-client/community';

interface TasksPageProps {
  params: { id: string };
}

export default async function TasksPage({ params }: TasksPageProps) {
  const community = await getCommunity(params.id);
  const tasks = [
    {
      id: 1,
      title: 'Смяна на дограма в общите помещения',
      tasks: [
        'Намиране на фирма за смяна на дограма',
        'Смяна на дограма във фоайето',
        'Смяна на дограма по стълбите',
      ],
      assignees: [
        {
          id: 1,
          name: 'Иван Иванов',
          avatar: 'https://fmicodes.com/assets/icons/fmicodes.svg',
        },
        {
          id: 2,
          name: 'Петър Петров',
          avatar: 'https://fmicodes.com/assets/icons/fmicodes.svg',
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Card className="grid min-h-[80vh] my-auto w-5/6 md:w-2/3 flex-col items-center justify-center xl:grid-cols-2 xl:px-0 overflow-hidden">
        <div className="hidden xl:flex relative h-full flex-col text-white bg-zinc-900">
          <img
            src={community.image}
            alt={community.name}
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          />
        </div>

        <div className="p-8 h-full">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </Card>
    </div>
  );
}
