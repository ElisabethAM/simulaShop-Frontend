import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch } from "vue";
import { useShopStore } from "../stores/shop_store.js";

export const useProductStore = defineStore("product", () => {
  const shopStore = useShopStore();
  const products = ref(null);
  const product = ref(null);
  
  const getProducts = async () => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/stores/${shopStore.shop._id}/products`,
        method: "GET",
      });
      products.value = [...res.data.products];
    } catch (error) {
      console.log(error);
    }
  };

  return {
    products,
    getProducts,
    product,
  };
});
