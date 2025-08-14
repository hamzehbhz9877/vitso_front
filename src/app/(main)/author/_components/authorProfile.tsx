import CourseCard from "@/app/_components/courseCard";
import {Star, User} from "lucide-react";


type Props = {
    teacher: Teacher
}

export default function TeacherProfile({ teacher }: Props) {
    return (
        <div className="container mx-auto p-4">
            {/* Profile Header */}
            <div className="card bg-base-300 shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <img
                    src={teacher.avatar}
                    alt="Teacher Avatar"
                    className="w-32 h-32 rounded-full object-cover ring ring-primary ring-offset-2"
                />
                <div className="text-center md:text-right flex-1">
                    <h1 className="text-2xl font-bold text-primary">
                        {teacher.firstName} {teacher.lastName}
                    </h1>
                    <p className="text-lg text-gray-500">
                        {teacher.degree} - {teacher.skill}
                    </p>
                    <p className="mt-4 leading-relaxed">{teacher.aboutMe}</p>
                </div>
            </div>
            {/* Courses */}
            <h2 className="text-xl font-bold mt-8 mb-4 text-primary">دوره‌های مدرس</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            </div>
        </div>
    )
}
