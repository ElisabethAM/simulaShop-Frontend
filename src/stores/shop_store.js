import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch } from "vue";

const storeShop = localStorage.getItem("selectedShop");
const shopInitial = storeShop ? JSON.parse(storeShop) : null;

export const useShopStore = defineStore("shop", () => {
  const shops = ref(null);
  const shop = ref(shopInitial);
  const ultimoBeneficio = ref(null);
  const cicloDatos = ref(null);

  watch(shop, () => {
    localStorage.setItem("selectedShop", JSON.stringify(shop.value));
  });

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

      shop.value = res.data.store
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
