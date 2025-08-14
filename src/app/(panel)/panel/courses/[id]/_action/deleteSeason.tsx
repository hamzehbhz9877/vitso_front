'use client'

import React from 'react';
import {IoMdClose} from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {DeleteSeasons} from "@/services/Season";
import {Button} from "@/components/ui/button";

const DeleteSeason = ({id, name}: { id: string, name: string }) => {

    const queryClient = useQueryClient();
    const {closeModal} = useModal()

    const {mutate, isPending} = useMutation({
        mutationFn: DeleteSeasons, onSettled: async (_, error) => {
            if (!error) {
                await queryClient.invalidateQueries({queryKey: ["seasons"]})
                closeModal()
            }
        }
    })

    return (
        <DialogContent>
            <DialogHeader>
               

                <DialogTitle>حذف فصل</DialogTitle>
                <DialogDescription>آیا میخواید فصل {name} را حذف کنید?</DialogDescription>

            </DialogHeader>
    
            
                <div>
                    <div className={"flex justify-end gap-[10px] mt-[20px]"}>
                        <Button type="button" onClick={() => closeModal()} variant="outline">
                            بستن
                        </Button>
                        <Button  isPending={isPending}  disabled={isPending} onClick={(e) => {
                            e.stopPropagation()
                            mutate(id)
                        }}>
                            حذف
                        </Button>
                    </div>
                </div>
            
        </DialogContent>
    );
};

export default DeleteSeason;
