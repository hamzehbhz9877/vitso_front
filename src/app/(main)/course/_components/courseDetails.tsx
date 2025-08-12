'use client'
import React, {useState} from 'react'
import dynamic from 'next/dynamic'

const PlyrPlayer = dynamic(() => import('@/components/player/player'), {ssr: false})
import "./index.scss"
import CourseStat from "@/app/(main)/course/_components/courseStat";
import RegisterCourse from "@/app/(main)/course/_components/registerCourse";
import CourseLinks from "@/app/(main)/course/_components/courseLinks";
import AuthorProfile from "@/app/(main)/course/_components/authorProfile";
import CourseTabs from "@/app/(main)/course/_components/courseTab";
import CourseStatTable from "@/app/(main)/course/_components/courseStatTable";

const CourseDetails = ({
                           title,
                           discountPercentage,
                           payablePrice,
                           id,
                           price,
                           description,
                           shortDescription,
                           commentCount,
                           studentCount,
                           countEpisode,
                           completionPercentage,
                           isStudentOfCourse,
                           discountRemaining,
                           authorName,

                           status,
                           seasons,

                           shortLink,
                           level,
                           time, image,
                           tagList, categoryName
                       }: Course) => {
    const [isVideoReady, setIsVideoReady] = useState(false)

    return (
        <div className="course-details mt-6">


            <div className={"flex gap-4"}>
                <div className={"flex-1"}>
                    <div className="flex-1">
                        {!isVideoReady && (
                            <div className="w-full aspect-video rounded-t-lg rounded-b-none bg-base-200 skeleton"/>
                        )}
                        <div className={isVideoReady ? '' : 'hidden'}>
                            <PlyrPlayer
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                                poster={image}
                                onReady={() => setIsVideoReady(true)}
                            />
                        </div>
                    </div>
                    <div className="gap-1 ">
                        <div
                            className="flex-1 single-course px-[18px] pt-[15px] pb-[15px] lg:px-[24px] dark:bg-base-300 rounded-b-lg">
                            <div className={"flex justify-between items-center mb-3"}>
                                <h3 className="text-lg md:text-xl  font-bold">{title}<span
                                    className="badge badge-soft badge-primary text-sm  me-2 px-2.5 py-0.5 rounded-lg ms-2">{level}</span>
                                </h3>
                                {/*<Rate commentCount={commentCount}/>*/}
                            </div>

                            <p className={"text-gray-500 dark:text-gray-400 text-sm text-justify leading-6"}>{shortDescription}</p>

                              <CourseStat status={status} commentCount={commentCount} time={time}
                                          studentCount={studentCount}
                                          countEpisode={countEpisode}
                              />
                        </div>
                    </div>

                    <div className={"block lg:hidden  flex-1 mt-5 single-course px-[18px] py-[15px] lg:px-[24px] dark:bg-base-300 rounded-lg"}>
                        <CourseStatTable status={status} commentCount={commentCount} time={time}
                                         studentCount={studentCount}
                                         countEpisode={countEpisode}/>

                        <div className={"mt-4"}>
                            <RegisterCourse isStudentOfCourse={isStudentOfCourse}
                                            discountRemaining={discountRemaining}
                                            completionPercentage={completionPercentage} price={price} id={id}
                                            discountPercentage={discountPercentage}
                                            payablePrice={payablePrice}/>
                        </div>


                    </div>

                    <div className="flex gap-[20px] my-[40px] single-course px-[18px] py-[15px] lg:px-[24px] dark:bg-base-300 rounded-lg">
                        <CourseTabs authorName={authorName} id={id} description={description} seasons={seasons}/>
                    </div>
                </div>
                <div className="mb-20 h-max hidden lg:block">
                    <div>
                        <div className={"w-[350px] shadow rounded-lg dark:bg-base-300 p-3"}>
                            <RegisterCourse isStudentOfCourse={isStudentOfCourse} discountRemaining={discountRemaining}
                                            completionPercentage={completionPercentage} price={price} id={id}
                                            discountPercentage={discountPercentage}
                                            payablePrice={payablePrice}/>
                        </div>
                    </div>
                    <div className={"w-[350px] shadow mt-4 dark:bg-base-300  p-3 rounded-lg"}>
                        <AuthorProfile authorName={authorName}/>
                    </div>
                    <div className={"w-[350px] shadow mt-4 dark:bg-base-300 p-4 rounded-lg"}>
                        <CourseLinks shortLink={shortLink} tagList={tagList} categoryName={categoryName}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CourseDetails
