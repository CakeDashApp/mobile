import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import CImage from "../../../../../../../../../components/default/cImage";
import core from "../../../../../../../../../../src/core";
import { useAgile } from "@agile-ts/react";

interface Props {}

const CakeDashStaffBadge: React.FC<Props> = (props) => {
  // Theme
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Image
  const [cakeDashLogo_light] = useState(
    require("../../../../../../../../../../assets/images/logo/logo_light.png")
  );
  const [cakeDashLogo_dark] = useState(
    require("../../../../../../../../../../assets/images/logo/logo_dark.png")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => Toast.show("CakeDash Staff")}>
      <CImage
        source={themeType === "dark" ? cakeDashLogo_dark : cakeDashLogo_light}
        width={20}
        height={20}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
};

export default CakeDashStaffBadge;
