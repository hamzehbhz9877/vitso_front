import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsGrid({ stats, data }: {
    stats: { key: string, title: string, icon: React.ReactNode }[]
    data: Record<string, number>
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(({ key, title, icon }) => (
                <Card key={key} tabIndex={0} role="region" aria-labelledby={`${key}-title`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle
                            id={`${key}-title`}
                            className="font-medium"
                        >
                            {title}
                        </CardTitle>
                        <div className="text-primary bg-muted flex size-12 items-center justify-center rounded-full border">
                            {icon}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {data?.[key] ?? 0}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
