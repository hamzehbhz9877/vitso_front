'use client'

import React from 'react'
import { Form, Formik } from "formik"
import TextArea from "@/components/input/textArea"

type CommentsUsers = {
    id: string
    fullName: string
    message: string
}

type ReplyModalProps = {
    replyTarget: CommentsUsers | null
    isSubmitting: boolean
    onClose: () => void
    onSubmit: (values: { message: string }) => Promise<void>
}

export default function ReplyModal({ replyTarget, isSubmitting, onClose, onSubmit }: ReplyModalProps) {
    if (!replyTarget) return null

    return (
        <dialog id="reply-modal" className="modal" open>
            <div className="modal-box max-w-xl">
                <h3 className="font-bold text-lg mb-4">ارسال پاسخ</h3>
                <div className="mb-4 p-3 bg-base-200 rounded text-sm">
                    <p><strong>پاسخ به:</strong> {replyTarget.fullName}</p>
                    <p className="mt-1 text-gray-600">{replyTarget.message}</p>
                </div>
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
                        if (!values.message) errors.message = 'متن پاسخ الزامی است'
                        return errors
                    }}
                >
                    {(formikProps) => (
                        <Form className="space-y-4">
                            <TextArea name="message" label="متن پاسخ" rows={4} />
                            <div className="modal-action mt-6 flex justify-end gap-2">
                                <button type="submit" className="btn btn-success" disabled={formikProps.isSubmitting || isSubmitting}>
                                    ارسال پاسخ
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
