import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Check, List, ListCheck, Plus, Sigma, SquarePen, Trash, X} from 'lucide-react';
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {ReactNode} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

type TaskProps = {
    id: number;
    task: string;
    completed: boolean;
}

type PositiveNegativeProps = {
    positive: string;
    negative: string;
}

type AlertProps = {
    children: ReactNode;
    title: string;
    description: string;
}

type DialogProps = {
    body: ReactNode;
} & AlertProps

const TheraAlertDialog = ({children, title, description, positive, negative}: AlertProps & PositiveNegativeProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild={true}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{negative}</AlertDialogCancel>
                    <AlertDialogAction>{positive}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const TheraDialog = ({title, description, children, body}: DialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {body}
            </DialogContent>
        </Dialog>
    )
}


const App = () => {


    const tasks = [
        {
            id: 0,
            task: "Estudar React",
            completed: true
        },
        {
            id: 1,
            task: "Estudar Typescript",
            completed: true,
        },
        {
            id: 2,
            task: "Estudar Next.js",
            completed: false
        },
    ]

    const completedTasks = tasks.filter(t => t.completed).length

    function render(tasks: Array<TaskProps>) {
        return tasks.map((t,) => {
            return (
                // style={ ? {backgroundColor: "green"} : {backgroundColor: "red"}}
                <div key={t.id} className="h-14 flex justify-between items-center border-t-1">
                    <div className={`w-1 h-full ${t.completed ? "bg-green-300" : "bg-red-300"}`}/>
                    <p className="flex-1 px-2">{t.task}</p>
                    <div className="flex items-center gap-2">
                        <TheraDialog
                            title={`Editar tarefa: ${t.task}`}
                            description={"Você está editando a tarefa"}
                            body={
                                <div className="flex gap-2">
                                    <Input placeholder="Nome da tarefa" defaultValue={t.task}></Input>
                                    <Button className="cursor-pointer">Editar</Button>
                                </div>
                            }>
                            <SquarePen size={18} className="cursor-pointer"/>
                        </TheraDialog>
                        <TheraAlertDialog
                            title="Excluir tarefa"
                            description={`Esta ação irá remover permanentemente a task ${t.task}`}
                            negative="Cancelar"
                            positive="Excluir">
                            <Trash size={18} className="cursor-pointer"/>
                        </TheraAlertDialog>
                    </div>
                </div>
            )
        })
    }

    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-100">
            <Card className="w-lg">
                <CardHeader className="flex gap-2">
                    <Input placeholder={"Adicionar tarefa"}/>
                    <Button className="cursor-pointer">
                        <Plus/> Cadastrar
                    </Button>
                </CardHeader>

                <CardContent>
                    <Separator className="mb-4"/>

                    <div className="flex gap-2">
                        <Badge className="cursor-pointer" variant="default"><List/> Todas</Badge>
                        <Badge className="cursor-pointer" variant="outline"><X/> Não finalizadas</Badge>
                        <Badge className="cursor-pointer" variant="outline"><Check/> Concluídas</Badge>
                    </div>

                    <div className="mt-4 border-b-1">
                        {render(tasks)}
                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="flex gap-2 items-center">
                            <ListCheck size={18}/>
                            <p className="text-xs">Tarefas concluídas ({completedTasks}/{tasks.length})</p>
                        </div>

                        <TheraAlertDialog
                            title="Tem certeza que deseja excluir as tarefas concluídas?"
                            description={`Esta ação irá remover ${completedTasks} tarefas`}
                            negative="Cancelar"
                            positive="Continuar">
                            <Button className="cursor-pointer text-xs h-8" variant="outline"><Trash/> Limpar tarefas
                                concluídas</Button>
                        </TheraAlertDialog>
                    </div>

                    <Progress className="mt-4" value={(completedTasks / tasks.length) * 100}/>

                    <div className="flex gap-2 justify-end mt-2 items-center">
                        <Sigma size={18}/> <p>{tasks.length} tarefas totais</p>
                    </div>

                </CardContent>

            </Card>

        </main>
    )
}

export default App