'use client'

import React from 'react';
import {IoMdClose} from "react-icons/io";
import {ModalBody, ModalHeader} from "@/components/modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {DeleteUsers} from "@/services/User";
import {Button} from "@/components/ui/button";

const DeleteUser = ({id, name}: { id: string, name: string }) => {

    const queryClient = useQueryClient();
    const {closeModal} = useModal()

    const {mutate: deleteAddress, isPending} = useMutation({
        mutationFn: DeleteUsers, onSettled: async (_, error) => {
            if (!error) {
                await queryClient.invalidateQueries({queryKey: ["users"]})
                closeModal()

            }
        }
    })

    return (
        <div>
            <ModalHeader>
                <div className={"flex justify-between items-center"}>
                    <span className={"text-[18px] text-[#333333] font-bold"}>
                       حذف کاربر
                    </span>
                    <div className="cursor-pointer">
                        <IoMdClose onClick={closeModal} size="24"/>
                    </div>
                </div>
            </ModalHeader>
            <hr className={"border-[#ABAFB1] my-[20px]"}/>
            <ModalBody>
                <div>
                    <p>آیا میخواید کاربر {name} را حذف کنید?</p>
                    <div className={"flex justify-end gap-[10px] mt-[20px]"}>
                        <Button type="button" onClick={() => closeModal()} variant={"redOutline"}>
                            بستن
                        </Button>
                        <Button variant={"red"} isPending={isPending}  disabled={isPending} onClick={(e) => {
                            e.stopPropagation()
                            deleteAddress(id)
                        }}>
                            حذف
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </div>
    );
};

export default DeleteUser;
