export const useMyFetch = async (request, opts) => {
  const config = useRuntimeConfig();

  return await useFetch(request, {
    baseURL: `${config.public.baseURL}/infojobs/`,
    ...opts,
  });
};
