import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateFields } from "@/features/trip/tripSlice";
import { useRef, useState } from "react";
import { getDestinationSuggestions } from "@/services/geoapify.service";

export default function Step1({ nextStep }) {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.formData);

  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const debounceRef = useRef(null);
  const refs = {
    destination: useRef(null),
    travellers: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    budget: useRef(null),
  };

  const getSuggestions = async (value) => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await getDestinationSuggestions(value);
      setSuggestions(data);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;

    // setSelectedPlace(null);

    dispatch(
      updateFields({
        field: "destination",
        value,
      }),
    );

    dispatch(
      updateFields({
        field: "destinationPlaceId",
        value: "",
      }),
    );

    // Clear previous timer
    clearTimeout(debounceRef.current);

    // New timer
    debounceRef.current = setTimeout(() => {
      getSuggestions(value);
    }, 500);

    setErrors((prev) => ({
      ...prev,
      destination: false,
    }));
  };

  const handleNext = () => {
    const newErrors = {};

    if (!trip.destination) {
      newErrors.destination = "Destination is required";
    } else if (!trip.destinationPlaceId) {
      newErrors.destination = "Please select a destination from suggestions";
    }
    if (!trip.travellers) {
      newErrors.travellers = "Travellers is required";
    } else if (Number(trip.travellers) < 1) {
      newErrors.travellers = "Minimum 1 traveller required";
    }
    if (!trip.startDate) newErrors.startDate = true;
    if (!trip.endDate) {
      newErrors.endDate = "End date is required";
    } else if (
      trip.startDate &&
      new Date(trip.endDate) < new Date(trip.startDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }
    if (!trip.budget) {
      newErrors.budget = "Budget is required";
    } else if (Number(trip.budget) < 1) {
      newErrors.budget = "Please put correct amount";
    }

    setErrors(newErrors);

    // first invalid field focus
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField && refs[firstErrorField]?.current) {
      const element = refs[firstErrorField].current;

      // scroll + focus
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      element.focus();

      return;
    }

    //  all valid
    nextStep();
  };

  const handleInputOnChange = (e) => {
    const { id, value } = e.target;

    if (id === "travellers" && Number(value) < 0) {
      return;
    }
    if (id === "budget" && Number(value) < 0) {
      return;
    }

    dispatch(updateFields({ field: e.target.id, value: e.target.value }));
    setErrors((prev) => ({
      ...prev,
      [e.target.id]: false,
    }));
  };

  return (
    <div className="max-w-[800px] md:shadow-sm mx-auto bg-card/40 max-md:bg-transparent max-md:border-none max-md:px-1 p-10 max-md:py-5 border rounded-xl">
      {/* Fields */}
      <div className="max-w-[800px] grid grid-cols-2 max-md:grid-cols-1 gap-x-5 gap-y-5 mb-8">
        <Field className="gap-0 relative">
          <FieldLabel
            htmlFor="destination"
            className="mb-2 text-lg font-semibold"
          >
            Where do you want to go?
          </FieldLabel>
          <Input
            id="destination"
            placeholder="Enter destination"
            ref={refs.destination}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500",
              errors.destination && "border-red-500",
            )}
            value={trip.destination}
            onChange={handleDestinationChange}
          />
          {suggestions.length > 0 && (
            <div className="absolute top-20 z-20 mt-2 border rounded-md bg-background">
              {suggestions.map((place) => (
                <div
                  key={place.properties.place_id}
                  className="p-3 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    dispatch(
                      updateFields({
                        field: "destination",
                        value: place.properties.formatted,
                      }),
                    );

                    dispatch(
                      updateFields({
                        field: "destinationPlaceId",
                        value: place.properties.place_id,
                      }),
                    );

                    setSuggestions([]);
                  }}
                >
                  {place.properties.formatted}
                </div>
              ))}
            </div>
          )}
          {errors.destination && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              {errors.destination}
            </p>
          )}
        </Field>
        <Field className="gap-0">
          <FieldLabel
            htmlFor="travellers"
            className="mb-2 text-lg font-semibold"
          >
            Number of travellers
          </FieldLabel>
          <Input
            type="number"
            min="1"
            placeholder="2"
            id="travellers"
            ref={refs.travellers}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 scheme-light dark:scheme-dark",
              errors.travellers && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.travellers}
            onChange={handleInputOnChange}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.travellers && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              {errors.travellers}
            </p>
          )}
        </Field>
        <Field className="gap-0">
          <FieldLabel
            htmlFor="start-date"
            className="mb-2 text-lg font-semibold"
          >
            Start date
          </FieldLabel>
          <Input
            type="date"
            placeholder="2"
            max={trip.endDate}
            id="startDate"
            ref={refs.startDate}
            className={`p-6 placeholder:text-gray-400 dark:placeholder:text-white scheme-light dark:scheme-dark ${errors.startDate && "border-red-500"}`}
            value={trip.startDate}
            onChange={handleInputOnChange}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">
              Start date is required
            </p>
          )}
        </Field>
        <Field className="gap-0">
          <FieldLabel htmlFor="enddate" className="mb-2 text-lg font-semibold">
            End date
          </FieldLabel>
          <Input
            type="date"
            placeholder="2"
            min={trip.startDate}
            id="endDate"
            ref={refs.endDate}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 scheme-light dark:scheme-dark",
              errors.endDate && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.endDate}
            onChange={handleInputOnChange}
          />
          {errors.endDate && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.endDate}</p>
          )}
        </Field>
        <Field className="md:col-span-2 gap-0">
          <FieldLabel htmlFor="budget" className="mb-2 text-lg font-semibold">
            Total Budget (INR)
          </FieldLabel>
          <Input
            type="number"
            min="1"
            placeholder="₹70,000"
            id="budget"
            ref={refs.budget}
            className={cn(
              "p-6 placeholder:text-gray-400 dark:placeholder:text-gray-500 scheme-light dark:scheme-dark",
              errors.budget && "border-red-500 focus-visible:ring-red-500",
            )}
            value={trip.budget}
            onChange={handleInputOnChange}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.budget && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.budget}</p>
          )}
        </Field>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between">
        <Button
          onClick={nextStep}
          className="w-[48%] py-6 border border-gray-300 dark:border-border"
          variant="secondary"
          disabled
        >
          <MoveLeft className="size-5" />
          Previous
        </Button>
        <Button onClick={handleNext} className="w-[48%] py-6 ">
          Next
          <MoveRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
