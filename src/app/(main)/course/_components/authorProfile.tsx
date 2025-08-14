import React from 'react';
import Image from "next/image";
import Link from "next/link";

const AuthorProfile = ({author:{authorName,authorAvatar,authorId}}:{author:Pick<Course, "authorName"|'authorAvatar'|'authorId'>}) => {
    return (
        <div>
            <div
                className="flex w-full bg-[#f2f6fc] dark:bg-base-200 p-[15px] box-border rounded-[10px]">
                <Image
                    loading="lazy"
                    src={authorAvatar}
                    alt="Avatar"
                    className="w-[65px] rounded-full shadow-[0px_2px_5px_#3b43591f] "
                    width="65"
                    height="65"
                />
                <div className={"flex flex-1 items-center justify-start"}>
                    <span className="p-[10px] flex items-center box-border text-[14px]">{authorName}</span>
                    {/*<div*/}
                    {/*    className="py-[10px] flex items-center text-[14px] border-r border-[#e2e8f0] pr-2.5  text-center">برنامه*/}
                    {/*    نویس*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className={"text-center mt-3"}>
                <Link href={`/author/${authorId}`} className={"btn  btn-primary"}>مشاهده پروفایل من</Link>
            </div>
        </div>
    );
};

export default AuthorProfile;