import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export type PaginationProps = {
    pages: Array<any>;
    goTo: (page: number) => void;
    currentPage: number;
    nextPage: () => void;
    prevPage: () => void;
    total: number;
}

const Pagination = ({
                        pages,
                        goTo,
                        currentPage,
                        nextPage,
                        prevPage,
                        total,
                    }: PaginationProps) => {

    const rows = pages.map((item, index) => {
        const isDot = item === "..." || item === "... " || item === " ...";
        const isActive = currentPage === item;

        return (
            <li
                key={index}
                className={`
                    mx-0.5 md:mx-1 rounded-[8px]
                    w-[40px] h-[35px] 
                    text-xs md:text-sm flex items-center justify-center cursor-pointer 
                    ${isActive ? "bg-primary text-white w-[25px] h-[35px] text-[14px] md:text-[16px]" : ""}
                    ${isDot ? "cursor-default border-none" : ""}
                `}
                onClick={() => {
                    if (item === "...") goTo(currentPage + 1);
                    else if (item === "... ") goTo(currentPage - 1);
                    else if (item === " ...") goTo(currentPage + 1);
                    else goTo(item-1);
                    window.scrollTo(0,0)
                }}
            >
                {item}
            </li>
        )
    });

    return (
        <nav className="flex flex-row items-center justify-between my-5 px-4 md:px-0 gap-5">
            {/* Previous */}
            <div
                className={`
                    flex items-center gap-2 text-sm cursor-pointer
                    ${currentPage === 1 ? "!cursor-not-allowed opacity-50" : ""}
                `}
                onClick={currentPage === 1 ? undefined : prevPage}
            >
                <FaAngleRight className="w-[10px] md:w-[20px]" />
                <span className="hidden lg:block">قبلی</span>
            </div>

            {/* Pages */}
            <ul className="flex items-center gap-2">
                {rows}
            </ul>

            {/* Next */}
            <div
                className={`
                    flex items-center gap-2 text-sm cursor-pointer
                    ${currentPage === total ? "!cursor-not-allowed opacity-50" : ""}
                `}
                onClick={currentPage === total ? undefined : nextPage}
            >
                <span className="hidden lg:block">بعدی</span>
                <FaAngleLeft className="w-[10px] md:w-[20px]" />
            </div>
        </nav>
    );
};

export default Pagination;
