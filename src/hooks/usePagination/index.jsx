import {useCallback, useEffect, useState} from 'react';

const UsePagination = (Data, Items) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(Items);
    const [data, setData] = useState(Data);
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const nextPage = useCallback(() => {
        setCurrentPage(+currentPage + 1)
    }, [currentPage])
    const prevPage = useCallback(() => {
        setCurrentPage(currentPage - 1)
    }, [currentPage])

    const goTo = useCallback((item) => setCurrentPage(item), [])

    useEffect(()=>{
        window.scroll(0,0)
    },[currentPage])

    useEffect(() => {
        if (Data)
            setData(Data)
        setItemsPerPage(Items)
    }, [])

    return {totalPages, currentPage, currentItems, nextPage, prevPage, goTo}
};

export default UsePagination;