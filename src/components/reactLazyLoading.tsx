import clienteAxios from "../config/axios";
import { useBookStore } from "../store/bookStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

import Card from "./Card";
import Spinner from "./Spinner";

interface FetchImageItem {
  id: string;
  url: string;
  urls: {
    small: string;
  };
  description: string;
}
interface FetchImagesResponse {
  data: FetchImageItem[];
  prevOffset?: number;
  total?: number;
}

const fetchImages = async ({
  pageParam,
  searchValue,
}: {
  pageParam: number;
  searchValue: string;
}): Promise<FetchImagesResponse> => {
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

    const updatedData = {
      data: response.data.results.map((item: FetchImageItem) => ({
        id: item.id,
        url: item.urls.small,
        urls: item.urls,
        description: item.description,
      })) as FetchImageItem[],
      prevOffset: pageParam + 1,
    };
    return updatedData;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

const ReactLazyLoading: React.FC = () => {
  const val = useBookStore((state) => state.value);

  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FetchImagesResponse>({
      queryKey: ["images", val],
      queryFn: ({ pageParam = 1 }) =>
        fetchImages({
          pageParam: pageParam as number,
          searchValue: val,
        }),

      getNextPageParam: (lastPage) => {
        if (lastPage.total === lastPage.data.length) {
          return false;
        }

        if (typeof lastPage.prevOffset === "number") {
          return lastPage.prevOffset;
        }

        throw new Error("prevOffset must be a number");
      },

      initialPageParam: 1,
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
          hasMore={!!hasNextPage}
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
