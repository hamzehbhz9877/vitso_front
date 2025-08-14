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
import {RequestDeleteCategory} from "@/services/Category";
import {Button} from "@/components/ui/button";

const DeleteCategory = ({id, name}: { id: string, name: string }) => {

    const queryClient = useQueryClient();
    const {closeModal} = useModal()

    const {mutate: deleteCategory, isPending} = useMutation({
        mutationFn: RequestDeleteCategory, onSettled: async (_, error) => {
            if (!error) {
                await queryClient.invalidateQueries({queryKey: ["subcategories"]})
                closeModal()

            }
        }
    })

    return (
        <DialogContent>
            <DialogHeader>
               

                <DialogTitle> حذف زیر دسته بندی</DialogTitle>
                <DialogDescription>آیا میخواید زیر دسته بندی {name} را حذف کنید?</DialogDescription>

            </DialogHeader>
    
            
                <div>
                    <div className={"flex justify-end gap-[10px] mt-[20px]"}>
                        <Button type="button" onClick={() => closeModal()} variant="outline">
                            بستن
                        </Button>
                        <Button  isPending={isPending}  disabled={isPending} onClick={(e) => {
                            e.stopPropagation()
                            deleteCategory(id)
                        }}>
                            حذف
                        </Button>
                    </div>
                </div>
            
        </DialogContent>
    );
};

export default DeleteCategory;
