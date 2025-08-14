import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {ImageIcon, Upload, XCircleIcon} from "lucide-react"
import Image from "next/image"
import Dropzone from "react-dropzone"
import { ErrorMessage, useField } from "formik"
import React, { useEffect, useState } from "react"
import {Button} from "@/components/ui/button";

const ImagePreview = ({ url, onRemove }: { url: string; onRemove: () => void }) => (
    <div className="relative aspect-square">
        <button
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
            className="border object-contain border-neutral-200 h-50 w-50 rounded-md dark:border-neutral-800"
        />
    </div>
)

export default function UploadImageCard({
                                            onChange,
                                            title = "تصویر",
                                            name,
                                            defaultData,
                                            hasLink=false
                                        }: {
    onChange?: (file: File | string) => void
    title?: string
    name?: string
    hasLink?: boolean
    defaultData?: any
}) {
    const [preview, setPreview] = useState<string | null>(null)
    const [field, meta] = useField(name as string)

    useEffect(() => {
        if (defaultData) setPreview(defaultData)
    }, [defaultData])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {hasLink ? <button type={"button"} className="text-xs hover:underline">
                    افزودن از طریق لینک
                </button>:''}
            </CardHeader>

            <CardContent>
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
                                className={cn(
                                    "border border-dashed flex flex-col items-center justify-center rounded-md p-6 text-center cursor-pointer",
                                    " border-neutral-700",
                                    isDragActive && isDragAccept && "border-blue-500 bg-neutral-900",
                                    isDragActive && isDragReject && "border-red-500 bg-neutral-900"
                                )}
                            >
                                <input {...getInputProps()} />
                                <ImageIcon className="h-8 w-8 mb-2 opacity-60" />
                                <p className="text-sm font-medium">تصویر را رها کنید</p>
                                <p className="text-xs opacity-60">PNG یا JPG (حداکثر. 5MB)</p>
                                <Button
                                    variant={"default"}
                                    className="mt-2 text-sm"
                                    type="button"
                                >
                                    انتخاب عکس
                                    <Upload/>
                                </Button>
                            </div>
                        )}
                    </Dropzone>
                )}

                {name && (
                    <ErrorMessage
                        name={name}
                        className="text-xs text-red-500 mt-1"
                        component="div"
                    />
                )}
            </CardContent>
        </Card>
    )
}
