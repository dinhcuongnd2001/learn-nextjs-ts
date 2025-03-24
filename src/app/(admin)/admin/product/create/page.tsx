'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductRequest } from "@/types";
import { useMemo, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import dynamic from "next/dynamic";



const TinyMCEEditor = dynamic(() => import("@/components/common/tinyMceEditor"), {ssr:false})

export default function CreateProductPage(){

  
  const initialValue: ProductRequest = useMemo(() => {
    return {
      name: "",
      description: "",
      baseCost: 0,
      thumbnail: "",
      categories: [],
      productVariations: []
    }
  }, [])

  const [product, setProduct] = useState<ProductRequest>(initialValue);

  const handleChange = (key: Extract<keyof ProductRequest, string>, value : string) => {
    setProduct({...product, [key] : value})
  } 

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex gap-4">
          <div className="flex-1 w-full flex justify-start items-center gap-4">
            <Label htmlFor="link" className="w-24">
              Product Name:
            </Label>
            <Input className="flex-1 h-10" value={product.name} onChange={e => handleChange('name', e.target.value)} />
          </div>

          <div className="flex-1 w-full flex justify-start items-center gap-4">
            <Label htmlFor="link" className="w-24">
              Base Cost
            </Label>
            <Input
              className="flex-1 h-10"
              value={product.baseCost}
              onChange={e => handleChange('baseCost', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 w-full flex justify-start items-center gap-4">
            <Label htmlFor="link" className="w-24">
              Thumbnail
            </Label>
            <Input
              className="flex-1 h-10"
              value={product.thumbnail}
              onChange={e => handleChange('thumbnail', e.target.value)}
            />
          </div>

          <div className="flex-1 w-full flex justify-start items-center gap-4">
            <Label htmlFor="link" className="w-24">
              Category
            </Label>
            <Input
              className="flex-1 h-10"
              value={product.baseCost}
              onChange={e => handleChange('baseCost', e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 w-full flex justify-start items-start gap-4">
          <Label htmlFor="link" className="min-w-24">
            Description
          </Label>
          <TinyMCEEditor value={product.description} onEditorChange={val => handleChange('description', val)} />
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-5 items-start">
        <div className="flex gap-4">
          <div className="flex-1 w-full flex justify-start items-center gap-4">
            <Label htmlFor="link" className="w-24">
              Attributes
            </Label>
            <Input
              className="flex-1 h-10"
              value={product.baseCost}
              onChange={e => handleChange('baseCost', e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="link" className="w-24">
            Table Attribute Combine
          </Label>
        </div>
      </div>
    </div>
  );
}
