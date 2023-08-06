export type InpostGeowidgetPoint = {
  address: {
    line1: string;
    line2: string;
  };
  address_details: {
    building_number: string;
    city: string;
    flat_number: string;
    post_code: string;
    province: string;
    street: string;
  };
  agency: string;
  apm_doubled: boolean;
  name: string;
};
