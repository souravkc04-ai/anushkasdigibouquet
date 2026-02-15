"use client";

import React, { useState, useEffect } from "react";
import FlowerPicker from "../stages/FlowerPicker";
import BouquetCustomizer from "../stages/BouquetCustomizer";
import CardWriter from "../stages/CardWriter";
import ShareBouquet from "../stages/ShareBouquet";
import Image from "next/image";
import Link from "next/link";
import { useBouquet } from "../../context/BouquetContext";

const steps = ["Pick Flowers", "Customize Bouquet", "A Message from the Batcave", "Share"];

export default function BouquetCreationFlow() {
  const { bouquet, canProceed, setBouquet } = useBouquet();

  useEffect(() => {
    const surprises = [
      {
        sender: "MR. BATMAN",
        message: "I could have given you real flowers, but I built you a whole digital garden instead. 🦇\n\nBefore you finish this, you have to answer me: What is the secret nickname only I call you? Message me the answer to unlock your real-life surprise!",
      },
      {
        sender: "Sourav",
        message: "Every flower in this digital garden is a reminder of how lucky I am to have you. You make everything brighter. ❤️",
      },
      {
        sender: "The Batcave",
        message: "Hurdle Alert! ⚠️ To unlock the final bouquet, you must promise to go on a dinner date with me this weekend. Do you accept? 😉",
      }
    ];

    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];

    setBouquet((prev) => ({
      ...prev,
      letter: {
        sender: randomSurprise.sender,
        recipient: "Anushka",
        message: randomSurprise.message,
      }
    }));
  }, [setBouquet]);

  // Track which step the user is currently on (0-3)
  const [currentStep, setCurrentStep] = useState(0);

  // Navigation functions
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1)); // Move forward, but don't exceed max step
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0)); // Move backward, but don't go below 0

  return (
    <main className="container flex flex-col p-4 mx-auto">
      {/* Logo/Branding */}
      <Link href="/">
        <Image
          src="/digibouquet.png"
          alt="digibouquet"
          width={200}
          height={80}
          className="object-cover mx-auto mt-6"
          priority
        />
      </Link>

      {/* Main content area - renders different components based on current step */}
      <div className="flex-grow py-8">
        {/* Step 0: Flower Selection - Users pick flowers for their bouquet */}
        {currentStep === 0 && <FlowerPicker />}

        {/* Step 1: Bouquet Customization - Users arrange and customize their flowers */}
        {currentStep === 1 && <BouquetCustomizer />}

        {/* Step 2: Card Writing - Users write a message for their bouquet */}
        {currentStep === 2 && <CardWriter />}

        {/* Step 3: Sharing - Users can share their completed bouquet */}
        {currentStep === 3 && <ShareBouquet />}
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-row gap-4 justify-center m-auto">
        {/* Back button - only show if not on first step */}
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="text-sm px-4 py-2 border border-[#000000]"
          >
            BACK
          </button>
        )}

        {/* Next button - only show if not on last step */}
        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            disabled={!canProceed}
            className={`text-sm px-4 py-2 ml-auto ${
              canProceed
                ? "bg-[#000000] text-[#F5F5DC]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            NEXT
          </button>
        )}
      </div>
    </main>
  );
}
