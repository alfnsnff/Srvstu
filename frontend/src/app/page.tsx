"use client";
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
    const fileInput = (event.target as HTMLFormElement).elements.namedItem(
      "prompt",
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/predict`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prediction");
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
    <main className="container mx-auto mt-20 max-w-[512px] p-5 ">
      <hgroup>
        <h1 className="m-4 text-center text-4xl font-bold">
          Fruit Classification
        </h1>
      </hgroup>
      <form className="duration-700 animate-in fade-in" onSubmit={handleSubmit}>
        <div className="mt-4 flex space-x-2">
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

        <div id="imagePreview" className="mb-4 mt-6 flex justify-center">
          {imagePreviewUrl && (
            <img
              className="rounded-md"
              src={imagePreviewUrl}
              alt="Preview"
              style={{ width: "300px", height: "300px" }}
            />
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="mb-3 flex justify-center text-xl">
          Predicted Class:
          <div id="result" className="pl-2 text-center text-lg font-semibold">
            {predictionResult}
          </div>
        </h2>
      </div>
    </main>
  );
};

export default Home;
