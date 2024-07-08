import clienteAxios from "../config/axios";
import { useBookStore } from "../store/bookStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

import Card from "./Card";

const fetchImages = async ({ pageParam, searchValue }) => {
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
      prevOffset: pageParam + 1, // Asegúrate de que esto sea lo que realmente quieres
    };
    return updatedData;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

function ReactLazyLoading() {
  const val = useBookStore((state) => state.value);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1, searchValue = val }) =>
      fetchImages({ pageParam, searchValue }),
    getNextPageParam: (lastPage) => {
      // Verifica si hay más páginas basándote en el total de resultados
      if (lastPage.total === lastPage.data.length) {
        return false;
      }
      return lastPage.prevOffset; // Asegúrate de que esto sea lo que realmente quieres
    },
  });

  // Concatenamos todas las imágenes en un único array
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
          loader={<div>Cargando...</div>}
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
}

export { ReactLazyLoading };
