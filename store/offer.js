import { defineStore } from "pinia";
import { useMyFetch } from "../composables/useMyFetch";
export const useOfferStore = defineStore("offers", {
  state: () => ({
    offerSelected: "",
    offerDetail: null,
    offerList: [],
    loadingOfferDetail: false,
    pageOfferList: 1,
    loadingOffers: false,
    categoryOfferList: "",
  }),

  actions: {
    setOfferSelected(offerId) {
      this.offerSelected = offerId;
    },
    setOfferDetail(offerDetail) {
      this.offerDetail = offerDetail;
    },
    setOfferList(offerList) {
      this.offerList = offerList;
    },
    // setloadingOfferDetail(loadingOfferDetail) {
    //   this.loadingOfferDetail = loadingOfferDetail;
    // },
    async getOfferList() {
      this.loadingOffers = true;
      const params = {
        page: this.pageOfferList,
        category: this.categoryOfferList,
      };
      try {
        const { data } = await useMyFetch("get_offer_list/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        this.setOfferList(data.value.offers);
      } catch (error) {
        console.log(error);
      }
      this.loadingOffers = false;
    },
    async selectOffer(offerId) {
      this.loadingOfferDetail = true;
      this.setOfferSelected(offerId);
      const params = {
        offer_id: offerId,
      };
      try {
        const { data } = await useMyFetch("get_offer_detail/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        this.setOfferDetail(data.value);
      } catch (error) {
        console.log(error);
      }
      this.loadingOfferDetail = false;
    },
  },
});
