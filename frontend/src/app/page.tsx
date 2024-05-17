"use client"
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [predictionResult, setPredictionResult] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = (event.target as HTMLFormElement).elements.namedItem('prompt') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      formData.append('file', file);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/predict`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }

        const result = await response.json();
        //setPredictionResult(result.prediction);
        setPredictionResult(`${result.class}`);
      
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    }
  };

  return (
    <main className="container max-w-[1024px] mx-auto p-5">
      <div className="container max-w-[512px] mx-auto">
        <hgroup>
          <h1 className="text-center text-5xl font-bold m-4">Fruit Classification</h1>
          <p className="text-center text-xl opacity-60 m-4">Top Picks</p>
        </hgroup>
        <form className="animate-in fade-in duration-700" onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <Input
              id="prompt-input"
              type="file"
              name="prompt"
              placeholder="Describe the image you want to create..."
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button type="submit">Submit</Button>
          </div>

          <div id="imagePreview" className="mb-4 flex justify-center mt-6">
            {imagePreviewUrl && (
              <img className="rounded-md" src={imagePreviewUrl} alt="Preview" style={{ width: '300px', height: '300px' }} />
            )}
          </div>
        </form>
        
        <div className="mt-8">
        <h2 className="flex text-xl font-semibold justify-center mb-3">Predicted Class:</h2>
          <div id="result" className="mt-4 text-center text-lg font-semibold">
            {predictionResult}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;