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



export default function Leadtable() {

    const [leads, setLeads] = useState<Cliente[]>([]);
    useEffect(() => {
        const dados = listarClientes().then((data) => setLeads(data));
    },[leads])
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
                {leads.map(({ nome, email, telefone, preferencias, impedimento, sugestao }, index) => (
                    <TableRow className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} key={index}>
                        <TableCell className="p-[5px]">{nome}</TableCell>
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