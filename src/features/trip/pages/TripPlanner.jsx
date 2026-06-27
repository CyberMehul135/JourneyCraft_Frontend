import React, { useState } from "react";
import Step1 from "../components/multipartForm/Step1";
import Step2 from "../components/multipartForm/Step2";
import Step3 from "../components/multipartForm/Step3";
import StepIndicator from "../components/multipartForm/StepIndicator";
import { TripDetailsCard } from "../components/TripDetailsCard";
import { useSelector } from "react-redux";
import { TripPdf } from "../components/TripPdf";
import { generateTripPdf } from "../utils/generatePdf";

export const TripPlanner = () => {
  const tripData = useSelector((state) => state.trip.tripData);

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const downloadPDF = async () => {
    generateTripPdf();
  };

  return (
    <>
      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Step Content */}
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && (
        <TripDetailsCard
          destinationImg={true}
          activityImg={false}
          tripSummary={true}
          buttons={false}
          data={tripData?.data?.data}
          onClickDownloadAsPDF={downloadPDF}
        />
      )}

      <TripPdf trip={tripData?.data?.data} />
    </>
  );
};
