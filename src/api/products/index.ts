import { axiosInstance } from "api/axios-instance";
import { APICall } from "api/utils";

export const getProducts = (): APICall<any> =>
  axiosInstance({
    url: `/store/products?region_id=reg_01JKDHA43BFMMNVRCHMEXKQ2CV`,
    method: "get",
  });

export const getSingleProduct = (productId: string): APICall<any> =>
  axiosInstance({
    url: `/store/products/${productId}?region_id=reg_01JKDHA43BFMMNVRCHMEXKQ2CV`,
    method: "get",
  });
