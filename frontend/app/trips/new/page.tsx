"use client"

import { createTrip } from "@/lib/actions/create-trips";
import { UploadButton } from "@/lib/upload-thing";
import { error } from "console";
import { useState, useTransition } from "react";

const NewTripPage = () => {
    const [isPending, startTransition] = useTransition();
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    return <div className="max-w-lg mx-auto py-10">
        <div className="border border-gray-300 rounded-lg p-6 shadow-lg">
            <h3 className="text-center mb-6">New Trip</h3>
            <form className="space-y-4" action={(formData : FormData) => {
                if (imgUrl) {
                    formData.append("imgUrl", imgUrl);
                }
                startTransition(() =>{
                    createTrip(formData);
                })
            }}>
                <div>
                    <label htmlFor="title" className="font-bold">Title</label>
                    <input type="text" id="title" name="title" className="border border-gray-300 p-3 rounded w-full placeholder:italic" placeholder="Trip to Paris..." required />
                </div>
                <div>
                    <label htmlFor="description" className="font-bold">Description</label>
                    <textarea id="description" name="description" className="border border-gray-300 p-3 rounded w-full placeholder:italic" placeholder="A week-long trip to Paris" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="font-bold">Start Date</label>
                        <input type="date" id="startDate" name="startDate" className="border border-gray-300 p-2 rounded w-full" required />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="font-bold">End Date</label>
                        <input type="date" id="endDate" name="endDate" className="border border-gray-300 p-2 rounded w-full" required />
                    </div>
                </div>
                <div>
                    <label className="font-bold">Image</label>
                    {imgUrl && <img src={imgUrl} alt="Preview" className="w-full max-h-48 object-cover rounded" />}
                </div>
                <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => {
                    if(res && res[0]?.ufsUrl) {
                        setImgUrl(res[0].ufsUrl);
                    }
                }} 
                onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                }}/>
                <button type="submit" disabled={isPending} className="w-full bg-blue-500 font-bold text-white py-2 hover:bg-blue-700">{isPending ? "Creating..." : "Create Trip"}</button>
            </form>
        </div>
    </div>
}

export default NewTripPage;