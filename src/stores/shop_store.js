import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch } from "vue";

export const useShopStore = defineStore("shop", () => {
  const shops = ref(null);
  const shop = ref(null);
  const ultimoBeneficio = ref(null);
  const cicloDatos = ref(null);

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

  const getShop = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5000/api/store/" + shop.value._id,
        method: "GET",
      });
      shops.value = res.data.store;
      ultimoBeneficio.value =
        shop.value.cycleData[shop.value.cycleData.length - 1];
      cicloDatos.value = shop.value.cycleData;
    } catch (error) {
      console.log(error);
    }
  };

  const getBenefits = async (storeId) => {
    try {
      const res = await axios({
        url: `http://localhost:5000/api/store/${storeId}/benefits`,
        method: "GET",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    shops,
    ultimoBeneficio,
    cicloDatos,
    getShops,
    shop,
    getShop,
    getBenefits,
  };
});
