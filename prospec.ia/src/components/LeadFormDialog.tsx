import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import  LeadForm from './LeadForm.tsx';

export function LeadFormDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-lg w-full">
        <DialogTitle>Adicionar Novo Lead</DialogTitle>
        <LeadForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
