'use client';
import { memo } from "react";
import Pagination, {PaginationProps} from "./pagination";


const Paginate = (data:PaginationProps) => {
  if (data.total <= 1) {
    return null;
  }
  return (
      <Pagination {...data} />
  );
};
export default memo(Paginate);
