import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SaleListings() {
  const [saleListing, setSaleListing] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      try {
        const listingsRef = collection(db, "listings");

        //create listings Query
        const listingsQuery = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        //execute the listingsQuery
        const listingsQuerySnap = await getDocs(listingsQuery);
        const listings = [];

        listingsQuerySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListing(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);
  return (
    <div className="max-w-6xl mx-auto space-y- pt-4">
      <div className="m-2 mb-6">
        <h2 className="font-semibold text-2xl px-3 mt-3">House for Sale</h2>
        <Link to="category/sale">
          <small className="text-sm text-blue-600 px-3 hover:text-blue-800 transition duration-150 ease-in-out">
            Show more places for sale
          </small>
        </Link>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-4 2xl:grid-cols-4        gap-2">
          {saleListing
            ? saleListing.map((listing) => (
                <div key={listing.id}>
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                </div>
              ))
            : Array.from({ length: 4 }, (_, index) => (
                <div key={index}>
                  <Skeleton height={300} />
                </div>
              ))
            }
        </ul>
      </div>
    </div>
  );
}
