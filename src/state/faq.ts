import { create } from 'zustand'

type FAQ = {
    id: string
    question: string
    answer: string
    priority: number
}

type FAQStore = {
    faqs: FAQ[]
    addFAQ: (faq: Omit<FAQ, 'id'>) => void
    removeFAQ: (id: string) => void
    updateFAQ: (id: string, key: keyof Omit<FAQ, 'id'>, value: string | number) => void
    setFAQs: (faqs: FAQ[]) => void
}

export const useFAQStore = create<FAQStore>((set) => ({
    faqs: [],
    addFAQ: (faq) =>
        set((state) => ({
            faqs: [...state.faqs, { ...faq, id: crypto.randomUUID() }],
        })),
    removeFAQ: (id) =>
        set((state) => ({
            faqs: state.faqs.filter((f) => f.id !== id),
        })),
    updateFAQ: (id, key, value) =>
        set((state) => ({
            faqs: state.faqs.map((faq) =>
                faq.id === id ? { ...faq, [key]: value } : faq
            ),
        })),
    setFAQs: (faqs) => set({ faqs }),
}))
