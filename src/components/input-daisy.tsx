import { ImageIcon, Upload, XCircleIcon } from "lucide-react"
import Image from "next/image"
import Dropzone from "react-dropzone"
import { ErrorMessage, useField } from "formik"
import React, { useEffect, useState } from "react"

const ImagePreview = ({ url, onRemove }: { url: string; onRemove: () => void }) => (
    <div className="relative w-full h-full sm:w-[190px] sm:h-[190px]">
        <button
            type="button"
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
            onClick={onRemove}
        >
            <XCircleIcon className="h-6 w-6 fill-black text-white dark:text-neutral-500 cursor-pointer" />
        </button>
        <Image
            src={url}
            height={500}
            width={500}
            alt=""
            className="border object-contain border-neutral-200 w-full h-full rounded-md dark:border-neutral-800"
        />
    </div>
)


export default function UploadImageCard({
                                            onChange,
                                            title = "تصویر",
                                            name,
                                            defaultData,hasLink
                                        }: {
    onChange?: (file: File | string) => void
    title?: string
    name?: string
    defaultData?: any
    hasLink?:boolean
}) {
    const [preview, setPreview] = useState<string | null>(null)
    const [field, meta] = useField(name as string)

    useEffect(() => {
        if (defaultData) setPreview(defaultData)
    }, [defaultData])

    return (
        <div className="card bg-base-100 shadow-lg">
            {/* Card Header */}
            <div className="card-body pb-0 flex-row items-center justify-between">
                <h2 className="card-title">{title}</h2>
                {hasLink?
                    <button
                        type="button"
                        className="text-xs hover:underline"
                    >
                        افزودن از طریق لینک
                    </button>:""}
            </div>

            {/* Card Content */}
            <div className="card-body">
                {preview ? (
                    <ImagePreview
                        url={preview}
                        onRemove={() => {
                            setPreview(null)
                            onChange?.("")
                        }}
                    />
                ) : (
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            const file = acceptedFiles[0]
                            if (file) {
                                const imageUrl = URL.createObjectURL(file)
                                setPreview(imageUrl)
                                onChange?.(file)
                            }
                        }}
                        accept={{
                            "image/png": [".png", ".jpg", ".jpeg", ".webp"]
                        }}
                        maxFiles={1}
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                            <div
                                {...getRootProps()}
                                className={`border border-dashed flex flex-col items-center justify-center rounded-md p-6 text-center cursor-pointer 
        border-neutral-700 transition
     w-full h-full sm:w-[190px] sm:h-[190px]
        ${isDragActive && isDragAccept ? "border-primary bg-base-200" : ""}
        ${isDragActive && isDragReject ? "border-error bg-base-200" : ""}   
    `}

                            >
                                <input {...getInputProps()} />
                                <ImageIcon className="h-8 w-8 mb-2 opacity-60" />
                                <p className="text-sm font-medium">تصویر را رها کنید</p>
                                <p className="text-xs opacity-60">PNG یا JPG (حداکثر 5MB)</p>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-2 gap-2"
                                >
                                    انتخاب عکس
                                    <Upload className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </Dropzone>
                )}

                {name && (
                    <ErrorMessage
                        name={name}
                        className="text-xs text-error mt-1"
                        component="div"
                    />
                )}
            </div>
        </div>
    )
}
