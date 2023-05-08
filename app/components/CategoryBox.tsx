"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleCick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString()); // create an object out of all query parameters
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //When click on the same category remove it from the params. This serves as a toggle
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    //convert it back from an object to a string
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleCick}
      className={`flex flex-col items-center justify-center, gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
