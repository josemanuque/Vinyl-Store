import { useMemo } from "react";

const useFormatCurrency = (locale: string, currency: string) => {
    const formatter = useMemo(()=> {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        })}, [locale, currency]);

    return (value: number) => {
        return formatter.format(value);
    }
};

export default useFormatCurrency