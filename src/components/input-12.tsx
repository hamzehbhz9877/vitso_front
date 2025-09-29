import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {cn, formatFileSize, getExtensionsFromAccept} from "@/lib/utils"
import {ImageIcon, Upload, XCircleIcon} from "lucide-react"
import Image from "next/image"
import Dropzone from "react-dropzone"
import {ErrorMessage} from "formik"
import React, {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {showToast} from "@/components/react-toastify/react-toastify"

export default function UploadImageCard({
                                            onChange,
                                            title = "تصویر",
                                            name,
                                            defaultData,
                                            hasLink = false,
                                            dropzoneOptions
                                        }: {
    onChange?: (file: File | string) => void
    title?: string
    name?: string
    hasLink?: boolean
    defaultData?: any
    dropzoneOptions?: Partial<import("react-dropzone").DropzoneOptions> & { type?: string }
}) {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileType, setFileType] = useState<"image" | "video" | null>(null)

    const defaultFormat = {"image/png": [".png", ".jpg", ".jpeg", ".webp"]}

    useEffect(() => {
        if (defaultData) {
            if (defaultData instanceof File) {
                const objectUrl = URL.createObjectURL(defaultData)
                setPreview(objectUrl)
                if (defaultData.type.startsWith("video")) {
                    setFileType("video")
                } else if (defaultData.type.startsWith("image")) {
                    setFileType("image")
                }
                return () => URL.revokeObjectURL(objectUrl)
            } else if (typeof defaultData === "string") {
                setPreview(defaultData)
                if (defaultData.endsWith(".mp4") || defaultData.includes("video")) {
                    setFileType("video")
                } else {
                    setFileType("image")
                }
            }
        }
    }, [defaultData])


    const accept = dropzoneOptions?.accept ?? defaultFormat
    const maxSizeText = formatFileSize(dropzoneOptions?.maxSize ?? 5 * 1024 * 1024)
    const helptxt = getExtensionsFromAccept(accept).map(ext => ext.toUpperCase()).join(" یا ")

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {hasLink ? (
                    <button type="button" className="text-xs hover:underline">
                        افزودن از طریق لینک
                    </button>
                ) : null}
            </CardHeader>

            <CardContent>
                {preview ? (
                    <div className={`relative ${fileType==='video'?"":"aspect-square"}`}>
                        <button
                            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                            onClick={() => {
                                setPreview(null)
                                setFileType(null)
                                onChange?.("")
                            }}
                        >
                            <XCircleIcon className="h-6 w-6 fill-black text-white dark:text-neutral-500 cursor-pointer"/>
                        </button>

                        {fileType === "image" ? (
                            <Image
                                src={preview}
                                height={500}
                                width={500}
                                alt=""
                                className="border object-contain border-neutral-200 w-full h-full rounded-md dark:border-neutral-800"
                            />
                        ) : fileType === "video" ? (
                            <video
                                src={preview}
                                controls
                                className="border object-contain border-neutral-200 w-full h-auto rounded-md dark:border-neutral-800"
                            />
                        ) : null}
                    </div>
                ) : (
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            const file = acceptedFiles[0]
                            if (file) {
                                const fileUrl = URL.createObjectURL(file)
                                setPreview(fileUrl)
                                if (file.type.startsWith("video")) {
                                    setFileType("video")
                                } else {
                                    setFileType("image")
                                }
                                onChange?.(file)
                            }
                        }}
                        onDropRejected={(fileRejections) => {
                            const reason = fileRejections[0].errors[0]
                            if (reason.code === "file-too-large") {
                                showToast("error", `حجم فایل باید کمتر از ${maxSizeText.unit + " " + maxSizeText.value} باشد.`)
                            } else if (reason.code === "file-invalid-type") {
                                showToast("error", `فرمت فایل باید ${helptxt} باشد.`)
                            } else {
                                showToast("error", reason.message)
                            }
                        }}
                        accept={defaultFormat}
                        maxSize={5 * 1024 * 1024}
                        maxFiles={1}
                        {...dropzoneOptions}
                    >
                        {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border border-dashed flex flex-col items-center justify-center rounded-md p-6 text-center cursor-pointer",
                                    "border-neutral-700",
                                    isDragActive && isDragAccept && "border-blue-500 bg-neutral-900",
                                    isDragActive && isDragReject && "border-red-500 bg-neutral-900"
                                )}
                            >
                                <input {...getInputProps()} />
                                <ImageIcon className="h-8 w-8 mb-2 opacity-60"/>
                                <p className="text-sm font-medium">فایل را رها کنید</p>
                                <p className="text-xs opacity-60">
                                    {helptxt}
                                    <span className="px-1">
                                        (حداکثر <span className="underline">{maxSizeText.value}</span>{" "}
                                        <span>{maxSizeText.unit}</span> )
                                    </span>
                                </p>
                                <Button variant="default" className="mt-2 text-sm" type="button">
                                    انتخاب فایل
                                    <Upload/>
                                </Button>
                            </div>
                        )}
                    </Dropzone>
                )}

                {name && (
                    <ErrorMessage name={name} className="text-xs text-red-500 mt-1" component="div"/>
                )}
            </CardContent>
        </Card>
    )
}
