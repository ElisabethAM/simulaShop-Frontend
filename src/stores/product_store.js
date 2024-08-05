import { defineStore } from "pinia";
import axios from "axios";
import { ref, watch } from "vue";
import { useShopStore } from "../stores/shop_store.js";

export const useProductStore = defineStore("product", () => {
  const shopStore = useShopStore();
  const products = ref(null);
  const product = ref(null);

  const addProduct = async(producto)=>{
    try {
        console.log(producto);
        const res = await axios({
          url: `http://localhost:5000/api/stores/${producto.storeId}/products`,
          method: "POST",
          data: {
            name: producto.name,
            image: producto.image,
            category: producto.category,
            salePrice: producto.salePrice,
            purchasePrice: producto.purchasePrice,
            selectedForCycle: producto.selectedForCycle,
            availableUnits: producto.availableUnits,
            demandMin: producto.demandMin,
            demandMax: producto.demandMax,
          },
        });
        product.value = res.data.product;
      } catch (error) {
        console.log(error);
      }
  }

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

  const updateProduct = async (producto) => {
    try {
      console.log(producto);
      const res = await axios({
        url: `http://localhost:5000/api/stores/${shopStore.shop._id}/products/${producto._id}`,
        method: "PUT",
        data: {
          name: producto.name,
          image: producto.image,
          category: producto.category,
          salePrice: producto.salePrice,
          purchasePrice: producto.purchasePrice,
          selectedForCycle: producto.selectedForCycle,
          availableUnits: producto.availableUnits,
          demandMin: producto.demandMin,
          demandMax: producto.demandMax,
          isDeleted: producto.isDeleted,
        },
      });
      product.value = res.data.product;
    } catch (error) {
      console.log(error);
    }
  };

  const addUnitsProduct = async (producto, quantity) => {
    try {
      console.log(quantity);
      const res = await axios({
        url: `http://localhost:5000/api/stores/${shopStore.shop._id}/products/${producto._id}/add-units`,
        method: "PUT",
        data: {
          additionalUnits: parseInt(quantity, 10),
        },
      });
      product.value = res.data.product;
      shopStore.shop = res.data.store;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    products,
    getProducts,
    updateProduct,
    addUnitsProduct,
    addProduct,
    product,
  };
});
