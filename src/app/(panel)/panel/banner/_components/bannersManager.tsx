'use client'

import React from 'react'
import { useBannerStore } from '@/state/banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import InputDemo from "@/components/input-12";

const BannersManager = () => {
    const { banners, addBanner, removeBanner, updateBanner } = useBannerStore()

    return (
        <div className="space-y-4 mt-3">
            <div className="flex justify-end">
                <Button
                    onClick={() =>
                        addBanner({
                            image: '',
                            title: '',
                            link: '',
                            priority: banners.length + 1,
                        })
                    }
                >
                    <Plus className="w-4 h-4 ml-2" />
                    افزودن بنر
                </Button>
            </div>

            {banners.length === 0 && (
                <p className="text-center text-gray-500">هیچ بنری ثبت نشده است.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {banners.map((banner) => (
                    <Card key={banner.id} className="shadow-sm border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-semibold">
                                بنر #{banner.priority}
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeBanner(banner.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Input
                                value={banner.title}
                                onChange={(e) =>
                                    updateBanner(banner.id, 'title', e.target.value)
                                }
                                placeholder="عنوان بنر..."
                            />
                            <Input
                                value={banner.link}
                                style={{direction:"ltr"}}
                                onChange={(e) =>
                                    updateBanner(banner.id, 'link', e.target.value)
                                }
                                placeholder="لینک بنر..."
                            />
                            <InputDemo
                                dropzoneOptions={{maxSize: 1024 * 1024,accept:{"image/png": [".png", ".jpg", ".jpeg", ".webp",".gif"]}}}
                                defaultData={banner.image}
                                title={"تصویر"}
                                onChange={(file) => updateBanner(banner.id, 'image', file)}
                            />
                            <Input
                                type="number"
                                value={banner.priority}
                                onChange={(e) =>
                                    updateBanner(banner.id, 'priority', Number(e.target.value))
                                }
                                placeholder="اولویت"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default BannersManager
