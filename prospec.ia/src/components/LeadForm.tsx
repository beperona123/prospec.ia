"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../service/api";
import type { Cliente } from "../types/Cliente";

// Criar cliente
export async function cadastrarCliente(cliente: Cliente) {
  const { data } = await api.post("/clientes", cliente);
  return data;
}
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    nome: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
    email: z
        .string()
        .min(2, { message: "E-mail deve ter pelo menos 2 caracteres." })
        .email({ message: "E-mail inválido." }),
    telefone: z.string().min(2, { message: "Telefone deve ter pelo menos 2 caracteres." }),
    preferencias: z.string().min(2, { message: "Preferências deve ter pelo menos 2 caracteres." }),
    divergencias: z.string().min(2, { message: "Divergências deve ter pelo menos 2 caracteres." }),
})

export default function LeadForm() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            preferencias: "",
            divergencias: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="p-10">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome completo" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe seu nome completo.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu e-mail" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe seu endereço de e-mail.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu telefone" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe seu número de telefone.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="flex flex-col">
                            <FormField
                                control={form.control}
                                name="preferencias"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferências</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Suas preferências" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe suas preferências.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="divergencias"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Divergências</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Suas divergências" {...field} />
                                        </FormControl>
                                        <FormDescription>Informe suas divergências.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </div>


                    <Button className="p-[5px] group flex items-center space-x-2 cursor-pointer  rounded-xl hover:bg-[#5daaf6] transition-colors duration-200 w-full" type="submit">Enviar</Button>
                </form>
            </Form>
        </div>

    )
}