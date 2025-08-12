import {instantClient} from "@/services/httpservice";

export const StudentDashboard =  (data:any) =>
    instantClient.get('Dashboard/Student', data);

export const AdminDashboard =  (data:any) =>
    instantClient.get('Dashboard/Admin', data);