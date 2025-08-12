import {instantClient} from "@/services/httpservice";


export const Transactions =  (params:any) =>
    instantClient.get('Wallet/Transactions', {params:{...params}});


export const DepositUserWallet =  (data) =>
    instantClient.post('Wallet/Deposit', data);

export const Wallet =  () =>
    instantClient.get('Wallet');


export const CheckTransactionUser =  (id) =>
    instantClient.get(`Wallet/CheckTransaction/${id}`);

