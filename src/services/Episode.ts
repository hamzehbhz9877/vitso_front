import {instantClient} from "@/services/httpservice";

export const RequestEpisodes =  (id:any) =>
    instantClient.get(`Episode/GetAllForSeason/${id}`,);


export const RegisterEpisodes = (
    data: FormData,
    {
        onProgress,
        signal,
    }: {
        onProgress?: (percent: number) => void
        signal?: AbortSignal
    } = {}
) => {
    return instantClient.post("Episode", data, {

        signal, // 🔹 اینجا برای abort
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                if (percent >= 100) {
                    percent = 99 // ✅ نگه‌داشتن روی ۹۹%
                }
                onProgress?.(percent)
            }
        },
    }).then((res) => {
        onProgress?.(100)
        return res
    })
}

// ✅ ویرایش اپیزود
export const EditEpisodes = (
    id: string,
    data: FormData | Record<string, any>,
    {
        onProgress,
        signal,
    }: {
        onProgress?: (percent: number) => void
        signal?: AbortSignal
    } = {}
) => {
    const isFormData = data instanceof FormData

    return instantClient.put(`Episode/${id}`, data, {
        signal,
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                if (percent >= 100) {
                    percent = 99 // ✅ نگه‌داشتن روی ۹۹%
                }
                onProgress?.(percent)
            }
        },
    }).then((res) => {
        onProgress?.(100)
        return res
    })
}

export const GetForEditEpisodes =  (id) =>
    instantClient.get(`Episode/GetForEdit/${id}`);

export const ChangeStatusEpisodes =  (id) =>
    instantClient.get(`Episode/ChangeStatus/${id}`);

export const DeleteEpisodes =  (id) =>
    instantClient.delete(`Episode/${id}`);