import {instantClient} from "@/services/httpservice";

export const RequestInvoice =  (params) =>
    instantClient.get('Invoice',{params:{...params}});

export const CheckInvoice =  (id) =>
    instantClient.get(`Invoice/CheckInvoice/${id}`, );

export const InvoiceDetail =  (id) =>
    instantClient.get(`Invoice/Detail/${id}`, );

export const GetAllForStudentInvoice =  (params) =>
    instantClient.get(`Invoice/GetAllForStudent`,{params:{...params}} );

