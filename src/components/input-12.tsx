"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import React, {CSSProperties, useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import {ErrorMessage, useField} from "formik";
import {HtmlAttributes} from "csstype";

const ImagePreview = ({
  url,
  onRemove,
                          className
}: {
  url: string;
  onRemove: () => void;
    className ?: string
}) => (
  <div className={cn("relative aspect-square")}>
    <button
      className={cn("absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",className==="rounded-full"&&"top-5 right-9")}
      onClick={onRemove}
    >
      <XCircleIcon className="h-6 w-6  fill-black text-white dark:text-neutral-900" />
    </button>
    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className={cn("border object-contain border-neutral-200 h-full w-full rounded-md dark:border-neutral-800",className)}
    />
  </div>
);

export default function InputDemo({
                                      onChange,
                                      title,
    name,
     defaultData,className
                                  }: {
    onChange?: (file: File|string) => void;
    title?: string;
    name?: string;
    defaultData ?: any
    className ?: string
}) {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [field, meta] = useField(name as string);

    useEffect(() => {
        if(defaultData)
        setProfilePicture(defaultData)
    }, [defaultData]);

    return (
        <div className={"upload-image"}>
            <Label htmlFor="profile" className={"custom-input__title dark:text-white"}>{title}</Label>
            <div className="mt-1 w-full">
                {profilePicture ? (
                    <ImagePreview
                        className={className}
                        url={profilePicture}
                        onRemove={() => {
                            setProfilePicture(null)
                            onChange?.("")
                        }
                    }
                    />
                ) : (
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            const file = acceptedFiles[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setProfilePicture(imageUrl);

                                // 🔔 notify parent
                                onChange?.(file);
                            }
                        }}
                        accept={{
                            "image/png": [".png", ".jpg", ".jpeg", ".webp"],
                        }}
                        maxFiles={1}
                    >
                        {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              isDragAccept,
                              isDragReject,
                          }) => (
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-none" +
                                    " focus:border-neutral-900 dark:focus:border-neutral-50",
                                    {
                                        "border-neutral-900 bg-neutral-100 dark:border-neutral-50 dark:bg-neutral-800":
                                            isDragActive && isDragAccept,
                                        "border-red-500 bg-red-500/20 dark:border-red-900 dark:bg-red-900/20":
                                            isDragActive && isDragReject,
                                    },
                                    className,
                                    meta.touched && meta.error && name && 'input-field--error'
                                )}
                            >
                                <input {...getInputProps()} id="profile" />
                                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
                            </div>
                        )}
                    </Dropzone>
                )}
                {
                    name?
                <ErrorMessage name={name} className="validation-error" component="div" />:""}
            </div>
        </div>
    );
}

