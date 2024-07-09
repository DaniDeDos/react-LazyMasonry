import clienteAxios from "../config/axios";
import { useBookStore } from "../store/bookStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

import Card from "./Card";
import Spinner from "./Spinner";

const fetchImages = async ({
  pageParam,
  searchValue,
}: {
  pageParam: number;
  searchValue: string;
}) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY_UNSPLASH;
    const response = await clienteAxios.get("search/photos", {
      params: {
        query: searchValue,
        page: pageParam,
        per_page: 10,
      },
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });

    // Incrementamos pageParam aquí antes de retornar
    const updatedData = {
      data: response.data.results,
      prevOffset: pageParam + 1,
    };
    return updatedData;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

const ReactLazyLoading = () => {
  const val = useBookStore((state) => state.value);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["images", val],
    queryFn: ({ pageParam = 1, searchValue = val }) =>
      fetchImages({ pageParam, searchValue }),
    getNextPageParam: (lastPage) => {
      if (lastPage.total === lastPage.data.length) {
        return false;
      }
      return lastPage.prevOffset;
    },
  });

  const images = data?.pages.flatMap((page) => page.data) || [];
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="mx-4 flex items-center justify-center">
      {images.length > 0 && (
        <InfiniteScroll
          dataLength={images.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Spinner />}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((image, index) => (
              <Card key={`${image.id}-${index}`} item={image} />
            ))}
          </Masonry>
        </InfiniteScroll>
      )}
    </div>
  );
};

export { ReactLazyLoading };
