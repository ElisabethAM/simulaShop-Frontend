import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch } from "vue";

export const useShopStore = defineStore("shop", () => {
  const shops = ref(null);
  const shop = ref(null);

  const getShops = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/store/",
        method: "GET",
      });
      shops.value = [...res.data.stores];
    } catch (error) {
      console.log(error);
    }
  };

  return {
    shops,
    getShops,
    shop,
  };
});
