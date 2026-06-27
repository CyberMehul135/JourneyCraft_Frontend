import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripDetailsCard } from "../components/TripDetailsCard";
import { getTrip, toggleFavouriteTrip } from "../trip.service";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowBigDownDash, Star } from "lucide-react";
import { generateTripPdf } from "../utils/generatePdf";
import { TripPdf } from "../components/TripPdf";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export const TripDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => getTrip(id),
    staleTime: 3000,
  });

  const queryClient = useQueryClient();
  const toogleFavouriteTrips = useMutation({
    mutationFn: (id) => toggleFavouriteTrip(id),
    onSuccess: (response) => {
      queryClient.setQueryData(["trip", id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          trip: response.data.updatedTrip,
        },
      }));

      toast.success(
        `Trip ${response?.data?.updatedTrip?.isFavourite ? "Added to" : "Removed from"} Favourite`,
        { position: "bottom-right" },
      );
    },
  });

  const handleAddToFavourite = () => {
    toogleFavouriteTrips.mutate(data?.data?.trip?._id);
  };

  const handleDownloadPDF = () => {
    generateTripPdf();
  };

  const isTripFavourite = () => {
    return data?.data?.trip?.isFavourite;
  };

  return (
    <>
      <TripDetailsCard
        destinationImg={true}
        activityImg={false}
        tripSummary={true}
        buttons={false}
        data={data?.data?.trip}
        loading={isLoading || isFetching}
        err={error}
      />
      <div className="max-md:px-2 flex justify-around gap-3 mt-3 max-w-[800px] mx-auto">
        <Button
          className="w-[48%] py-5 bg-linear-to-r from-green-700 to-green-400 font-semibold cursor-pointer hover:scale-101 transition-all border-none"
          onClick={handleDownloadPDF}
        >
          <ArrowBigDownDash strokeWidth={3} /> Download PDF
        </Button>
        <Button
          className="w-[48%] py-5 bg-linear-to-r from-red-800 to-red-400 font-semibold cursor-pointer hover:scale-101 transition-all border-none"
          onClick={handleAddToFavourite}
        >
          {!toogleFavouriteTrips.isPending && isTripFavourite() ? (
            <Star strokeWidth={3} fill="white" color="white" />
          ) : (
            <Star absoluteStrokeWidth />
          )}
          {toogleFavouriteTrips.isPending && <Spinner />}
          {toogleFavouriteTrips.isPending && isTripFavourite()
            ? "Adding to Favourite..."
            : toogleFavouriteTrips.isPending && !isTripFavourite()
              ? "Remove from Favourite..."
              : isTripFavourite()
                ? "Remove From Favourite"
                : "Mark as Favourite"}
        </Button>
      </div>

      <TripPdf trip={data?.data?.trip} />
    </>
  );
};
