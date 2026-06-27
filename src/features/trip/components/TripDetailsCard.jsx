import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowBigDownDash,
  Building,
  CalendarDays,
  IndianRupeeIcon,
  MapPin,
  Plane,
  Plus,
  ShieldAlert,
  Star,
  Sun,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import { createTrip } from "../trip.service";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { TripDetailsCardLoading } from "./loaders/TripDetailsCardLoading";
import { getPluralSuffix } from "@/shared/utils/pluralize";

export const TripDetailsCard = ({
  destinationImg = true,
  activityImg = true,
  tripSummary = false,
  buttons = true,
  onClickDownloadAsPDF,
  data,
  loading,
  err,
}) => {
  const createTripMutation = useMutation({
    mutationFn: (tripData) => createTrip(tripData),
    onSuccess: () => {
      toast.success("Trip Saved", { position: "bottom-right" });
      console.log("Saved");
    },
  });

  const handleAddToFavourite = () => {
    createTripMutation.mutate({
      quickSummary: data?.quickSummary,
      itinerary: data?.itinerary,
    });
  };

  const totalActivites = () => {
    const activities = data?.itinerary?.reduce((acc, cv) => {
      acc += cv.activities.length;
      return acc;
    }, 0);

    return activities;
  };

  const totalMeals = () => {
    const meals = data?.itinerary?.reduce((acc, cv) => {
      acc += cv.dining.length;
      return acc;
    }, 0);

    return meals;
  };

  if (loading) return <TripDetailsCardLoading />;
  if (err)
    return (
      <p>
        Error: {err?.response?.data?.message || err?.message} {err?.status}
      </p>
    );
  if (data) {
    return (
      <Card className="relative mx-auto w-full max-w-[800px] pt-0 bg-background ring-0">
        {/* 1. Hero-Image */}
        {destinationImg && (
          <div className="relative rounded-xl overflow-hidden  max-md:mx-0">
            <img
              src={data?.quickSummary?.image}
              className="h-[250px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30 p-6 flex flex-col justify-end">
              <h1 className="text-3xl font-bold text-white">
                {data?.quickSummary?.destination}
              </h1>

              <p className="text-gray-300">
                {data?.quickSummary?.totalDays} Days •{" "}
                {data?.quickSummary?.travelers} Traveler
                {getPluralSuffix(data?.quickSummary?.travelers)} • ₹
                {data?.quickSummary?.budget?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        )}

        {/* 2. Trip Summary */}
        {tripSummary && (
          <Card className="py-4 px-5 max-md:mx-0 max-md:mt-0 max-md:px-2 max-md:bg-transparent max-md:border-none mt-4 rounded-2xl border ring-0">
            <h3 className="text-lg font-semibold flex gap-1 items-center mb-2">
              Trip Summary
            </h3>

            <div className="grid grid-cols-3 max-[958px]:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="font-semibold">
                    {data?.quickSummary?.destination}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <CalendarDays
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold">
                    {data?.quickSummary?.totalDays} Days
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Users
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Travellers</p>
                  <p className="font-semibold">
                    {data?.quickSummary?.travelers} Adults
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Wallet
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-semibold">₹{data?.quickSummary?.budget}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Sun
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Best Time</p>
                  <p className="font-semibold">
                    {data?.quickSummary?.bestTimeToVisit}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Plane
                  size={17}
                  color="#6A55D3"
                  className="max-md:size-6 p-2.5 box-content bg-input/50 rounded-xl"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Trip Type</p>
                  <p className="font-semibold">
                    {data?.quickSummary?.tripType}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 3. Highlight-things */}
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 py-4 max-md:px-2">
          <Card className="p-4 flex flex-col gap-1 border ring-0">
            <div className="flex flex-row items-center gap-2">
              <IndianRupeeIcon className="p-2 box-content bg-blue-500 rounded-lg" />
              <div className="flex flex-col">
                <p>Total Cost</p>
                <h2 className="text-lg font-bold">
                  INR {data?.quickSummary?.budget}
                </h2>
              </div>
            </div>
            <p className="text-xs m-0 text-muted-foreground">
              Budget for your experience
            </p>
          </Card>
          <Card className="p-4 flex flex-col gap-1 border ring-0">
            <div className="flex flex-row items-center gap-2">
              <Star className="p-2 box-content bg-purple-500 rounded-lg fill-white" />
              <div className="flex flex-col">
                <p>Activities</p>
                <h2 className="text-lg font-bold">{totalActivites()}</h2>
              </div>
            </div>
            <p className="text-xs m-0 text-muted-foreground">
              Handpicked experience for you
            </p>
          </Card>
          <Card className="p-4 flex flex-col gap-1 border ring-0">
            <div className="flex flex-row items-center gap-2">
              <Utensils className="p-2 box-content bg-green-500 rounded-lg fill-white" />
              <div className="flex flex-col">
                <p>Meals</p>
                <h2 className="text-lg font-bold">{totalMeals()}</h2>
              </div>
            </div>
            <p className="text-xs m-0 text-muted-foreground">
              Deliciouses dining experiences
            </p>
          </Card>
        </div>

        {/* 4. Important-Information */}
        <div className="max-md:px-2">
          <Card className="p-4 flex flex-col gap-1 dark:bg-amber-950 bg-amber-200 border ring-0">
            <h3 className="text-lg font-semibold flex gap-1 items-center mb-2">
              <ShieldAlert className="fill-amber-500" />
              <p>Important Travel Information</p>
            </h3>
            <p>Best Time to Visit</p>
            <p className="text-xs m-0 text-muted-foreground">
              {data?.quickSummary?.bestTimeToVisit}
            </p>
          </Card>
        </div>

        {/* 5. Iterations */}
        <div className="mt-6 space-y-4 max-md:px-2">
          <h2 className="text-xl font-semibold">Day-by-day itinerary</h2>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4 rounded-lg! overflow-hidden!"
          >
            {data.itinerary.map((day) => (
              // Iteration
              <AccordionItem
                key={day.day}
                value={`day-${day.day}`}
                className="border px-0 rounded-lg max-md:border-none "
              >
                {/* Iteration-Accordian-Header */}
                <AccordionTrigger className="flex justify-between max-md:border bg-muted rounded-lg py-5 px-5 hover:no-underline cursor-pointer">
                  <div className="flex justify-between w-full items-center ">
                    <div className="flex items-center gap-2">
                      <div className="size-10 max-md:hidden flex justify-center items-center text-white text-sm font-semibold rounded-full bg-blue-500">
                        {day.day}
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-left">
                          Day {day.day}
                          <span className="max-md:hidden">
                            : {day?.dayTitle}
                          </span>
                        </h2>
                        <p className="text-[13px] text-muted-foreground ">
                          {day?.date}{" "}
                          <span className="max-md:hidden">
                            • {day?.activities?.length} Activities
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mr-2">
                      <p className="text-xs max-md:hidden">Daily Budget</p>
                      <p className="text-blue-500 font-semibold max-md:hidden">
                        INR {day?.dailyBudget}
                      </p>
                      <Badge className="bg-blue-500 text-sm py-3 md:hidden">
                        ₹{day?.dailyBudget}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>

                {/* Iteration-Accordian-Content */}
                <AccordionContent className="px-5 pb-6 max-md:px-0 mt-5 h-fit">
                  {/* Header */}
                  <h3 className="font-medium flex items-center gap-1">
                    <MapPin color="#2662ED" className="" />
                    <p>Activities</p>
                  </h3>

                  {/* Activities */}
                  <div className="mt-4 space-y-4">
                    {day.activities.map((activity, i) => (
                      // Activity
                      <div
                        key={i}
                        className="flex items-start gap-4 bg-muted/50 hover:bg-muted transition p-4 rounded-xl border max-md:flex-col"
                      >
                        {/* LEFT IMAGE */}
                        {activityImg && (
                          <div>
                            <img
                              src={
                                activity.image ||
                                "https://via.placeholder.com/80"
                              }
                              alt={activity.title}
                              className="size-23 rounded-lg object-cover"
                            />
                          </div>
                        )}

                        {/* CENTER CONTENT */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-2">
                            {activity?.title}
                          </h3>

                          {/* LOCATION */}
                          {activity.location && (
                            <div className="text-xs text-gray-400 m-0">
                              📍 {activity?.location}
                            </div>
                          )}

                          {/* DESCRIPTION */}
                          {activity.description && (
                            <p className="text-xs text-gray-500">
                              {activity?.description}
                            </p>
                          )}

                          {/* TIME + DURATION */}
                          <div className="flex gap-4 text-xs text-gray-400 ">
                            <span>🕒 {activity?.startTime}</span>
                            <span>Duration: {activity?.duration}</span>
                          </div>
                        </div>

                        {/* RIGHT COST */}
                        <div className="ml-auto max-md:ml-0 ">
                          <Badge className="bg-blue-600 text-white px-3 py-1 rounded-full">
                            ₹ {activity?.cost}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dining */}
                  <h3 className="font-medium flex items-center gap-2 mt-5">
                    <Utensils size={20} strokeWidth={3} color="#319B5D" />
                    <p>Dining</p>
                  </h3>

                  <div className="mt-5 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3">
                    {day?.dining?.map((dinner, i) => (
                      <Card
                        className="p-4 flex flex-col gap-0 rounded-sm bg-green-500/10 border-none"
                        key={i}
                      >
                        <div className="mb-2!">
                          <div className="flex items-center gap-2">
                            <Building size={11} />
                            <p className="mb-0! text-foreground font-medium">
                              {dinner?.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={12} />
                            <p className="text-xs m-0! text-muted-foreground">
                              {dinner?.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-0">
                          <p className="text-xs m-0 text-muted-foreground mb-0!">
                            {dinner?.cuisine}
                          </p>
                          <h2 className="text-sm font-bold text-green-400">
                            INR {dinner?.cost}
                          </h2>
                        </div>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 6 Buttons */}
        {buttons && (
          <div className="max-md:px-2 flex justify-around gap-3 mt-3">
            <Button
              className="w-[48%] py-5 bg-linear-to-r from-green-700 to-green-400 font-semibold cursor-pointer hover:scale-101 transition-all border-none"
              onClick={onClickDownloadAsPDF}
            >
              <ArrowBigDownDash strokeWidth={3} /> Download PDF
            </Button>
            <Button
              className="w-[48%] py-5 bg-linear-to-r from-red-800 to-red-400 font-semibold cursor-pointer hover:scale-101 transition-all border-none"
              onClick={handleAddToFavourite}
            >
              {!createTripMutation.isPending && <Plus strokeWidth={3} />}
              {createTripMutation.isPending && <Spinner />}
              {createTripMutation.isPending
                ? "Adding to MyTrips..."
                : "Add to MyTrips"}
            </Button>
          </div>
        )}
      </Card>
    );
  }
};
