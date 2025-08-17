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
import useModal from "@/context/modal/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {EditSeasons, GetForEditSeasons} from "@/services/Season";
import {Button} from "@/components/ui/button";
import {GetForEditCourses} from "@/services/Course";
import {useParams} from "next/navigation";

const EditSeason = ({id}:{id:string}) => {

    const {closeModal} = useModal()


    const params=useParams();

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: EditSeasons, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["seasons"]});
                closeModal();
            }
        }
    });

    const {data: course} = useQuery({
        queryFn: ()=>GetForEditCourses(params.id),
        queryKey: ["GetForEditCourses",params.id],
    })

    const {data: season} = useQuery({
        queryFn: ()=>GetForEditSeasons(id),
        queryKey: ["GetForEditSeasons",id],
    })



    const handleSubmit = (values) => mutate({id,data:values})


    return (
        <DialogContent>
            <DialogHeader>

                <DialogTitle>ویرایش فصل</DialogTitle>
            </DialogHeader>
    

            <Formik
                initialValues={getInitialValues({courseId:params.id,isEdit:true,...season?.data})}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={getValidationSchema()}
            >
                {(formikProps) => {
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
                                    ویرایش اطلاعات
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
              </DialogContent>

    );
};

export default EditSeason;