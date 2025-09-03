import { create } from 'zustand'

type Banner = {
    id: string
    image: string | File
    title: string
    link: string
    priority: number
}

type BannerStore = {
    banners: Banner[]
    addBanner: (banner: Omit<Banner, 'id'>) => void
    removeBanner: (id: string) => void
    updateBanner: (id: string, key: keyof Omit<Banner, 'id'>,  value: string | number | File) => void
    setBanners: (banners: Banner[]) => void
}

export const useBannerStore = create<BannerStore>((set) => ({
    banners: [],
    addBanner: (banner) =>
        set((state) => ({
            banners: [...state.banners, { ...banner, id: crypto.randomUUID() }],
        })),
    removeBanner: (id) =>
        set((state) => ({
            banners: state.banners.filter((b) => b.id !== id),
        })),
    updateBanner: (id, key, value) =>
        set((state) => ({
            banners: state.banners.map((banner) =>
                banner.id === id ? { ...banner, [key]: value } : banner
            ),
        })),
    setBanners: (banners) => set({ banners }),
}))
