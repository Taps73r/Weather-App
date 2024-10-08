"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCity } from "@/store/fetchCityThunk";
import { setCity } from "@/store/userPreferences";
import { Button, Input } from "@nextui-org/react";
import { clearData } from "@/store/forecastWeather";

export function CityInput() {
    const dispatch = useDispatch<AppDispatch>();
    const { city, loading } = useSelector(
        (state: RootState) => state.userPreferencesReducer
    );
    const loadingWeather = useSelector(
        (state: RootState) => state.forecastWeatherReducer.loading
    );

    const [inputCity, setInputCity] = useState("");

    useEffect(() => {
        if (!city) {
            dispatch(fetchCity());
        }
    }, [city, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(e.target.value);
    };

    const handleButtonClick = () => {
        if (inputCity) {
            dispatch(clearData());
            dispatch(setCity(inputCity));
        }
        if (!inputCity) {
            dispatch(clearData());
            dispatch(fetchCity());
        }
    };

    return (
        <div className="flex flex-row justify-center gap-4 mt-6">
            <Input
                className="min-w-[190px] max-w-sm w-[50%] text-4xl"
                variant="faded"
                color="default"
                label="City"
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                description="Enter city name"
            />
            <Button
                className="max-w-sm h-[56px] text-md"
                variant="faded"
                isLoading={loading || loadingWeather}
                onClick={handleButtonClick}
            >
                Find
            </Button>
        </div>
    );
}
