import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import "../index.css"
import "../Fonts.css"
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MoreHorizontalIcon } from 'lucide-react';

function truncateText(text: string, maxLength = 30) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const leads = [
    {
        id: 1,
        name: "Carlos Silva",
        email: "carlos.silva@gmail.com",
        telefone: "(11) 91234-5678",
        preferencias: "Interesse em imóveis residenciais",
        divergencias: "Nenhuma",
        sugestao: "Agendar visita"
    },
    {
        id: 2,
        name: "Fernanda Costa",
        email: "fernanda.costa@yahoo.com",
        telefone: "(21) 99876-5432",
        preferencias: "Busca por apartamento próximo ao metrô",
        divergencias: "Orçamento limitado",
        sugestao: "Enviar opções econômicas"
    },
    {
        id: 3,
        name: "João Pereira",
        email: "joao.pereira@hotmail.com",
        telefone: "(31) 98765-4321",
        preferencias: "Interesse em imóveis comerciais",
        divergencias: "Prefere contrato flexível",
        sugestao: "Apresentar imóveis com contrato flexível"
    },
    {
        id: 4,
        name: "Mariana Souza",
        email: "mariana.souza@gmail.com",
        telefone: "(41) 91234-8765",
        preferencias: "Apartamento com área de lazer",
        divergencias: "Não quer andar alto",
        sugestao: "Filtrar apartamentos até 5º andar"
    },
    {
        id: 5,
        name: "Rafael Lima",
        email: "rafael.lima@hotmail.com",
        telefone: "(51) 97654-3210",
        preferencias: "Interesse em imóveis de luxo",
        divergencias: "Atraso na aprovação do financiamento",
        sugestao: "Agendar reunião para análise de crédito"
    },
    {
        id: 6,
        name: "Patrícia Almeida",
        email: "patricia.almeida@gmail.com",
        telefone: "(61) 99812-3456",
        preferencias: "Casa com quintal grande",
        divergencias: "Prefere bairro específico",
        sugestao: "Enviar opções de casas no bairro desejado"
    },
    {
        id: 7,
        name: "Lucas Fernandes",
        email: "lucas.fernandes@yahoo.com",
        telefone: "(71) 91234-9876",
        preferencias: "Interesse em imóveis para investimento",
        divergencias: "Quer retorno rápido",
        sugestao: "Apresentar imóveis com potencial de valorização"
    },
];

export default function Leadtable() {
    const [open, setOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (content: string) => {
        setSelectedContent(content);
        setOpen(true);
    };

    return (<div className="roboto-regular">
        <Table>
            <TableHeader>
                <TableRow className="roboto-bold text-lg">
                    <TableHead >Cliente</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="">Preferências</TableHead>
                    <TableHead className="">Divergências</TableHead>
                    <TableHead className="">Sugestão</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map(({ id, name, email, telefone, preferencias, divergencias, sugestao }, index) => (
                    <TableRow className={id % 2 === 0 ? "bg-white" : "bg-gray-100"} key={id}>
                        <TableCell className="p-[5px]">{name}</TableCell>
                        <TableCell className="p-[5px]">{email}</TableCell>
                        <TableCell className="p-[5px]">{telefone}</TableCell>
                        <TableCell>
                            <button
                                className="p-[5px] group flex items-center space-x-2 cursor-pointer rounded-xl hover:bg-[#5daaf6] transition-colors duration-200"
                                onClick={() => handleClick(preferencias)}
                            >
                                <span>{truncateText(preferencias)}</span>
                                <MoreHorizontalIcon className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </button>
                        </TableCell>
                        <TableCell>
                            <button
                                className="p-[5px] group flex items-center space-x-2 cursor-pointer rounded-xl hover:bg-[#5daaf6] transition-colors duration-200"
                                onClick={() => handleClick(divergencias)}
                            >
                                <span>{truncateText(divergencias)}</span>
                                <MoreHorizontalIcon className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </button>
                        </TableCell>
                        <TableCell><button
                            className="p-[5px] group flex items-center space-x-2 cursor-pointer  rounded-xl hover:bg-[#5daaf6] transition-colors duration-200"
                            onClick={() => handleClick(sugestao)}
                        >
                            <span>{truncateText(sugestao)}</span>
                            <MoreHorizontalIcon className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="hidden" />
            </DialogTrigger>
            <DialogContent className="bg-white border-none rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out">
                <DialogTitle>Conteúdo Completo</DialogTitle>
                <p>{selectedContent}</p>
            </DialogContent>
        </Dialog>
    </div>)
}