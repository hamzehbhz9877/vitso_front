import React from 'react';
import {getValidationSchema, getInitialValues} from "./validation";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { RegisterSeasons} from "@/services/Season";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {GetForEditCourses} from "@/services/Course";

const AddSeason = () => {

    const {handleClose} = useModal();

    const params=useParams()

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: RegisterSeasons, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["seasons"]});
                handleClose()
            }
        }
    });

    const {data: course} = useQuery({
        queryFn: ()=>GetForEditCourses(params.id),
        queryKey: ["GetForEditSeason",params.id],
    })


    const handleSubmit = (values) => mutate(values)

    const rawId = params.id;
    const courseId: string | undefined = Array.isArray(rawId) ? rawId[0] : rawId;
    return (
        <DialogContent>
            <DialogHeader>

                <DialogTitle>افزودن فصل</DialogTitle>
            </DialogHeader>
    

            <Formik
                initialValues={getInitialValues({courseId})}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
            >
                {() => {
                    return (
                        <Form>
                            <>
                                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput disabled readOnly value={course?.data.title} label={"نام دوره"} name={"courseId"} type={"text"}/>
                                    <SimpleInput label={"عنوان"} name={"title"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"order"} type={"number"}/>
                                </div>

                                <Button isPending={isPending} type={"submit"} disabled={isPending}
                                        variant={"outline"}
                                >
                                    ثبت اطلاعات
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
              </DialogContent>

    );
};

export default AddSeason;