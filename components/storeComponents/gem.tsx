import React, { useState } from "react";
import { NEXT_PUBLIC_APP_URL } from "@/env";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import ActivationElementsHeader from "../activationElementsHeader";
import GemVariations from "../gemVariations";
import { commonApiPurchase } from "@/modules/commonApi";

type Props = {
  data: any;
};

function Gem({ data }: Props) {
  const pathname = usePathname();
  const [specificGemData, setSpecificGemData] = useState<any>({
    id: null,
    loading: false,
  });
  const { mode } = useSelector((state: any) => state.general);

  const { theming, discount, button, pricing, title, description, images } =
    data?.data;

  function handleGemVariations(productID: number, variationID: number) {
    const getVariationSpecificID = pricing?.variations.find(
      (item: any, index: number) => {
        return item.id === variationID;
      }
    )?.id;
    setSpecificGemData((prev: any) => ({
      ...prev,
      id: getVariationSpecificID,
      loading: true,
    }));

    let redirect_url = "";
    let fail_redirect_url = "";
    redirect_url = NEXT_PUBLIC_APP_URL + `${pathname}?store-gem-success=true`;
    fail_redirect_url =
      NEXT_PUBLIC_APP_URL + `${pathname}?store-gem-success=false`;
    commonApiPurchase({
      product_id: productID,
      variation_id: variationID,
      redirect_url: redirect_url,
      fail_redirect_url: fail_redirect_url,
      monetize_location: "product_page",
      use_gem: false,
    })
      .then((res) => {
        // console.log(res.data);
        setSpecificGemData((prev: any) => ({
          ...prev,
          loading: false,
        }));
        window.open(res?.data?.payment_link, "_self");
      })
      .catch((err) => {
        console.log(err);
        setSpecificGemData((prev: any) => ({
          ...prev,
          loading: false,
        }));
      });
  }

  return (
    <>
      <Box
        className="store-elements-container"
        style={{
          background: `linear-gradient(270deg,${
            mode === "light"
              ? theming?.background_gradiant_secondary_light
              : theming?.background_gradiant_secondary_dark
          }, ${
            mode === "light"
              ? theming?.background_gradiant_primary_light
              : theming?.background_gradiant_primary_dark
          })`,
        }}
      >
        <ActivationElementsHeader
          title={title}
          description={description}
          darkThemeing={theming?.text_color_dark}
          lightThemeing={theming?.text_color_light}
          specialGemClassName="special-gem-class"
        />
        <GemVariations
          gemVariations={pricing?.variations}
          productionID={data?.data?.id}
          handleGemVariations={handleGemVariations}
          loading={specificGemData.loading}
          specificVariationID={specificGemData.id}
        />
      </Box>
    </>
  );
}

export default Gem;
