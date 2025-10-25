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
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { MoreHorizontalIcon } from 'lucide-react';
import { api } from "../service/api";
import type { Cliente } from "../types/Cliente";

function truncateText(text: string, maxLength = 30) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export async function listarClientes() {
  const { data } = await api.get("/clientes");
  return data as Cliente[];
}

const leadsTeste = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@gmail.com",
    telefone: "(11) 91234-5678",
    preferencias: "Interesse em imóveis residenciais",
    impedimento: "Nenhuma",
    sugestao: "Agendar visita",
    produto: "Casa de 3 quartos"
  },
  {
    id: 2,
    nome: "Fernanda Costa",
    email: "fernanda.costa@yahoo.com",
    telefone: "(21) 99876-5432",
    preferencias: "Busca por apartamento próximo ao metrô",
    impedimento: "Orçamento limitado",
    sugestao: "Enviar opções econômicas",
    produto: "Casa de 3 quartos"
  },
  {
    id: 3,
    nome: "João Pereira",
    email: "joao.pereira@hotmail.com",
    telefone: "(31) 98765-4321",
    preferencias: "Interesse em imóveis comerciais",
    impedimento: "Prefere contrato flexível",
    sugestao: "Apresentar imóveis com contrato flexível",
    produto: "Casa de 3 quartos"
  },
  {
    id: 4,
    nome: "Mariana Souza",
    email: "mariana.souza@gmail.com",
    telefone: "(41) 91234-8765",
    preferencias: "Apartamento com área de lazer",
    impedimento: "Não quer andar alto",
    sugestao: "Filtrar apartamentos até 5º andar",
    produto: "Casa de 3 quartos"
  },
  {
    id: 5,
    nome: "Rafael Lima",
    email: "rafael.lima@hotmail.com",
    telefone: "(51) 97654-3210",
    preferencias: "Interesse em imóveis de luxo",
    impedimento: "Atraso na aprovação do financiamento",
    sugestao: "Agendar reunião para análise de crédito",
    produto: "Casa de 3 quartos"
  },
  {
    id: 6,
    nome: "Patrícia Almeida",
    email: "patricia.almeida@gmail.com",
    telefone: "(61) 99812-3456",
    preferencias: "Casa com quintal grande",
    impedimento: "Prefere bairro específico",
    sugestao: "Enviar opções de casas no bairro desejado",
    produto: "Casa de 3 quartos"
  },
  {
    id: 7,
    nome: "Lucas Fernandes",
    email: "lucas.fernandes@yahoo.com",
    telefone: "(71) 91234-9876",
    preferencias: "Interesse em imóveis para investimento",
    impedimento: "Quer retorno rápido",
    sugestao: "Apresentar imóveis com potencial de valorização",
    produto: "Casa de 3 quartos"
  },
  {
    id: 8,
    nome: "Juliana Martins",
    email: "juliana.martins@gmail.com",
    telefone: "(81) 98765-2109",
    preferencias: "Apartamento próximo à escola",
    impedimento: "Prefere prédio novo",
    sugestao: "Filtrar apartamentos novos perto de escolas",
    produto: "Casa de 3 quartos"
  },
  {
    id: 9,
    nome: "Thiago Rocha",
    email: "thiago.rocha@hotmail.com",
    telefone: "(11) 96543-2108",
    preferencias: "Busca por imóveis compactos",
    impedimento: "Não quer reformas",
    sugestao: "Enviar imóveis prontos para morar",
    produto: "Casa de 3 quartos"
  },
  {
    id: 10,
    nome: "Camila Dias",
    email: "camila.dias@gmail.com",
    telefone: "(21) 99876-1234",
    preferencias: "Casa com varanda e vista panorâmica",
    impedimento: "Prefere financiamento próprio",
    sugestao: "Agendar visita e discutir financiamento",
    produto: "Casa de 3 quartos"
  }
];


export default function Leadtable() {

    const [leads, setLeads] = useState<Cliente[]>([]);
    useEffect(() => {
        const dados = listarClientes().then((data) => setLeads(data));
    },[leads])
    const [open, setOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');

    const handleClick = (content: string) => {
        setSelectedContent(content);
        setOpen(true);
    };

    return (
    <div className="max-w">
        <Table>
            <TableHeader>
                <TableRow className="roboto-bold text-lg">
                    <TableHead >Cliente</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Produtos</TableHead>
                    <TableHead className="">Preferências</TableHead>
                    <TableHead className="">Divergências</TableHead>
                    <TableHead className="">Sugestão</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {leadsTeste.map(({ nome, email, telefone, preferencias, impedimento, produto, sugestao }, index) => (
                    <TableRow className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} key={index}>
                        <TableCell className="p-[5px]">{nome}</TableCell>
                        <TableCell className="p-[5px]">{email}</TableCell>
                        <TableCell className="p-[5px]">{telefone}</TableCell>
                        <TableCell className="p-[5px]">{produto}</TableCell>
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
                                onClick={() => handleClick(impedimento)}
                            >
                                <span>{truncateText(impedimento)}</span>
                                <MoreHorizontalIcon className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </button>
                        </TableCell>
                        <TableCell><button
                            className="p-[5px] group flex items-center space-x-2 cursor-pointer  rounded-xl hover:bg-[#5daaf6] transition-colors duration-200"
                            onClick={() => handleClick(sugestao ?? "")}
                        >
                            <span>{truncateText(sugestao ?? "")}</span>
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