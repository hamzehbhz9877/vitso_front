export const getHostAddress = () => {
    return typeof window === "undefined"
        ? process.env.API_HOST_ADDRESS
        : process.env.NEXT_PUBLIC_API_HOST_ADDRESS;
};