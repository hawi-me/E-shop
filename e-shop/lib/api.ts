import axios from "axios"

const API_BASE_URL = "https://dummyjson.com"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

// Products API
export const productsAPI = {
  getAllProducts: (limit = 10, skip = 0) => axiosInstance.get("/products", { params: { limit, skip } }),

  getProductById: (id: number) => axiosInstance.get(`/products/${id}`),

  searchProducts: (query: string) => axiosInstance.get("/products/search", { params: { q: query } }),

  getCategories: () => axiosInstance.get("/products/categories"),

  getProductsByCategory: (category: string) => axiosInstance.get(`/products/category/${category}`),

  createProduct: (productData: any) => axiosInstance.post("/products/add", productData),

  updateProduct: (id: number, productData: any) => axiosInstance.put(`/products/${id}`, productData),

  deleteProduct: (id: number) => axiosInstance.delete(`/products/${id}`),
}

export default axiosInstance
