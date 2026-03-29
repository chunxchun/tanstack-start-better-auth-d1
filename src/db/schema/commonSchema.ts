import * as z from "zod";

const countries = [
  {
    name: "Japan",
    code: "JP",
    capital: "Tokyo",
    region: "AS",
    currency: {
      code: "JPY",
      name: "Japanese yen",
      symbol: "¥",
    },
    language: {
      code: "ja",
      name: "Japanese",
    },
    flag: "https://restcountries.eu/data/jpn.svg",
    dialling_code: "+81",
    isoCode: "392",
  },
  {
    name: "Australia",
    code: "AU",
    capital: "Canberra",
    region: "OC",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$",
    },
    language: {
      code: "en",
      name: "English",
    },
    flag: "https://restcountries.eu/data/aus.svg",
    dialling_code: "+61",
    isoCode: "036",
  },
  {
    name: "Hong Kong",
    code: "HK",
    capital: "City of Victoria",
    region: "AS",
    currency: {
      code: "HKD",
      name: "Hong Kong dollar",
      symbol: "$",
    },
    language: {
      code: "en",
      name: "English",
    },
    flag: "https://restcountries.eu/data/hkg.svg",
    dialling_code: "+852",
    isoCode: "344",
  },
];

export const countryValues = countries.map((c) => c.name) as [
  string,
  ...string[],
];
export const countryEnum = z.enum(countryValues);
export type Country = (typeof countryValues)[number];

export const currencyValues = countries.map((c) => c.currency.code) as [
  string,
  ...string[],
];
export const currencyEnum = z.enum(currencyValues);
export type Currency = (typeof currencyValues)[number];

export const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

// export type CreateDialogProps<FetchType, InsertType> = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onCancel: () => void;
// };

// export type ViewDialogProps<T> = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onCancel: () => void;
//   data: T;
// };

// export type DeleteDialogProps<T> = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onCancel: () => void;
//   onDeleteConfirm: () => void;
//   data: T;
// }