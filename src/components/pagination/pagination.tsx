import "./pagination.scss"
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";

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

    const rows = pages.map((item, index) => (
        <li
            key={index}
            id={index.toString()}
            className={`pagination__item 
            ${item==="..." || item==="... "||item===" ..."?"dot !cursor-default !border-none":""}
            ${currentPage === item ? "pagination__item--active" : ""
            }`}
            onClick={() =>
                item.toString() === "..."
                    ? goTo(currentPage + 1)
                    : item.toString() === "... "
                        ? goTo(currentPage - 1)
                        : item.toString() === " ..."
                            ? goTo(currentPage + 1)
                            : goTo(item)
            }
        >
            <span className="pagination__link">{item}</span>
        </li>
    ));


    return (
        <nav className="pagination">
            <div className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                 onClick={currentPage === 1 ? () => {
                 } : prevPage}>
                <FaAngleRight size={13} />
                <span>قبلی</span>
            </div>
            <ul className="pagination__list">
                {rows}
            </ul>
            <div className={`next ${currentPage === total ? "disabled" : ""}`}
                 onClick={currentPage === total ? () => {
                 } : nextPage}>
                <span>بعدی</span>
                <FaAngleLeft
                       size={13}/>
            </div>
        </nav>
    );

};
export default Pagination;