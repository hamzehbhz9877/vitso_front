import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'
import {toast} from "react-toastify";
import {defaultToastOptions} from "@/components/react-toastify/react-toastify";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        onSuccess: (data:ApiResponse<never>) => {
          toast.success(data.message, { ...defaultToastOptions })
        },
        onError: (error, variables, context) => {
          let errorMessage = 'خطای نامشخصی رخ داده است';

          if (error && typeof error === 'object') {
            // برای خطاهای axios
            const axiosError = error as any;
            if (
                axiosError.response &&
                axiosError.response.data &&
                typeof axiosError.response.data.message === 'string'
            ) {
              errorMessage = axiosError.response.data.message;
            } else if (axiosError.message) {
              errorMessage = axiosError.message;
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          toast.error(errorMessage, { ...defaultToastOptions });
        },

      },
      queries: {
        retry:1,
        staleTime: 5 * 1000,
        refetchOnWindowFocus:false,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
