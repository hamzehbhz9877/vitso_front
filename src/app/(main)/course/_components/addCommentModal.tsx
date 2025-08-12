'use client'

import React from 'react'
import { Form, Formik } from "formik"
import TextArea from "@/components/input/textArea"

type AddCommentModalProps = {
    isPending: boolean
    onClose: () => void
    onSubmit: (values: { message: string }) => Promise<void>
    label?: string
}

export default function AddCommentModal({ isPending, onClose, onSubmit, label = "ثبت دیدگاه" }: AddCommentModalProps) {
    return (
        <dialog id="add-comment-modal" className="modal">
            <div className="modal-box max-w-xl">
                <h3 className="font-bold text-lg mb-4">{label}</h3>
                <Formik
                    initialValues={{ message: '' }}
                    onSubmit={async (values, actions) => {
                        try {
                            await onSubmit(values)
                            actions.resetForm()
                            onClose()
                        } catch {
                            // هندل خطا اگر لازم بود
                        }
                    }}
                    validate={values => {
                        const errors: any = {}
                        if (!values.message) errors.message = 'متن دیدگاه الزامی است'
                        return errors
                    }}
                >
                    {() => (
                        <Form className="space-y-4">
                            <TextArea name="message" label="توضیحات" rows={4} />
                            <div className="modal-action mt-6 flex justify-end gap-2">
                                <button type="submit" className="btn btn-success" disabled={isPending}>
                                    ثبت دیدگاه
                                </button>
                                <button type="button" className="btn btn-ghost" onClick={onClose}>
                                    بستن
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
