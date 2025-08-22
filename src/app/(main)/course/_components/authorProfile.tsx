import React from 'react';
import Image from "next/image";
import Link from "next/link";
import DonationModal from "@/app/(main)/course/_components/modal/donationModal";
import {Heart, User, User2} from "lucide-react";
import useAuth from "@/context/authentication/useAuth";
import {useRouter} from "next/navigation";

const AuthorProfile = ({author: {authorName, authorAvatar, authorId, id}}: {
    author: Pick<Course, "authorName" | 'authorAvatar' | 'authorId' | 'id'>
}) => {

    const {user} = useAuth();

    const router = useRouter();

    return (
        <div>
            <div
                className="flex w-full bg-[#f2f6fc] dark:bg-base-200 p-[15px] box-border rounded-[10px]">
                <Image
                    loading="lazy"
                    src={authorAvatar}
                    alt="Avatar"
                    width={65}
                    height={65}
                    className="object-cover rounded-full shadow-[0px_2px_5px_#3b43591f]"
                />
                <div className={"flex flex-1 items-center justify-start"}>
                    <span className="p-[10px] flex items-center box-border text-[14px]">{authorName}</span>
                    {/*<div*/}
                    {/*    className="py-[10px] flex items-center text-[14px] border-r border-[#e2e8f0] pr-2.5  text-center">برنامه*/}
                    {/*    نویس*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="flex justify-center items-center mt-6 gap-2">
                <button
                    onClick={() => {
                        const show = document.getElementById('donation') as HTMLDialogElement;
                        if (user) {
                            show?.showModal();
                        } else {
                            router.push("/auth/login")
                        }
                    }}
                    className="btn flex-auto lg:flex-1 flex items-center gap-2 border-none bg-red-500 text-white
               hover:bg-red-600 transition-colors duration-300
               relative overflow-hidden group"
                >
                    <Heart
                        size={18}
                        className="text-yellow-300 animate-bounce transition-transform duration-300 transform group-hover:scale-125"
                    />
                    حمایت مالی
                </button>
                <Link
                    href={`/author/${authorId}`}
                    className="btn btn-primary flex flex-auto lg:flex-1 flex-1 items-center gap-2 text-nowrap"
                >
                    <User2 size={18}/> {/* آیکن پروفایل دلخواه */}
                    مشاهده پروفایل
                </Link>
            </div>
                <DonationModal type={"course"} id={id}/>
        </div>
    );
};

export default AuthorProfile;