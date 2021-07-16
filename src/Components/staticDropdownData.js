export const Listing = [
  {
    id: '1',
    value: "EBC",
  },
  {
    id: '2',
    value: "APS",
  },
  {
    id:'3',
    value: "SunSales",
  },
  {
    id: '4',
    value: "DERAnalytics",
  },

];


export const Listing_Status = (id) => {
  switch (id) {
    case '1':
      return "EBC";
    case '2':
      return "APS";
    case '3':
      return "SunSales";
    case '4':
      return "DERAnalytics";
  
    default:
      return id;
  }
};
